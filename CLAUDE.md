# CLAUDE.md — ufohunters-site

## Project Identity

- **Project**: ufohunters-site
- **Framework**: Rails 8.0.2 (full-stack MVC monolith)
- **Language**: Ruby 3.2.8
- **Package Manager**: Bundler
- **Source Directory**: `app/`
- **Test Directory**: `test/`
- **Database**: MongoDB via Mongoid 9.0 (NOT ActiveRecord — no SQL migrations)
- **Test Framework**: Minitest (`ActiveSupport::TestCase`)
- **Frontend**: Propshaft + Import Maps + Hotwire (Turbo + Stimulus) + Tailwind CSS 3

---

## Core Philosophy

1. **Readability over cleverness** — Code is read far more often than it is written. Favor explicit, self-documenting code.
2. **Production-ready by default** — Every change should be deployable. No TODO-driven development in mainline code.
3. **Pragmatic testing** — Test behavior, not implementation. Every bug fix includes a regression test.
4. **Small, focused changes** — Each commit and PR should do one thing well.
5. **Mongoid-first thinking** — This app uses MongoDB as a document store. Do not reach for SQL patterns. Think in documents, embeddings, and 2dsphere indexes.

---

## Anti-Patterns — NEVER Do These

- **NEVER** remove validations, guards, or safety checks without explicit request and justification
- **NEVER** force-push to `main` or `master`
- **NEVER** skip tests to make CI pass — fix the tests or fix the code
- **NEVER** change controller/route contracts without updating all callers
- **NEVER** commit secrets, credentials, API keys (Cloudinary, SendGrid, Google Maps, reCAPTCHA) — use environment variables
- **NEVER** silently swallow errors — log, raise, or handle explicitly
- **NEVER** use ActiveRecord patterns (`.where(id: x)` SQL style) — use Mongoid query API
- **NEVER** create SQL migrations — Mongoid schema is defined in model files with `field` declarations
- **NEVER** use `fixtures/` — Mongoid is incompatible with Rails YAML fixtures; use helper methods like `create_dummy_report`
- **NEVER** inline `binding.pry`, `debugger`, or `puts` debug statements before committing

---

## Stack Conventions — Rails 8 + Mongoid 9

### Models (Mongoid Documents)

- Models inherit from `Mongoid::Document`, not `ApplicationRecord`
- Fields declared with `field :name, type: Type` (default type is `Object`)
- No migration files — schema changes happen in the model file
- Associations: `has_many`, `belongs_to`, `embeds_many`, `embedded_in`
- Indexes declared inline with `index` macro; run `rails db:mongoid:create_indexes` to apply
- Geospatial: use `index({ coord: '2dsphere' })` for lat/lng arrays
- Validations: standard Rails validators work with Mongoid
- The `User` model uses `_id` as the document `_id` (username as primary key)

### Controllers

- Inherit from `ApplicationController`
- Custom session auth — no Devise. Authentication via `SessionsController` + `bcrypt`
- Use `before_action :authenticate_user` guards where login is required
- Strong parameters with `params.require(...).permit(...)`
- Render ERB views by default; `stats#map_json` returns GeoJSON for the map endpoint

### Frontend

- **No Sprockets** — asset pipeline is Propshaft. No Sprockets `require` directives.
- **Tailwind** — utility classes in ERB. Compile with `rails tailwindcss:build` (or `--watch` for dev).
- **JavaScript** — Import Maps only, no Webpack/esbuild. Add packages via `bin/importmap pin <package>`.
- **Hotwire** — Use Turbo Frames/Streams for dynamic updates; Stimulus controllers in `app/javascript/controllers/`.
- **CKEditor** — Rich text for articles, models in `app/models/ckeditor/`, uploaders in `app/uploaders/`.

### Image Uploads

- CarrierWave + `carrierwave-mongoid` + Cloudinary
- Uploaders in `app/uploaders/`; mount with `mount_uploader :field, UploaderClass`
- Set Cloudinary credentials via `CLOUDINARY_URL` env var

### Email

- ActionMailer with SendGrid SMTP in production (`SENDGRID_USERNAME`, `SENDGRID_PASSWORD` env vars)
- Notifier mailer in `app/models/notifier.rb` (legacy — treat as a mailer)

---

## Testing Conventions

- **Framework**: Minitest with `ActiveSupport::TestCase`
- **Run command**: `bundle exec rails test`
- **Run single file**: `bundle exec rails test test/models/report_test.rb`
- **Run single test**: `bundle exec rails test test/models/report_test.rb:42`
- **Test location**: `test/` — subdirectories: `models/`, `controllers/`, `integration/`
- **Naming**: Source `app/models/report.rb` maps to `test/models/report_test.rb`
- **Structure**: Arrange-Act-Assert (AAA) pattern within `test "description" do ... end` blocks
- **No FactoryBot** — use custom helper methods (`create_dummy_report`, etc.) defined in `test/test_helper.rb`
- **No fixtures** — Mongoid is incompatible with Rails YAML fixtures
- **Database cleanup**: Each test should set up and tear down its own data (use `setup` / `teardown` hooks)
- **Regression tests**: Every bug fix MUST include a test that reproduces the bug before fixing it

---

## Linting

- **Linter**: None currently configured
- Adding RuboCop with `rubocop-rails` and `rubocop-performance` is recommended
- Suggested installation: add `gem 'rubocop-rails', require: false` and `gem 'rubocop-performance', require: false` to Gemfile (development group)
- Until RuboCop is configured, enforce consistent style manually during review

---

## Git Conventions

