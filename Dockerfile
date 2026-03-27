FROM ruby:3.2.8-slim AS dependencies

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libmagickwand-dev libyaml-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && \
    bundle config set without 'development test' && \
    bundle install

FROM ruby:3.2.8-slim AS production

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends libmagickwand-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN groupadd --system app && useradd --system --gid app app

WORKDIR /app

COPY --from=dependencies /usr/local/bundle /usr/local/bundle
COPY . .

RUN RAILS_ENV=production SECRET_KEY_BASE=placeholder bundle exec rails assets:precompile

RUN chown -R app:app /app
USER app

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-c", "rm -f tmp/pids/server.pid && exec \"$@\"", "--"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
