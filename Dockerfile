FROM ruby:3.2.8-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential nodejs npm libmagickwand-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

COPY . .

RUN SECRET_KEY_BASE=placeholder bundle exec rails assets:precompile

RUN echo '#!/bin/bash\nset -e\nrm -f /app/tmp/pids/server.pid\nexec "$@"' > /usr/bin/entrypoint.sh \
    && chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
