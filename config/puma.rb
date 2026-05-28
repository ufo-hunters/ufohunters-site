# frozen_string_literal: true

max_threads_count = ENV.fetch('RAILS_MAX_THREADS', 5)
min_threads_count = ENV.fetch('RAILS_MIN_THREADS', max_threads_count)
threads min_threads_count, max_threads_count

worker_timeout 3600 if ENV.fetch('RAILS_ENV', 'development') == 'development'

bind "tcp://0.0.0.0:#{ENV.fetch('PORT', 3000)}"

environment ENV.fetch('RAILS_ENV', 'development')

pidfile ENV.fetch('PIDFILE', 'tmp/pids/server.pid')

if ENV.fetch('RAILS_ENV', 'development') == 'production'
  workers ENV.fetch('WEB_CONCURRENCY', 1)
  # Single worker is intentional on this 984MB box; suppress Puma's nag.
  silence_single_worker_warning
  preload_app!
end

plugin :tmp_restart
