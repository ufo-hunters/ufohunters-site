# frozen_string_literal: true

module MongoUpgrade
  # Compares two FeatureCheck results. Prints one line per difference and returns the
  # failures (warnings are printed but do not fail the run):
  #
  # - FAIL: different HTTP status, different documents, different aggregation results,
  #   or a write check that passed before and fails now.
  # - WARN: same documents in another order, documents that only differ among sightings
  #   tied on sighted_at at the limit boundary (MongoDB does not define their order),
  #   a different index chosen by the planner, or a request more than 3x slower.
  class FeatureComparison
    def initialize(baseline, current)
      @baseline = baseline
      @current = current
      @failures = []
    end

    def report
      compare_reads
      compare_explains
      compare_writes
      $stdout.puts "Compared with MongoDB #{@baseline['server']}: #{@failures.size} failure(s)"
      @failures
    end

    private

    def compare_reads
      @baseline['reads'].each do |label, before|
        after = @current['reads'][label]
        next fail!("#{label}: missing in current run") if after.nil?
        next if !before.is_a?(Hash) && before == after
        next fail!("#{label}: #{before.inspect} -> #{after.inspect}") unless before.is_a?(Hash)

        compare_request(label, before, after)
      end
    end

    def compare_request(label, before, after)
      fail!("#{label}: HTTP #{before['status']} -> #{after['status']}") if before['status'] != after['status']
      if after['ms'] > [before['ms'] * 3, before['ms'] + 200].max
        warn!("#{label}: slower, #{before['ms']} ms -> #{after['ms']} ms")
      end

      before['data'].each do |ivar, value|
        compare_value("#{label} #{ivar}", value, after['data'][ivar])
      end
    end

    def compare_value(label, before, after)
      return if before == after
      return fail!("#{label}: #{short(before)} -> #{short(after)}") unless before.is_a?(Hash) && after.is_a?(Hash)
      return compare_docs(label, before, after) if before.key?('docs') && after.key?('docs')

      fail!("#{label}: results differ")
    end

    def compare_docs(label, before, after)
      ids_before = before['docs']
      ids_after = after['docs']
      return fail!("#{label}: same #{ids_before.size} documents, different content") if ids_before == ids_after
      return compare_order(label, before, after) if ids_before.sort == ids_after.sort
      return warn!("#{label}: differs only among sightings tied at the limit") if tie_at_limit?(before, after)

      fail!("#{label}: #{ids_before.size} -> #{ids_after.size} documents, " \
            "#{(ids_before - ids_after).size} missing, #{(ids_after - ids_before).size} new")
    end

    # Same documents in another order is only acceptable when the swapped ones share the
    # same sighted_at: MongoDB does not define the order of documents that tie on the sort key.
    def compare_order(label, before, after)
      if before['sort_keys'] && before['sort_keys'] == after['sort_keys']
        warn!("#{label}: same #{before['docs'].size} documents, reordered only among sightings with the same date")
      else
        fail!("#{label}: same documents, but the order by date changed")
      end
    end

    # With sort + limit, documents that share the boundary sort key may be swapped.
    def tie_at_limit?(before, after)
      keys_before = before['sort_keys']
      return false if keys_before.nil? || keys_before != after['sort_keys'] || keys_before.empty?

      boundary = keys_before.last
      differing = (before['docs'] - after['docs']) + (after['docs'] - before['docs'])
      tied = before['docs'].zip(keys_before).to_h.merge(after['docs'].zip(after['sort_keys']).to_h)
      differing.all? { |id| tied[id] == boundary }
    end

    def compare_explains
      @baseline['explain'].each do |query, indexes|
        now = @current['explain'][query]
        warn!("index for '#{query}': #{indexes.inspect} -> #{now.inspect}") if now != indexes
      end
    end

    def compare_writes
      @baseline['writes'].each do |check, status|
        now = @current['writes'][check]
        fail!("write '#{check}': #{status} -> #{now}") if status == 'PASS' && now != 'PASS'
      end
    end

    def short(value)
      value.inspect.truncate(120)
    end

    def fail!(message)
      $stdout.puts "FAIL  #{message}"
      @failures << message
    end

    def warn!(message)
      $stdout.puts "WARN  #{message}"
    end
  end
end