### Branch Naming

All branches must follow the pattern: `<type>/<short-description>`

| Prefix      | Purpose                                       |
|-------------|-----------------------------------------------|
| `feat/`     | New features                                  |
| `fix/`      | Bug fixes                                     |
| `refactor/` | Code restructuring without behavior change    |
| `docs/`     | Documentation only                            |
| `chore/`    | Tooling, CI, dependencies, maintenance        |

### Commit Format

```
type(scope): short description

Optional longer body explaining the "why" behind the change.

Refs: #issue-number
```

**Types**: feat, fix, refactor, docs, chore, test, perf, ci, style
**Scope**: model or component affected (e.g., `reports`, `users`, `stats`)

### Rules

- Commits should be atomic — one logical change per commit
- Write commit messages in imperative mood: "add feature" not "added feature"
- Never commit `config/credentials.yml.enc` changes without team review
- Never commit log files, tmp/, or .DS_Store

---

## PR / Code Review Philosophy

- **Review ONLY changed code** — Do not refactor unrelated code in the same PR
- **YAGNI defensive** — Push back on speculative abstractions
- **Approve with comments** — Minor style nits should not block a merge. Use `[NIT]` prefix.
- **PR size** — Aim for <400 lines changed. If larger, provide a guided walkthrough in the PR description.

---

## Pre-Commit Verification

Before declaring any task complete, run the following sequence:

1. `/lint-staged` — Ensure all staged files pass linting (or manual style check if RuboCop not yet configured)
2. `/test-staged` — Ensure related tests pass
3. `/review-test-changes` — Ensure no test coverage was lost
4. `/review` — Final self-review of all changes

Only after all four pass should you consider the task done.

---

## Deployment

- **Docker**: `Dockerfile` present (ruby:3.2.8-slim base, Puma entrypoint)
- **Heroku**: `Procfile` present — `web: bundle exec puma -C config/puma.rb`
- **Assets**: `rails assets:precompile` (Propshaft) + `rails tailwindcss:build`
- **Environment variables** for production: `MONGOHQ_URL`, `REDIS_URL`, `CLOUDINARY_URL`, `SENDGRID_USERNAME`, `SENDGRID_PASSWORD`, `GOOGLE_MAPS_API_KEY`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEW_RELIC_LICENSE_KEY`, `SECRET_KEY_BASE`
- **CI/CD**: Travis CI config is present but stale (configured for Ruby 2.1.2). Migration to GitHub Actions is recommended.

---

## Project Structure

```
ufohunters-site/
  app/
    controllers/          # sightings, reports, articles, users, sessions, stats, errors
    models/               # Report, User, Article, Countries, CustomDate (Mongoid documents)
    models/ckeditor/      # CKEditor attachment models
    uploaders/            # CarrierWave uploaders (Cloudinary)
    views/                # ERB templates
    javascript/
      controllers/        # Stimulus controllers
  config/
    routes.rb             # Routes definition
    mongoid.yml           # MongoDB connection config
    tailwind.config.js    # Tailwind CSS config
  test/
    models/               # Minitest model tests
    controllers/          # Minitest controller tests
    integration/          # Integration tests
    test_helper.rb        # Shared test helpers (create_dummy_report, etc.)
  doc/                    # Project documentation
  product/                # Product management
  .claude/
    agents/               # AI agent definitions
    commands/             # Claude slash commands
    skills/               # Knowledge documents for agents
    settings.local.json   # Claude permissions and security hooks
  Gemfile                 # Ruby dependencies
  Dockerfile              # Container build
  Procfile                # Heroku/Puma process definition
  CLAUDE.md               # This file
```

---

## Available Agents

| Agent                        | File                                     | Purpose                                       |
|------------------------------|------------------------------------------|-----------------------------------------------|
| Code Quality Reviewer        | `.claude/agents/code-quality-reviewer.md` | Reviews Rails + Mongoid code quality          |
| Documentation Writer         | `.claude/agents/documentation-writer.md`  | Maintains doc/ documentation                  |
| Deployment Specialist        | `.claude/agents/deployment-specialist.md` | Docker + Heroku + CI/CD management            |
| Incident Response Specialist | `.claude/agents/incident-response-specialist.md` | Production incident handling         |
| Database Specialist          | `.claude/agents/database-specialist.md`   | MongoDB + Mongoid schema and performance      |
| Backend Developer            | `.claude/agents/backend-developer.md`     | TDD-driven Rails feature implementation       |
| Product Owner                | `.claude/agents/product-owner.md`         | Backlog and requirements management           |
| Rails TDD Agent              | `.claude/agents/rails-tdd-agent.md`       | Minitest TDD for Rails + Mongoid              |
| Minitest TDD Specialist      | `.claude/agents/minitest-tdd-specialist.md` | Minitest patterns and test structure        |
| RuboCop Guide                | `.claude/agents/rubocop-guide.md`         | Ruby style guide (setup + enforcement)        |

---

## Available Commands

| Command                | Description                                         |
|------------------------|-----------------------------------------------------|
| `/review`              | Full code review of staged/uncommitted changes      |
| `/review2`             | Independent second-opinion review                   |
| `/merge-pr`            | Guided PR merge workflow with safety checks         |
| `/panel`               | Morning briefing / development dashboard            |
| `/lint-staged`         | Run linter on staged files only                     |
| `/test-staged`         | Run tests related to modified files                 |
| `/review-test-changes` | Check if changes reduce test coverage               |
| `/git`                 | Unified git & PR workflow                           |
| `/doc-review`          | Review documentation changes                        |
