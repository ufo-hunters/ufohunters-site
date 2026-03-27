# frozen_string_literal: true

IMAGEKIT_CLIENT = if ENV['IMAGEKIT_PRIVATE_KEY'].present?
                    ImageKitIo::Client.new(
                      ENV.fetch('IMAGEKIT_PRIVATE_KEY'),
                      ENV.fetch('IMAGEKIT_PUBLIC_KEY'),
                      ENV.fetch('IMAGEKIT_URL_ENDPOINT')
                    )
                  end
