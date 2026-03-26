# frozen_string_literal: true

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.font_src    :self, 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'
    policy.img_src     :self, :data, 'https:', 'https://res.cloudinary.com'
    policy.object_src  :none
    policy.script_src  :self, :unsafe_inline, 'https://www.google.com', 'https://www.gstatic.com',
                       'https://unpkg.com', 'https://cdn.tailwindcss.com'
    policy.style_src   :self, :unsafe_inline, 'https://fonts.googleapis.com', 'https://cdn.tailwindcss.com'
    policy.frame_src   'https://www.google.com', 'https://www.youtube.com'
    policy.connect_src :self, 'https://tiles.openfreemap.org', 'https://unpkg.com'
  end

  # Report-only in development to avoid breaking things
  config.content_security_policy_report_only = true if Rails.env.development?

  config.content_security_policy_nonce_generator = ->(_request) { SecureRandom.base64(16) }
  config.content_security_policy_nonce_directives = %w[script-src]
end
