# frozen_string_literal: true

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.font_src    :self, 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'
    policy.img_src     :self, :data, 'https:', 'http://img.youtube.com'
    policy.object_src  :none
    policy.script_src  :self, :unsafe_inline,
                       'https://www.google.com', 'https://www.gstatic.com',
                       'https://www.googletagmanager.com',
                       'https://unpkg.com'
    policy.style_src   :self, :unsafe_inline,
                       'https://fonts.googleapis.com',
                       'https://unpkg.com'
    policy.frame_src   'https://www.google.com', 'https://www.youtube.com'
    policy.connect_src :self,
                       'https://tiles.openfreemap.org',
                       'https://unpkg.com',
                       'https://*.nr-data.net',
                       'https://*.analytics.google.com',
                       'https://*.google-analytics.com'
    policy.worker_src  :self, :blob
  end

  config.content_security_policy_report_only = true if Rails.env.development?
end
