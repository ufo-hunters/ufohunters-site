# ufo-hunters.com

A site that collects a huge data set of UFO sightings all over the world. Our main purpose is to collaborate spreading objective UFO data.

## Stack

- **Ruby** 3.2.8 / **Rails** 8.0.5
- **MongoDB** via Mongoid 9 (document store with 2dsphere geospatial indexes)
- **Redis** for caching
- **Propshaft** + **Import Maps** + **Hotwire** (Turbo + Stimulus) + **Tailwind CSS 3**
- **ImageKit** for image uploads and CDN delivery
- **Resend** for transactional email (HTTP API)
- **MapLibre GL** + **OpenFreeMap** for interactive maps
- **Puma** web server
- **Docker** for containerized deployment

## Prerequisites

- Ruby 3.2.8 (via RVM, rbenv, or asdf)
- Docker and Docker Compose (for MongoDB and Redis)

## Setup

```bash
# Start MongoDB and Redis
docker compose up -d

# Install dependencies
bundle install

# Copy environment variables and fill in your values
cp .env.example .env

# Create database indexes
rails db:mongoid:create_indexes

# Compile Tailwind CSS
rails tailwindcss:build

# Start the server
rails server
```

The app will be available at `http://localhost:3000`.

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|----------|-------------|
| `MONGOHQ_URL` | MongoDB connection string |
| `REDIS_URL` | Redis connection string |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key for image uploads |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit CDN endpoint |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `MAILER_FROM` | Email sender address |
| `RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret key |
| `SECRET_KEY_BASE` | Rails secret (generate with `rails secret`) |

## Running Tests

```bash
# Unit and functional tests
bundle exec rails test

# System tests (requires Chrome)
SYSTEM_TEST=1 bundle exec rails test test/system/

# Linting
bundle exec rubocop
```

## CI/CD

GitHub Actions runs on every push and PR to `master`:
- **test** job: Rails tests with MongoDB 7
- **lint** job: RuboCop

## Deployment

The app is containerized with Docker. See `Dockerfile` and `Procfile`.

```bash
# Build Docker image
docker build -t ufohunters .

# Run in production
docker run -e RAILS_ENV=production -e SECRET_KEY_BASE=... -p 3000:3000 ufohunters
```

## How to Contribute

Want to help improve [ufo-hunters.com](https://ufo-hunters.com)?

There are many ways to contribute to ufo-hunters.com and the UFO community. You may collect UFO reports, join a UFO organization such as MUFON or NUFORC, or elaborate an article to share your story if you witnessed a UFO or had an encounter.

If you are a UFO investigator and want to share your work, just send us a doc or link so that we can publish it.

If you saw something wrong please do report it in the [issue tracker](https://github.com/ufo-hunters/ufohunters-site/issues).

Once you have [forked the project](http://help.github.com/forking/), feel free to send us a [pull request](http://help.github.com/pull-requests/).

If there's some other way you'd like to contribute, feel free to contact us!
