---
name: lint-staged
description: "Run RuboCop (or manual style checks) only on staged Ruby files for fast feedback in ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# Intelligent Lint — ufohunters-site

## Purpose

Run Ruby style checks intelligently on staged files in **ufohunters-site** (Rails 8 / Ruby 3.2.8).
If RuboCop is configured, use it. If not, run a manual style scan.

## Step 1: Identify Staged Files

```bash
git diff --cached --name-only --diff-filter=ACM | grep '\.rb$'
```

Filter to only `.rb` files. Exclude `vendor/`, `tmp/`, and auto-generated files.

## Step 2: Check RuboCop Availability

```bash
bundle exec rubocop --version 2>/dev/null
```

## Step 3a: If RuboCop IS Configured

Run on staged files only:

```bash
bundle exec rubocop --force-exclusion <staged_rb_files>
```

Re-stage auto-fixed files after safe corrections:

```bash
bundle exec rubocop -a --force-exclusion <staged_rb_files>
git add <auto-fixed-files>
```

## Step 3b: If RuboCop NOT Yet Configured

Run manual checks:

```bash
# 1. Long lines (> 120 chars)
awk 'length > 120 {print FILENAME ":" NR ": line too long (" length " chars)"}' <staged_files>

# 2. Debug artifacts (must never be committed)
grep -n "binding\.pry\|debugger\|puts\b\|p(" <staged_files> | grep -v "^\s*#"

# 3. Trailing whitespace
grep -n " $" <staged_files>

# 4. ActiveRecord patterns (WRONG for this Mongoid project)
grep -n "ApplicationRecord\|ActiveRecord::Base\|create_table\|add_column\|add_index" <staged_files>

# 5. Fixture references (incompatible with Mongoid)
grep -n "^  fixtures\b" <staged_files>

# 6. Missing frozen string literal (when adopting RuboCop later)
grep -rL "# frozen_string_literal: true" <staged_files>
```

## Step 4: Common Issues for This Stack

### Issue: Mongoid model missing `include Mongoid::Document`
**Resolution:** Every Mongoid model must include `Mongoid::Document` — not inherit from `ApplicationRecord`.

### Issue: Test file missing teardown cleanup
**Resolution:** Every test class that creates Mongoid documents must have:
```ruby
teardown do
  Report.delete_all  # (or whichever collections were touched)
end
```

### Issue: ActiveRecord SQL query patterns
**Resolution:** Replace with Mongoid criteria:
```ruby
# WRONG
Report.where("status = ?", 'published')
# RIGHT
Report.where(status: 'published')
```

### Issue: Coordinate order in geospatial data
**Resolution:** Always store as `[longitude, latitude]` (GeoJSON order), not `[latitude, longitude]`.

## Step 5: Output Format

```
## Lint Results — ufohunters-site

**Files checked:** <count>
**RuboCop configured:** Yes / No
**Auto-fixed:** <count> issues in <count> files
**Remaining issues:** <count>

### Errors (must fix)
- `app/models/report.rb:L10` — debug artifact: `binding.pry` found
- `app/models/user.rb:L25` — ActiveRecord pattern: `ApplicationRecord` in Mongoid project
- `test/models/report_test.rb:L5` — fixtures reference (incompatible with Mongoid)

### Warnings (should fix)
- `app/controllers/reports_controller.rb:L45` — line too long (145 chars)

### Auto-Fixed (RuboCop safe corrections)
- `app/models/report.rb` — 3 fixes applied (trailing whitespace, string literals)
```

## Rules of Engagement

1. Only lint staged files — never lint the entire project during a pre-commit check.
2. Auto-fix safe issues (whitespace, string style) and re-stage them.
3. Report ActiveRecord patterns as errors — this is a Mongoid project.
4. Report fixture references as errors — Mongoid incompatible.
5. Debug artifacts (`binding.pry`, `puts`) are always errors.
6. Exit with non-zero status if there are unfixed errors.
