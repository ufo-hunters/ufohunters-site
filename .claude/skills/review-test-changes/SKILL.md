---
name: review-test-changes
description: "Specialized review of Minitest changes, coverage quality, teardown presence, and Mongoid compatibility for ufohunters-site."
allowed-tools: Read, Grep, Glob
---
# Test Coverage Analysis — ufohunters-site

## Purpose

Analyze test changes in **ufohunters-site** (Rails 8 / Mongoid 9) to detect coverage regressions, weakened assertions, removed tests, Mongoid teardown issues, and new code lacking test coverage.

## Step 1: Detect Coverage Regression

```bash
# Run tests to get current pass/fail count
bundle exec rails test 2>&1 | tail -5
```

Look for changes in the test count between base and head.

## Step 2: Analyze Removed or Weakened Assertions

### Detect Removed Tests

```bash
# Find deleted test definitions
git diff --cached -U0 -- 'test/**' | grep '^-.*test "' | head -20
```

### Detect Missing Mongoid Teardown (CRITICAL)

This is the most important check for this Mongoid project. Test pollution via missing `delete_all` causes intermittent test failures.

```bash
# Check if teardown with delete_all was removed
git diff --cached -- 'test/**' | grep -E "^-.*teardown|^-.*delete_all" | head -20

# Check new test files for missing teardown
git diff --cached --name-only --diff-filter=A -- 'test/**/*.rb' | while read f; do
  if ! grep -q "delete_all" "$f" 2>/dev/null; then
    echo "MISSING: $f has no teardown { delete_all }"
  fi
done
```

### Detect Fixture Introduction (CRITICAL for Mongoid)

```bash
# Fixtures are incompatible with Mongoid — flag immediately
git diff --cached -- 'test/**' | grep "^+.*fixtures\b" | head -10
```

### Classify Test Removals

- **Removed test for removed feature**: Acceptable. Verify the feature code is also removed.
- **Removed test for existing feature**: Flag as `[CRITICAL]`.
- **Removed `delete_all` from teardown**: Flag as `[CRITICAL]` — will cause test pollution.
- **Added `fixtures`**: Flag as `[CRITICAL]` — Mongoid incompatible.

### Detect Weakened Assertions

Look for these patterns in test diffs:

| Pattern                                                  | Concern                             |
|----------------------------------------------------------|-------------------------------------|
| `assert_equal specific, result` → `assert result`       | Weakened: value check → truthiness  |
| `assert_response :success` removed                       | HTTP status no longer verified      |
| `assert_difference 'Report.count', 1` → removed         | Record creation no longer verified  |
| `teardown { delete_all }` removed                        | Test isolation broken (Mongoid)     |
| `.skip` added to test                                    | Test disabled                       |

## Step 3: Check New Code Has Tests

```bash
# Source files added or modified
git diff --cached --name-only --diff-filter=ACM -- 'app/**' | grep '\.rb$'

# For each, check if test file exists
for f in <modified_source_files>; do
  test_file=$(echo "$f" | sed 's|^app/|test/|' | sed 's|\.rb$|_test.rb|')
  [ -f "$test_file" ] || echo "MISSING test: $test_file"
done
```

### Exemptions (tests not required)

- Configuration files (`config/`)
- View templates (`app/views/`)
- Asset files
- Initializers

## Step 4: Minitest Coverage Tools

### Verify Test Suite Runs Clean

```bash
bundle exec rails test 2>&1 | grep -E "^\d+ runs|Error|Failure"
```

### Per-File Coverage Check

If SimpleCov is configured:
```bash
# SimpleCov result is in coverage/index.html
```

## Step 5: Report Format

```
## Test Coverage Analysis — ufohunters-site

### Test Suite Status
  Run: bundle exec rails test
  Result: <N runs, N assertions, N failures, N errors, N skips>

### Critical Issues (Mongoid-Specific)

#### Missing Mongoid Teardown (test pollution risk)
  test/models/report_test.rb — no `teardown { delete_all }` found
  Action: Add teardown block to clean up MongoDB documents between tests

#### Fixture References (Mongoid incompatible)
  test/models/user_test.rb:L3 — `fixtures :users` found
  Action: Remove and replace with `create_dummy_user` helper method

#### Removed Tests for Existing Features
  test/controllers/reports_controller_test.rb — POST #create test removed
  Corresponding source code: still exists in app/controllers/reports_controller.rb

### Weakened Assertions
  test/models/report_test.rb:L25
    Was: assert_equal 'published', @report.status
    Now: assert @report.status
    Concern: Status value no longer verified

### Untested New Code

  app/models/report.rb:L45 — `#has_coordinates?` method — no test found
  app/services/submission_service.rb — no test file found at test/services/submission_service_test.rb

### Coverage Gains

  test/models/report_test.rb — Added 3 new tests
  test/controllers/sightings_controller_test.rb — Added 2 new assertions

### Coverage Delta
  Tests removed: -X
  Tests added: +Y
  Teardown blocks removed: -Z (CRITICAL)
  Net delta: <+/- N>

### Verdict
  SAFE — No coverage loss detected
  WARNING — Minor coverage concerns, review recommended
  UNSAFE — Significant coverage reduction, must address before merge
```

## Rules of Engagement

1. Mongoid teardown removal is always `[CRITICAL]` — it breaks all subsequent tests in the suite.
2. Fixture introduction is always `[CRITICAL]` — Mongoid does not support Rails fixtures.
3. Never block a PR solely for coverage percentage — context matters.
4. New public model methods without ANY test coverage are always flagged.
5. Disabled/skipped tests must include a comment or linked issue explaining why.
