---
name: lint-staged
description: "Lint staged Ruby files for fast pre-commit feedback in ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# /lint-staged — Lint Staged Files Only

Run RuboCop exclusively on staged Ruby files. If RuboCop is not yet configured, perform a manual style check.

## Instructions

### Step 1: Get Staged Files

```bash
git diff --cached --name-only --diff-filter=ACMR
```

If no files are staged, report "No staged files to lint" and stop.

### Step 2: Filter Ruby Files

From the staged files, keep only `.rb` files. Exclude:
- `vendor/` directory
- `tmp/` directory
- Any auto-generated files

If no Ruby files remain, report "No Ruby files staged" and stop.

### Step 3: Check if RuboCop is Configured

```bash
# Check if rubocop is available
bundle exec rubocop --version 2>/dev/null
```

### Step 4a: If RuboCop IS Configured

Run RuboCop on staged Ruby files only:

```bash
bundle exec rubocop --force-exclusion <file1.rb> <file2.rb> ...
```

Parse results for file, line, rule, and severity.

### Step 4b: If RuboCop is NOT Configured

Perform a manual Ruby style check looking for common issues:

```bash
# Check for long lines (>120 chars)
awk 'length > 120 {print FILENAME ":" NR ": line too long (" length " chars)"}' <staged_files>

# Check for debug artifacts
grep -n "binding.pry\|debugger\|puts\b\|p(" <staged_files> | grep -v "^\s*#"

# Check for trailing whitespace
grep -n " $" <staged_files>

# Check for ActiveRecord patterns (should not appear in this Mongoid project)
grep -n "ApplicationRecord\|ActiveRecord::Base\|\.where(\".*?\"\)" <staged_files>

# Check for SQL migration references
grep -n "create_table\|add_column\|add_index\|change_column" <staged_files>
```

### Step 5: Report Results

```
## Lint Report — ufohunters-site

### Files Checked
  <list of Ruby files checked>

### RuboCop Status
  <Configured / Not Configured>

### Results

#### Errors (N)
  file.rb:line:col — [rule-name] Error message
  OR
  file.rb:line — [MANUAL] Long line / Debug artifact / ActiveRecord pattern found

#### Warnings (N)
  file.rb:line:col — [rule-name] Warning message

### Summary
  Files checked: N
  Errors: X
  Warnings: Y
  Status: PASS / FAIL
```

### Step 6: RuboCop Setup Reminder (if not configured)

If RuboCop is not configured:

```
### RuboCop Not Configured

To set up RuboCop for this project:
1. Add to Gemfile (development group):
   gem 'rubocop', require: false
   gem 'rubocop-rails', require: false
   gem 'rubocop-performance', require: false
   gem 'rubocop-minitest', require: false

2. Run: bundle install
3. Run: bundle exec rubocop --auto-gen-config
4. Review .rubocop_todo.yml and .rubocop.yml

See .claude/agents/rubocop-guide.md for detailed setup instructions.
```

### Step 7: Verdict

- **PASS** — No errors. Warnings are informational only.
- **FAIL** — Errors found. Must be fixed before commit.

If FAIL, do NOT proceed with commit until errors are resolved.
