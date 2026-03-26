FROM ruby:3.2.8-slim AS base

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libmagickwand-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

FROM base AS dependencies

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --without development test

FROM base AS production

RUN groupadd --system app && useradd --system --gid app app

COPY --from=dependencies /usr/local/bundle /usr/local/bundle
COPY . .

RUN SECRET_KEY_BASE=placeholder bundle exec rails assets:precompile && \
    SECRET_KEY_BASE=placeholder bundle exec rails tailwindcss:build

RUN chown -R app:app /app
USER app

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-c", "rm -f tmp/pids/server.pid && exec \"$@\"", "--"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
