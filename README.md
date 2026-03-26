# ufo-hunters.com

A site that collects a huge data set of UFO sightings all over the world. Our main purpose is to collaborate spreading objective UFO data.

## Stack

- **Ruby** 3.2.8 / **Rails** 8.0.2
- **MongoDB** via Mongoid 9 (document store with 2dsphere geospatial indexes)
- **Redis** for caching
- **Propshaft** + **Import Maps** + **Hotwire** (Turbo + Stimulus) + **Tailwind CSS 3**
- **CarrierWave** + **Cloudinary** for image uploads
- **Puma** web server

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

## Running Tests

```bash
bundle exec rails test
```

## How to Contribute

Want to help improve [ufo-hunters.com](https://ufo-hunters.com)?

There are many ways to contribute to ufo-hunters.com and the UFO community. You may collect UFO reports, join a UFO organization such as MUFON or NUFORC, or elaborate an article to share your story if you witnessed a UFO or had an encounter.

If you are a UFO investigator and want to share your work, just send us a doc or link so that we can publish it.

If you saw something wrong please do report it in the [issue tracker](https://github.com/ufo-hunters/ufohunters-site/issues).

Once you have [forked the project](http://help.github.com/forking/), feel free to send us a [pull request](http://help.github.com/pull-requests/).

If there's some other way you'd like to contribute, feel free to contact us!
