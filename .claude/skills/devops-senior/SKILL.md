---
name: devops-senior
description: "Senior DevOps engineering knowledge for Docker, Heroku, CI/CD migration, and production operations for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# DevOps & Production Operations — ufohunters-site

## Purpose

Provide senior-level operations guidance for **ufohunters-site** (Rails 8 / Ruby 3.2.8). This skill covers production environment management on Heroku, Docker builds, CI/CD migration (Travis CI → GitHub Actions), monitoring via New Relic, and disaster recovery.

## Current Production Stack

| Component     | Technology                            |
|---------------|---------------------------------------|
| Hosting       | Heroku                                |
| Container     | Docker (ruby:3.2.8-slim)              |
| Web server    | Puma (via Procfile)                   |
| Database      | MongoDB via `MONGOHQ_URL`             |
| Cache         | Redis via `REDIS_URL` (+ Memcached fallback) |
| Images        | Cloudinary                            |
| Email         | SendGrid SMTP                         |
| APM           | New Relic (`newrelic_rpm`)            |
| CI            | Travis CI (stale — needs migration)   |

## CI/CD Migration: Travis CI → GitHub Actions

The `.travis.yml` is configured for Ruby 2.1.2, which is non-functional. Create GitHub Actions workflows:

### Primary CI Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017
        options: >-
          --health-cmd mongosh --eval "db.adminCommand('ping')"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Set up Ruby 3.2.8
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.2.8
          bundler-cache: true

      - name: Run tests
        env:
          RAILS_ENV: test
          MONGOID_ENV: test
        run: bundle exec rails test

      - name: Check for debug artifacts
        run: |
          grep -rn "binding\.pry\|debugger" app/ --include="*.rb" && exit 1 || exit 0
```

### Deployment Workflow (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Heroku

on:
  push:
    branches: [main]

jobs:
  deploy:
    needs: test  # Only deploy if tests pass
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.13.15
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "ufohunters-site"
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## Docker Build Optimization

Current `Dockerfile` uses `ruby:3.2.8-slim`. Recommended improvements:

```dockerfile
FROM ruby:3.2.8-slim

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libvips-dev \
      nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install gems (cache layer)
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --without development test

# Copy application code
COPY . .

# Precompile assets
RUN SECRET_KEY_BASE_DUMMY=1 \
    RAILS_ENV=production \
    bundle exec rails assets:precompile && \
    bundle exec rails tailwindcss:build

EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
```

## Production Deployment Procedure

### Pre-Deployment Checklist

- [ ] All tests pass locally: `bundle exec rails test`
- [ ] Assets compile without errors: `RAILS_ENV=production bundle exec rails assets:precompile`
- [ ] Tailwind builds: `bundle exec rails tailwindcss:build`
- [ ] Heroku environment variables verified: `heroku config --app ufohunters-site`
- [ ] MongoDB indexes are current: `heroku run rails db:mongoid:create_indexes --app ufohunters-site`
- [ ] Rollback plan: `heroku releases --app ufohunters-site`
- [ ] Team notified

### Deploy

```bash
git push heroku main
```

### Post-Deployment Monitoring

For 30 minutes after deployment, actively monitor:
- New Relic error rate dashboard
- Heroku logs: `heroku logs --tail --app ufohunters-site`
- Map functionality (GeoJSON endpoint): `curl https://ufo-hunters.com/map_json | jq '.features | length'`
- User-facing functionality: test report submission, article creation

## MongoDB Index Management

```bash
# Apply indexes after schema changes
heroku run rails db:mongoid:create_indexes RAILS_ENV=production --app ufohunters-site

# Verify indexes in MongoDB console
heroku run rails runner "puts Report.collection.indexes.each.map(&:to_s).join('\n')" --app ufohunters-site
```

## Monitoring and Alerting

### Key Metrics to Monitor (New Relic)

| Category   | Metric                   | Alert Threshold         |
|------------|--------------------------|-------------------------|
| Errors     | 5xx response rate        | > 1%                    |
| Latency    | Average response time    | > 2 seconds             |
| Throughput | Requests per minute      | Drop > 50% or spike > 3x |
| MongoDB    | Slow queries             | > 500ms                 |

### Log Analysis

```bash
# Find errors in Heroku logs
heroku logs --num 1500 --app ufohunters-site | grep -E "ERROR|500|Exception|Mongoid::Errors"

# Find slow requests
heroku logs --num 1500 --app ufohunters-site | grep "Completed 200\|Completed 500" | sort -t"s" -k3 -n | tail -20
```

## Security Hardening

### Dependencies Audit

```bash
# Check for vulnerable gems
bundle exec bundler-audit check --update
# Install: gem install bundler-audit
```

### Required Security Headers

Verify `config/application.rb` or `config/environments/production.rb` includes:
- `config.force_ssl = true`
- Proper CSP headers for Google Maps API and Cloudinary

## Disaster Recovery

### Rollback Procedure

```bash
# Immediate rollback to previous release
heroku rollback --app ufohunters-site

# Rollback to specific version
heroku rollback vXXX --app ufohunters-site
```

### MongoDB Recovery

If MongoDB (MongoHQ/Atlas) data is corrupted or lost:
1. Contact MongoHQ/Atlas support for point-in-time restore
2. Identify the last known good backup timestamp
3. Restore to a new database, verify data integrity
4. Update `MONGOHQ_URL` in Heroku config to point to restored database
5. Restart dynos: `heroku restart --app ufohunters-site`

## Safety Rules

- NEVER deploy to production without all tests passing
- NEVER share Heroku config vars (secrets) in code, issues, or chat
- ALWAYS use `heroku config:set KEY=VALUE` for environment variables
- ALWAYS notify the team before production deployments
- ALWAYS monitor New Relic for 30 minutes after deployment
- ALWAYS keep a rollback plan ready before every deployment
