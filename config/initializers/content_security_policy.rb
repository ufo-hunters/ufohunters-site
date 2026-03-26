# frozen_string_literal: true

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.font_src    :self, 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'
    policy.img_src     :self, :data, 'https:', 'https://res.cloudinary.com'
    policy.object_src  :none
    policy.script_src  :self, 'https://www.google.com', 'https://www.gstatic.com'
    policy.style_src   :self, :unsafe_inline, 'https://fonts.googleapis.com'
    policy.frame_src   'https://www.google.com', 'https://www.youtube.com'
    policy.connect_src :self, 'https://tiles.openfreemap.org'
  end

  config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  config.content_security_policy_nonce_directives = %w[script-src]
end
