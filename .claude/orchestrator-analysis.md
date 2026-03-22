# Orchestrator Analysis — UFO Hunters Site
Generated: 2026-03-22

## Project Overview

**ufo-hunters.com** is a public-facing web application that collects, displays, and allows community interaction around UFO sighting reports from around the world. It supports user registration/authentication, article authorship, UFO report submission with geolocation data, image uploads, interactive maps, country-based filtering, statistics, and video/image galleries.

The application was originally built with Ruby 1.9 / Rails 3 and has been progressively upgraded. The current codebase runs on Ruby 3.2.8 and Rails 8.0.2 — a significant modernization — while the README still reflects the legacy history (Rails 3–4 era). MongoDB remains the primary data store, consistent with the original design choice for geospatial UFO data.

**Repo:** git@github.com:ufo-hunters/ufohunters-site.git

---

## Tech Stack

- **Language**: Ruby 3.2.8
- **Version source**: `Gemfile` (`ruby '3.2.8'`) + `Dockerfile` (`FROM ruby:3.2.8-slim`)
- **Framework**: Rails 8.0.2 (full-stack, not API-only)
- **Web server**: Puma 6.x
- **Package manager**: Bundler
- **Test framework**: Minitest (Rails default, via `rails/test_unit/railtie`; `spec/` directory absent; `test/` present with unit/, functional/, integration/ subdirectories)
- **Linter**: None detected (no `.rubocop.yml`, no `rubocop` or `standard` in Gemfile)
- **CI/CD**: Travis CI (`.travis.yml` present, but configured for Ruby 2.1.2 — outdated, not currently functional)
- **Database**: MongoDB via Mongoid 9.0 (ODM); database name `ufosightings` (development), `sightings_test` (test); production URI from `MONGOHQ_URL` env var
- **Cache**: Redis 5.x (production cache store via `REDIS_URL`; fallback to Memcached via `MEMCACHEDCLOUD_SERVERS`)
- **Image storage**: Cloudinary (via `cloudinary` gem + CarrierWave + `carrierwave-mongoid`)
- **Image processing**: MiniMagick 4.x
- **Email**: ActionMailer via SendGrid SMTP in production
- **Monitoring**: New Relic (`newrelic_rpm`)
- **Security**: bcrypt (password hashing via `has_secure_password`), reCAPTCHA 5.x
- **Geospatial**: rgeo-geojson 2.x; MongoDB 2dsphere indexes on coordinates; Google Maps API v3 (frontend)

### Frontend stack

- **Template engine**: ERB (`.html.erb` layouts and views confirmed)
- **Asset pipeline**: Propshaft (modern replacement for Sprockets)
- **JavaScript bundling**: Import maps (`importmap-rails`) — no Webpack/esbuild
- **Hotwire**: Turbo Rails + Stimulus Rails (full Hotwire stack)
- **CSS framework**: Tailwind CSS 3.x via `tailwindcss-rails` (config at `config/tailwind.config.js`)
- **Rich text editor**: CKEditor (models and uploaders present in `app/models/ckeditor/`, `app/uploaders/`)

---

## Architecture

- **Pattern**: MVC (standard Rails monolith)
- **Source dir**: `app/`
- **Test dir**: `test/`
- **Config dir**: `config/`
- **Has API**: Partial — `stats#map_json` returns JSON for map data; not a full REST API
- **API type**: HTML-first with a JSON endpoint for map GeoJSON data

### Controllers
`sightings`, `reports`, `articles`, `users`, `sessions`, `stats`, `errors` — covers sighting data browsing, user-generated content, authentication (custom session management, no Devise), and geospatial statistics.

### Models (Mongoid documents)
- `Report` — core UFO sighting record, stored in `ufo` collection; fields: location, shape, duration, description, coordinates (Array), links, images, status, case_number; geospatial 2d index on `coord`
- `User` — bcrypt-authenticated user; `has_many :articles`; username as document `_id`
- `Article` — user-authored content
- `Countries` — geospatial country boundaries (polygon geometry)
- `CustomDate`, `Notifier` — utility model and mailer

