---
name: review-test-changes
description: "Review Minitest test file changes for coverage quality, teardown presence, and assertion correctness in ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# /review-test-changes — Test Coverage Loss Detection

Analyze changes to detect if test coverage is being reduced, weakened, or if new code lacks tests.

## Instructions

### Step 1: Gather Test-Related Changes

```bash
# All changes in test files
git diff --cached -- "test/**"
git diff -- "test/**"

# All changes in source files (to check for untested new code)
git diff --cached -- "app/**"
git diff -- "app/**"

# Full stat to understand scope
git diff --cached --stat
git diff --stat
```

### Step 2: Analyze Test File Removals

```bash
git diff --cached --name-only --diff-filter=D -- "test/**"
git diff --name-only --diff-filter=D -- "test/**"
```

Any deleted test file is a **[CRITICAL]** finding unless the corresponding source file was also deleted.

### Step 3: Analyze Removed Test Assertions

In modified test files, look for removed lines that contain:

- Minitest assertion keywords: `assert`, `assert_equal`, `assert_not`, `assert_includes`, `assert_nil`, `assert_raises`, `assert_response`, `assert_redirected_to`, `assert_difference`, `assert_no_difference`
- Test definition: `test "..."`
- Setup/teardown methods: `setup do`, `teardown do`

**Special check — Mongoid teardown**: Look for `teardown do` blocks that contain `delete_all`. If a teardown is removed or weakened:

```bash
git diff --cached -- "test/**" | grep -E "^-.*teardown|^-.*delete_all"
```

If `delete_all` is removed from teardown, this is a **[CRITICAL]** finding — tests will pollute each other.

### Step 4: Analyze Weakened Assertions

Look for assertions changed to be less specific:

- `assert_equal specific_value, result` changed to `assert result` — weakened
- `assert_includes collection, item` changed to `assert_not_nil collection` — weakened
- `assert_response :success` changed to nothing — removed check
- `assert_difference 'Report.count', 1` changed to `assert_no_difference` — logic change

### Step 5: Check New Code for Test Coverage

For each new or modified method in `app/`:

1. Identify the method name
2. Search for corresponding test assertions in `test/`
3. Flag any new public method with zero test references

```bash
# Get new methods added
git diff --cached -- "app/**" | grep "^+" | grep -E "def [a-z_]+" | grep -v "#"
```

### Step 6: Mongoid-Specific Checks

```bash
# Verify new test files have teardown with delete_all
git diff --cached --name-only --diff-filter=A -- "test/**" | while read f; do
  if ! grep -q "delete_all" "$f" 2>/dev/null; then
    echo "WARNING: New test file $f missing teardown delete_all"
  fi
done

# Check for fixture references (incompatible with Mongoid)
git diff --cached -- "test/**" | grep "^+.*fixtures"
```

### Step 7: Report

```
## Test Coverage Review — ufohunters-site

### Changes Summary
  Source files modified: N
  Test files modified: M
  Test files deleted: D
  Test files added: A

### Coverage Losses [CRITICAL]

#### Deleted Tests
  <file> — <test name> (corresponding source: exists/deleted)

#### Missing Mongoid Teardown
  <file> — teardown { delete_all } removed or missing — CRITICAL (tests will pollute each other)

#### Removed Assertions (without replacement)
  <file>:<line> — Removed: <assertion text>

#### Weakened Assertions
  <file>:<line> — Was: assert_equal expected, actual
  <file>:<line> — Now: assert actual
  Concern: Value equality check weakened to truthiness

### Untested New Code [WARNING]

  app/models/report.rb:45 — #has_location? method has no corresponding test
  app/services/submission_service.rb — No test file found

### Fixture References Found [CRITICAL]
  (Mongoid is incompatible with Rails fixtures — must use create_dummy_* helpers)
  <file>:<line> — fixtures reference found

### Coverage Gains [POSITIVE]

  test/models/report_test.rb — Added N new test(s)
  test/controllers/reports_controller_test.rb — Added M new assertion(s)

### Coverage Delta
  Tests removed: -X
  Tests added: +Y
  Assertions removed: -A
  Assertions added: +B
  Net delta: <+/- N>

### Verdict
  SAFE — No coverage loss detected
  WARNING — Minor coverage concerns, review recommended
  UNSAFE — Significant coverage reduction, must address before merge
```

### Decision Guidance

- If teardown `delete_all` was removed: **UNSAFE** (tests will fail intermittently)
- If fixtures were introduced: **UNSAFE** (Mongoid incompatible)
- If net delta is positive and no tests were removed without justification: **SAFE**
- If new code lacks tests but no existing tests were harmed: **WARNING**
- If tests were removed or weakened without corresponding source removal: **UNSAFE**
