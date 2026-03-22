---
name: setup-dev
description: "Local development environment setup for ufohunters-site (Rails 8 + Mongoid 9 + RVM + Docker)."
allowed-tools: Read, Glob, Bash
---
# Local Development Environment Setup — ufohunters-site

## Purpose

Guide developers through setting up a complete local development environment for
**ufohunters-site** (Rails 8.0.2 / Ruby 3.2.8 / Mongoid 9.0).

## Prerequisites

### System Requirements

- Operating System: macOS, Linux, or Windows (WSL2)
- RAM: 8GB minimum, 16GB recommended
- Disk: 5GB free space minimum

### Ruby Runtime

This project uses **Ruby 3.2.8** managed via RVM (as configured in `settings.local.json`).

```bash
# Install RVM (if not installed)
curl -sSL https://get.rvm.io | bash -s stable

# Install Ruby 3.2.8
rvm install ruby-3.2.8

# Use Ruby 3.2.8
rvm use ruby-3.2.8 --default

# Verify
ruby -v  # Should print ruby 3.2.8
```

Alternative: Use **rbenv** or **asdf**:

```bash
# rbenv
rbenv install 3.2.8
rbenv local 3.2.8

# asdf
asdf plugin add ruby
asdf install ruby 3.2.8
asdf local ruby 3.2.8
```

### MongoDB (Required)

This project uses MongoDB via Mongoid. **There is no docker-compose.yml** — MongoDB must be started separately.

#### Option 1: Docker (recommended)

```bash
docker run --name ufohunters-mongo \
  -p 27017:27017 \
  -d mongo:7.0

# Verify it's running
docker ps | grep mongo
```

#### Option 2: Native Installation

```bash
# macOS
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Step 1: Clone the Repository

```bash
git clone git@github.com:ufo-hunters/ufohunters-site.git
cd ufohunters-site
```

## Step 2: Install Dependencies

```bash
bundle install
```

### Common Dependency Issues

- **Native extension failures**: Install `build-essential` (Linux) or `xcode-select --install` (macOS)
- **ImageMagick/MiniMagick**: Install `imagemagick` system package
- **Version conflicts**: Ensure Ruby 3.2.8 is active: `ruby -v`

## Step 3: Configure Environment Variables

Copy and configure environment variables:

```bash
cp .env.example .env  # if .env.example exists
# or create .env manually
```

Required variables for development:

```bash
# MongoDB
MONGOID_ENV=development
# (connection is configured in config/mongoid.yml for localhost:27017)

# Google Maps (required for map views)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# reCAPTCHA (required for report submission)
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Cloudinary (required for image uploads)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Rails
SECRET_KEY_BASE=$(bundle exec rails secret)
RAILS_ENV=development
```

For local testing without external services, some features (image upload, reCAPTCHA) will fail gracefully or can be stubbed in tests.

## Step 4: Verify MongoDB Connection

```bash
# Check mongoid.yml configuration
cat config/mongoid.yml

# Start the Rails console to verify Mongoid connects
bundle exec rails runner "puts Mongoid.client(:default).database.name"
# Should print: ufosightings
```

## Step 5: Seed Data (Optional)

The project does not have a standard `db/seeds.rb` for Mongoid. If sample data exists:

```bash
bundle exec rails runner db/seeds.rb  # if it exists
```

Or create sample data manually via the Rails console:

```bash
bundle exec rails console
# > Report.create!(location: 'Phoenix, AZ', shape: 'triangle', description: 'Test', status: 'published')
```

## Step 6: Build Assets

```bash
# Precompile assets with Propshaft
bundle exec rails assets:precompile

# Build Tailwind CSS
bundle exec rails tailwindcss:build
# Or for development with live reloading:
# bundle exec rails tailwindcss:watch (in a separate terminal)
```

## Step 7: Run the Test Suite

```bash
bundle exec rails test
```

All tests should pass. If failures occur, check:
- MongoDB is running and accessible
- Required environment variables are set
- Ruby version is 3.2.8

## Step 8: Start the Development Server

```bash
bundle exec rails server
# or
bin/rails server
```

Open: http://localhost:3000

## Common Troubleshooting

### Problem: MongoDB connection refused

```bash
# Check if MongoDB is running
docker ps | grep mongo
# or
systemctl status mongodb

# Check connection in mongoid.yml
cat config/mongoid.yml | grep -A5 "development:"
```

### Problem: Assets not loading (404 on CSS/JS)

```bash
# Rebuild assets
bundle exec rails assets:precompile
bundle exec rails tailwindcss:build
```

### Problem: Google Maps not rendering

Verify `GOOGLE_MAPS_API_KEY` is set in your environment. The map views require a valid API key.

### Problem: Image uploads failing

Verify `CLOUDINARY_URL` is set and in the format `cloudinary://api_key:api_secret@cloud_name`.

### Problem: Port 3000 already in use

```bash
lsof -i :3000
kill -9 <PID>
```

### Problem: Bundler install fails on native extensions

```bash
# macOS
brew install imagemagick
xcode-select --install

# Ubuntu
sudo apt-get install build-essential libmagickwand-dev imagemagick
```

## IDE Configuration

### VS Code Extensions

- Ruby: `Shopify.ruby-lsp` or `rebornix.Ruby`
- Rails: `bung87.rails`
- MongoDB: `mongodb.mongodb-vscode`
- Tailwind: `bradlc.vscode-tailwindcss`
- EditorConfig: `editorconfig.editorconfig`

### Editor Settings

Ensure your editor respects:
- `.editorconfig` — if present
- 2-space indentation (Ruby convention)
- Unix line endings
