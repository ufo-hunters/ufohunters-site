# frozen_string_literal: true

module Api
  # JSON endpoint used by the UFO Hunters mobile app to submit sightings.
  #
  # Unlike the browser-facing ReportsController#create, this path cannot rely on
  # a reCAPTCHA challenge (there is no widget in a native app), so abuse is kept
  # in check three ways:
  #   1. a shared secret header (X-App-Key == ENV['MOBILE_APP_KEY']);
  #   2. rack-attack IP throttling on POST /api/reports;
  #   3. every submission is stored unpublished (status 0) for manual review.
  #
  # It is CSRF-exempt because the mobile client is not a browser session and
  # sends no cookies; the shared key is what gates writes here.
  class ReportsController < ApplicationController
    skip_forgery_protection

    before_action :authenticate_app

    # POST /api/reports.json
    def create
      report = Report.new(build_attributes)

      if report.save
        render json: { id: report.id.to_s, status: report.status }, status: :created
      else
        render json: { errors: report.errors.full_messages }, status: :unprocessable_content
      end
    end

    private

    # Constant-time comparison so a wrong key cannot be timing-probed. When no
    # MOBILE_APP_KEY is configured the endpoint is closed (fails every request)
    # rather than silently accepting anonymous writes.
    def authenticate_app
      expected = ENV['MOBILE_APP_KEY'].to_s
      provided = request.headers['X-App-Key'].to_s

      return if expected.present? &&
                ActiveSupport::SecurityUtils.secure_compare(expected, provided)

      render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    def build_attributes
      attrs = report_params.to_h
      attrs['status'] = 0
      attrs['source'] = 'mobile-app'
      attrs['coord'] = parse_coord(attrs['coord'])
      attrs['reported_at'] = Time.zone.today.strftime('%Y%m%d')
      attrs['sighted_at'] = normalize_date(attrs['sighted_at'])

      images = Array(params.dig(:report, :images)).compact_blank
      if images.any? && IMAGEKIT_CLIENT
        service = ImagekitUploadService.new
        urls = images.filter_map { |img| service.upload(img) }
        attrs['image_imagekit'] = urls if urls.any?
      end

      attrs
    end

    def report_params
      params.expect(report: %i[location shape duration description coord sighted_at email])
    end

    # Accepts the app's ISO "YYYY-MM-DD" and stores the archive's "YYYYMMDD"
    # string. An unparseable value becomes nil so model validation rejects it
    # instead of persisting garbage.
    def normalize_date(raw)
      return nil if raw.blank?

      Date.strptime(raw.to_s, '%Y-%m-%d').strftime('%Y%m%d')
    rescue Date::Error
      nil
    end

    # "lng,lat" -> [lng, lat] floats; malformed input falls back to the [0, 0]
    # "no coordinates" sentinel, mirroring ReportsController#parse_coord.
    def parse_coord(raw)
      return [0, 0] if raw.blank?

      parts = raw.to_s.split(',').map do |value|
        Float(value.strip)
      rescue ArgumentError, TypeError
        nil
      end

      parts.size == 2 && parts.none?(&:nil?) ? parts : [0, 0]
    end
  end
end