### Key domain routes
- `/` → `sightings#index` (main listing)
- `/sightings/maps`, `/sightings/northamerica`, etc. → region-filtered map views
- `/reports` → CRUD for UFO report submission
- `/articles` → user article management
- `/sessions` → custom authentication
- `/stats`, `/map_json` → statistics and GeoJSON feed
- Error handling: custom `errors` controller for 404/422/500

---

## Existing Infrastructure

- **.claude/**: Exists — contains only `settings.local.json` (custom permission profile for local development with RVM/Ruby/Docker/MongoDB tooling). No agents, commands, skills, or docs generated yet.
- **doc/**: Exists — contains only the Rails-generated `README_FOR_APP` stub (no real documentation).
- **product/**: Missing
- **.git-hooks/**: Missing
- **.github/**: Missing (no GitHub Actions workflows)
- **CLAUDE.md**: Missing

### `.claude/settings.local.json` summary
Allows specific Bash and Read commands for: Ruby version inspection via RVM, Bundler operations, Rails routes/runner, Docker operations, MongoDB version check, Cloudinary-related curl calls. Uses the `generate` permission profile pattern.

---

## Generation Recommendations

### Agents to generate
- Universal agents (apply to all stacks): `code-reviewer`, `test-writer`, `debugger`, `documentation-writer`, `refactoring-advisor`
- Rails-specific agents: `rails-developer`, `rails-migration-advisor`, `mongoid-specialist` (MongoDB ODM, not ActiveRecord — adapt SQL migration patterns), `rspec-writer` (or minitest-writer given the current test setup)

### Stack-specific notes for template adaptation
- **Database**: All templates referencing ActiveRecord, SQL migrations, or PostgreSQL must be adapted to Mongoid. There are no migrations — schema is defined in model files with `field` declarations and `index` calls. The `db/` directory exists but only for Rails internals, not schema files.
- **Test framework**: Minitest with `ActiveSupport::TestCase` (not RSpec). Test helpers use factory methods (`create_dummy_report`, etc.) rather than FactoryBot. No fixtures (explicitly noted as incompatible with Mongoid).
- **Asset pipeline**: Propshaft + importmaps (not Sprockets/Webpacker). No `app/assets/application.css` with Sprockets directives — Tailwind compilation is handled by `tailwindcss-rails`.
- **Authentication**: Custom session-based auth (no Devise/Warden). Sessions controller handles login/logout manually.
- **No linter configured**: RuboCop setup would be a meaningful addition. StandardRB or RuboCop with Rails cops recommended.
- **CI/CD**: Travis CI config is stale (Ruby 2.1.2). GitHub Actions migration recommended as primary CI target for generated workflows.
- **Deployment**: Docker-ready (`Dockerfile` present, Puma as entrypoint). Heroku-compatible (`Procfile` present). No `docker-compose.yml` detected — local MongoDB must be run separately.

### Commands to adapt for
- Rails 8 conventions (no `config.load_defaults` below 8.0)
- Mongoid 9 document API (not ActiveRecord)
- Propshaft asset compilation (`rails assets:precompile`)
- Tailwind compilation (`rails tailwindcss:build`)
- Minitest runner (`rails test`)
- Import maps (`rails importmap:install` not needed — already configured)

### Template variables resolved
| Variable | Value |
|---|---|
| `{{PROJECT_NAME}}` | ufohunters-site |
| `{{LANGUAGE}}` | Ruby |
| `{{LANGUAGE_VERSION}}` | 3.2.8 |
| `{{FRAMEWORK}}` | Rails |
| `{{FRAMEWORK_VERSION}}` | 8.0.2 |
| `{{TEST_FRAMEWORK}}` | Minitest |
| `{{LINTER}}` | None |
| `{{DATABASE}}` | MongoDB (Mongoid 9) |
| `{{PACKAGE_MANAGER}}` | Bundler |
| `{{CI_CD}}` | Travis CI (stale) |
| `{{REPO_URL}}` | git@github.com:ufo-hunters/ufohunters-site.git |
| `{{ARCHITECTURE}}` | MVC monolith |
| `{{API_TYPE}}` | HTML + partial JSON |
