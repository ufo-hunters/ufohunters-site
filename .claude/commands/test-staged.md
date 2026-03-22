---
name: test-staged
description: "Run Minitest tests related to staged files for fast feedback in ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# /test-staged — Run Tests for Modified Files

Detect and run Minitest tests that correspond to staged and modified source files.

## Instructions

### Step 1: Get Modified Source Files

```bash
# Staged files
git diff --cached --name-only --diff-filter=ACMR

# Unstaged modified files
git diff --name-only --diff-filter=ACMR
```

Combine both lists and deduplicate. Filter to source files only (files in `app/`).

If no modified source files found, report "No modified source files detected" and stop.

### Step 2: Map Source Files to Test Files

For each modified source file, find corresponding test files using these mapping patterns:

| Source File Pattern                    | Mapped Test File                              |
|----------------------------------------|-----------------------------------------------|
| `app/models/report.rb`                 | `test/models/report_test.rb`                  |
| `app/controllers/reports_controller.rb` | `test/controllers/reports_controller_test.rb` |
| `app/controllers/sightings_controller.rb` | `test/controllers/sightings_controller_test.rb` |
| `app/services/foo_service.rb`          | `test/services/foo_service_test.rb`           |
| `app/mailers/notifier.rb`              | `test/mailers/notifier_test.rb`               |
| `app/helpers/foo_helper.rb`            | `test/helpers/foo_helper_test.rb`             |

**Mapping rule**: Replace `app/` prefix with `test/`, replace `.rb` suffix with `_test.rb`.

Also check if any modified files ARE test files themselves (in `test/`). Include those directly.

```bash
# Try to find test files
for source_file in <modified_files>; do
  base=$(basename "$source_file" .rb)
  find test/ -name "${base}_test.rb" 2>/dev/null
done
```

### Step 3: Verify Test Files Exist

For each mapped test file, verify it exists. Report:
- Source files WITH corresponding tests
- Source files WITHOUT corresponding tests (flag as missing)

### Step 4: Run Tests

Run only the detected test files:

```bash
bundle exec rails test <test_file_1> <test_file_2> ...
```

For a single test file:
```bash
bundle exec rails test test/models/report_test.rb
```

For a specific test within a file:
```bash
bundle exec rails test test/models/report_test.rb:42
```

### Step 5: Report Results

```
## Test Report — ufohunters-site

### Modified Source Files
  <list of modified source files>

### Test Files Detected
  app/models/report.rb -> test/models/report_test.rb
  app/controllers/reports_controller.rb -> test/controllers/reports_controller_test.rb
  app/services/submission_service.rb -> (no test file found) [WARNING]

### Test Execution

  bundle exec rails test <files>

  Passed: N
  Failed: M
  Skipped: K
  Duration: X.Xs

### Failed Tests
  ReportTest#test_requires_location — Expected false to be truthy
  <test name> — <failure message>

### Files Without Tests [ACTION NEEDED]
  app/services/report_submission_service.rb — expected at test/services/report_submission_service_test.rb
  Consider creating test files for these modules.

### Verdict: PASS / FAIL
```

### Step 6: Verdict

- **PASS** — All detected tests pass
- **FAIL** — One or more tests failed. Must fix before commit.
- **WARNING** — Tests pass but some source files lack test coverage

### Notes

- If a test helper in `test/test_helper.rb` was modified, run the full test suite: `bundle exec rails test`
- Mongoid: verify all test files have proper `teardown { delete_all }` cleanup
