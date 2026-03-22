---
name: doc-review
description: "Documentation quality review checking completeness, accuracy, and freshness for ufohunters-site."
allowed-tools: Read, Grep, Glob
---
# /doc-review — Documentation Review

Review documentation changes for quality, correctness, and completeness in ufohunters-site.

## Instructions

### Step 1: Identify Documentation Changes

```bash
# Staged doc changes
git diff --cached --name-only -- "*.md" "*.mdx" "*.txt" "doc/**" "README*" "CHANGELOG*" "CONTRIBUTING*"

# Unstaged doc changes
git diff --name-only -- "*.md" "*.mdx" "*.txt" "doc/**" "README*" "CHANGELOG*" "CONTRIBUTING*"
```

If no documentation files changed, report "No documentation changes detected" and stop.

### Step 2: Read Changed Documentation

For each changed documentation file:

```bash
git diff --cached -- <file>
git diff -- <file>
```

### Step 3: Markdown Formatting Review

Check each document for:

#### Structure
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Consistent heading style
- [ ] Blank lines before and after headings
- [ ] Blank lines before and after code blocks
- [ ] Consistent list marker style

#### Code Blocks
- [ ] All code blocks have a language identifier (```ruby, ```bash, ```json)
- [ ] Code blocks are properly closed
- [ ] Inline code uses backticks for file names, commands, method names

### Step 4: Rails/Mongoid Accuracy Check

Verify that documentation is accurate for the Rails 8 + Mongoid 9 stack:

- [ ] No references to ActiveRecord migrations (this is a Mongoid project)
- [ ] No references to `db:create`, `db:migrate` (Mongoid uses `db:mongoid:create_indexes`)
- [ ] No references to FactoryBot or fixtures (project uses custom helper methods)
- [ ] Ruby version references match: Ruby 3.2.8
- [ ] Rails version references match: Rails 8.0.2
- [ ] Mongoid version references match: Mongoid 9.0
- [ ] Test commands use `bundle exec rails test` not `rspec`
- [ ] Coordinate order is documented as [longitude, latitude] (GeoJSON order)

### Step 5: Internal Link Validation

For each internal link, verify the target file exists and is accessible.

### Step 6: Completeness Check

#### For Setup/Development Guides
- [ ] Prerequisites listed (Ruby version, MongoDB installation)
- [ ] MongoDB startup instructions present
- [ ] Environment variables documented
- [ ] Commands are copy-pasteable and correct

#### For API Documentation
- [ ] All parameters documented with types
- [ ] GeoJSON response format documented for `/map_json`
- [ ] Error responses documented

#### For ADRs
- [ ] Status field present
- [ ] Date present
- [ ] Context and decision documented

### Step 7: Code Example Verification

For each code example in the documentation:

1. Check syntax looks like valid Ruby/Rails 8 code
2. Check that Mongoid API is used (not ActiveRecord)
3. Check that examples reflect the actual codebase structure
4. Verify test examples use `ActiveSupport::TestCase`, not RSpec

### Step 8: Report

```
## Documentation Review — ufohunters-site

### Files Reviewed
  <list of files>

### Formatting Issues
  <file>:<line> — [FORMAT] <description>

### Rails/Mongoid Accuracy Issues
  <file>:<line> — [ACCURACY] ActiveRecord migration reference found (should be Mongoid)
  <file>:<line> — [ACCURACY] RSpec reference found (project uses Minitest)
  <file>:<line> — [ACCURACY] Fixtures reference found (incompatible with Mongoid)

### Broken Links
  <file>:<line> — [BROKEN LINK] <link> -> <expected target>

### Completeness Gaps
  <file> — [INCOMPLETE] <what is missing>

### Code Example Issues
  <file>:<line> — [CODE] ActiveRecord pattern in code example (should use Mongoid)

### Writing Quality
  <file>:<line> — [SPELLING] <word> -> <suggestion>
  <file>:<line> — [CLARITY] <suggestion>

### Summary
  Files reviewed: N
  Formatting issues: X
  Accuracy issues: Y
  Broken links: Z
  Completeness gaps: A
  Code issues: B
  Writing issues: C

### Verdict
  CLEAN — No significant issues
  NEEDS POLISH — Minor issues, non-blocking
  NEEDS REVISION — Significant issues that should be addressed
```
