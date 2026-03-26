# frozen_string_literal: true

module Rack
  class Attack
    # Throttle login attempts by IP
    throttle('logins/ip', limit: 10, period: 60.seconds) do |req|
      req.ip if req.path == '/sessions' && req.post?
    end

    # Throttle password reset requests by IP
    throttle('password_resets/ip', limit: 5, period: 60.seconds) do |req|
      req.ip if req.path == '/password_resets' && req.post?
    end

    # Throttle report submissions by IP
    throttle('reports/ip', limit: 5, period: 60.seconds) do |req|
      req.ip if req.path == '/reports' && req.post?
    end

    # Throttle user registration by IP
    throttle('signups/ip', limit: 3, period: 60.seconds) do |req|
      req.ip if req.path == '/users' && req.post?
    end

    # General request throttle
    throttle('requests/ip', limit: 300, period: 5.minutes) do |req|
      req.ip unless req.path.start_with?('/assets')
    end

    self.throttled_responder = lambda do |_env|
      [429, { 'Content-Type' => 'text/plain' }, ['Too many requests. Please try again later.']]
    end
  end
end
