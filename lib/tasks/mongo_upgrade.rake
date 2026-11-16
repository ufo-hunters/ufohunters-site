# frozen_string_literal: true

# MongoDB upgrade rehearsal (development only). See bin/mongo-upgrade-check.
#
#   bin/rails "mongo_upgrade:features[tmp/features-3.6.json]"                        # baseline
#   bin/rails "mongo_upgrade:features[tmp/features-4.4.json,tmp/features-3.6.json]" # compare
namespace :mongo_upgrade do
  desc 'Fingerprint every MongoDB feature the app uses; compare with a baseline if given'
  task :features, %i[output baseline] => :environment do |_task, args|
    abort 'Development only: it creates and deletes test data.' unless Rails.env.development?
    require Rails.root.join('lib/mongo_upgrade/feature_check').to_s
    require Rails.root.join('lib/mongo_upgrade/feature_comparison').to_s

    Rails.cache = ActiveSupport::Cache::NullStore.new
    ActionController::Base.allow_forgery_protection = false
    Recaptcha.configuration.skip_verify_env << 'development'
    ActionMailer::Base.delivery_method = :test

    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.host! 'localhost'
    result = MongoUpgrade::FeatureCheck.new(session).run
    result['server'] = Mongoid.default_client.command(buildInfo: 1).first['version']

    output = args[:output] || "tmp/mongo-features-#{result['server']}.json"
    File.write(output, JSON.pretty_generate(result))
    puts "MongoDB #{result['server']}: #{result['reads'].size} reads, " \
         "#{result['writes'].size} write checks -> #{output}"

    failures = result['writes'].reject { |_name, status| status == 'PASS' }.map { |name, status| "#{name} (#{status})" }
    failures.each { |failure| puts "FAIL  write: #{failure}" }
    if args[:baseline]
      baseline = JSON.parse(File.read(args[:baseline]))
      failures += MongoUpgrade::FeatureComparison.new(baseline, result).report
    end
    abort "#{failures.size} problem(s)" if failures.any?
    puts 'ALL FEATURES OK'
  end
end
