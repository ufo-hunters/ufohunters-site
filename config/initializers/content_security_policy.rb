# frozen_string_literal: true

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.font_src    :self, :data, 'https://fonts.gstatic.com', 'https://fonts.googleapis.com',
                       'https://*.disquscdn.com'
    policy.img_src     :self, :data, 'https:', 'https://img.youtube.com', 'https://ik.imagekit.io'
    policy.object_src  :none
    policy.script_src  :self, :unsafe_inline,
                       'https://www.google.com', 'https://www.gstatic.com',
                       'https://www.recaptcha.net',
                       'https://www.googletagmanager.com',
                       'https://unpkg.com',
                       'https://*.disqus.com',
                       'https://*.disquscdn.com'
    policy.style_src   :self, :unsafe_inline,
                       'https://fonts.googleapis.com',
                       'https://unpkg.com',
                       'https://*.disquscdn.com'
    policy.frame_src   'https://www.google.com', 'https://www.recaptcha.net', 'https://www.youtube.com',
                       'https://disqus.com'
    policy.connect_src :self,
                       'https://tiles.openfreemap.org',
                       'https://nominatim.openstreetmap.org',
                       'https://unpkg.com',
                       'https://*.analytics.google.com',
                       'https://*.google-analytics.com',
                       'https://*.disqus.com',
                       'https://links.services.disqus.com'
    policy.worker_src  :self, :blob
  end

  config.content_security_policy_report_only = true if Rails.env.development?
end
