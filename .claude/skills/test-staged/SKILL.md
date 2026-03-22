---
name: test-staged
description: "Run Minitest tests related to staged or changed files for fast feedback in ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# Run Related Tests — ufohunters-site

## Purpose

Identify and run Minitest tests related to staged changes in **ufohunters-site** (Rails 8 / Mongoid 9).
This skill maps modified source files to their corresponding test files and executes only the relevant subset of the test suite.

## Step 1: Identify Staged Source Files

```bash
# Get staged source files, excluding test files
git diff --cached --name-only --diff-filter=ACM | grep '^app/' | grep -v -E '(test|spec)'
```

## Step 2: Map Source Files to Test Files

### Naming Convention for ufohunters-site (Minitest)

| Source File Pattern                          | Test File Pattern                                  |
|----------------------------------------------|----------------------------------------------------|
| `app/models/report.rb`                       | `test/models/report_test.rb`                       |
| `app/models/user.rb`                         | `test/models/user_test.rb`                         |
| `app/controllers/reports_controller.rb`      | `test/controllers/reports_controller_test.rb`      |
| `app/controllers/sightings_controller.rb`    | `test/controllers/sightings_controller_test.rb`    |
| `app/controllers/sessions_controller.rb`     | `test/controllers/sessions_controller_test.rb`     |
| `app/controllers/stats_controller.rb`        | `test/controllers/stats_controller_test.rb`        |
| `app/services/foo_service.rb`                | `test/services/foo_service_test.rb`                |
| `app/mailers/notifier.rb`                    | `test/mailers/notifier_test.rb`                    |
| `app/helpers/foo_helper.rb`                  | `test/helpers/foo_helper_test.rb`                  |

**Mapping rule**: Replace `app/` prefix with `test/`, replace `.rb` suffix with `_test.rb`.

### Directory Mapping

```
app/         →  test/
app/models/  →  test/models/
app/controllers/ → test/controllers/
app/services/  →  test/services/
app/mailers/   →  test/mailers/
app/helpers/   →  test/helpers/
```

### Mapping Algorithm

1. Take each staged source file path.
2. Replace `app/` prefix with `test/`.
3. Replace `.rb` suffix with `_test.rb`.
4. Check if the test file exists.
5. If not found, search `test/` for files containing the source file's base name.

## Step 3: Running Specific Tests

```bash
# Run a single test file
bundle exec rails test test/models/report_test.rb

# Run multiple specific test files
bundle exec rails test test/models/report_test.rb test/controllers/reports_controller_test.rb

# Run a specific test by line number
bundle exec rails test test/models/report_test.rb:42

# Run tests matching a pattern
bundle exec rails test -n "/location/"
```

### Execution Strategy

1. Collect all mapped test files.
2. Verify each test file exists.
3. Run all related tests in a single `bundle exec rails test <files>` command.
4. If a test file is missing, log a warning and continue with existing tests.

## Step 4: Special Cases for Mongoid

### If test_helper.rb was modified

Run the full test suite — changes to shared test helpers can affect any test:

```bash
bundle exec rails test
```

### If a Mongoid model was modified

Run both the model test AND any controller tests that exercise it:

```bash
# Example: report.rb changed
bundle exec rails test test/models/report_test.rb test/controllers/reports_controller_test.rb test/controllers/sightings_controller_test.rb
```

### If a migration/initializer was modified

This project has no SQL migrations. If `config/mongoid.yml` was modified, run the full test suite.

## Step 5: Output Format

```
## Test Results — ufohunters-site

**Staged source files:** <count>
**Mapped test files:** <count> found, <count> missing
**Tests run:** <count>
**Passed:** <count>
**Failed:** <count>
**Skipped:** <count>
**Duration:** <time>

### Failed Tests
- `test/models/report_test.rb::test_requires_location` — Expected false to be truthy

### Missing Test Files (no tests found for)
- `app/services/report_submission_service.rb` — expected at `test/services/report_submission_service_test.rb`

### Warnings
- Mongoid: verify teardown { delete_all } is present in all test files that create documents
```

## Rules of Engagement

1. Never run the full test suite unless a shared dependency (test_helper.rb, mongoid.yml) is changed.
2. Always report source files that have no corresponding test file.
3. If zero test files are found, exit with a warning, not an error.
4. Capture and display test output — do not swallow failures.
5. Return non-zero exit code if any test fails.
6. Mongoid-specific: flag if discovered test files lack `teardown { delete_all }`.
