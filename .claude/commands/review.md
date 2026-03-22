---
name: review
description: "Full code review of current branch against base with quality, security, and Rails/Mongoid convention checks."
allowed-tools: Read, Grep, Glob, Bash
argument-hint: "[base-branch]"
---
# /review — Full Code Review

Perform an exhaustive code review of all staged and uncommitted changes in this Rails 8 + Mongoid 9 repository.

## Instructions

### Step 1: Gather Changes

```bash
git diff --cached --stat
git diff --cached
git diff --stat
git diff
```

If there are no changes (both staged and unstaged are empty), report "No changes to review" and stop.

### Step 2: Identify Changed Files

List all modified files and categorize them:
- Source files (`app/**`)
- Test files (`test/**`)
- Configuration files
- Documentation files

### Step 3: Analyze Each File

For every changed file, evaluate the following dimensions:

#### Correctness
- Does the logic do what it claims to do?
- Are edge cases handled (nil, empty, boundary values)?
- Are error paths handled explicitly (no silent failures)?
- Are return types correct and consistent?

#### Security
- No hardcoded secrets (API keys for Google Maps, Cloudinary, SendGrid, reCAPTCHA)
- Input validation present where data enters the system (report submissions, user registration)
- No mass assignment vulnerabilities (strong parameters verified)
- reCAPTCHA validated before saving user-submitted reports
- File uploads validated by CarrierWave uploaders (type, size)
- Authentication guards present on protected actions (`before_action :authenticate_user`)
- No sensitive data (passwords, tokens) in logs

#### Performance
- No N+1 query patterns with Mongoid (look for queries inside `each` loops)
- No full collection scans — `.all.to_a` on large collections is dangerous
- Appropriate use of Mongoid scopes and criteria chaining
- No `.map` on an uncriteria-constrained Mongoid collection
- Geospatial queries use the 2dsphere index on `coord`

#### Rails + Mongoid Conventions
- Models use `include Mongoid::Document`, NOT `ApplicationRecord`
- Fields declared with `field :name, type: Type`
- No SQL migration files — schema changes in model files only
- No ActiveRecord query syntax (no `.where("status = ?", x)`)
- No Rails fixture references — test data via helper methods
- Proper use of Mongoid associations (`has_many`, `belongs_to`, `embeds_many`)
- Controllers use strong parameters

#### Test Coverage
- Do new Mongoid fields/validations have corresponding tests?
- Are new controller actions covered?
- Do tests have `teardown { delete_all }` for Mongoid cleanup?
- Are new service objects tested?

### Step 4: Tag Each Finding

| Tag          | Meaning                                           | Blocks Merge? |
|--------------|---------------------------------------------------|---------------|
| `[CRITICAL]` | Bug, security issue, data loss risk, crash        | Yes           |
| `[SUG]`      | Improvement suggestion, better approach available | No            |
| `[NIT]`      | Style, naming, minor readability                  | No            |
| `[Q]`        | Question — needs clarification from author        | Maybe         |

### Step 5: Format Each Finding

```
[TAG] file:line — Short title
  Description of the issue.
  Suggested fix or question.
```

### Step 6: Output Structured Report

```
## Code Review Report — ufohunters-site

### Summary
- Files reviewed: N
- Findings: X critical, Y suggestions, Z nits, W questions
- Overall assessment: PASS / PASS WITH COMMENTS / NEEDS CHANGES / BLOCK

### Critical Issues
(list [CRITICAL] findings or "None")

### Suggestions
(list [SUG] findings or "None")

### Nits
(list [NIT] findings or "None")

### Questions
(list [Q] findings or "None")

### Rails/Mongoid-Specific Notes
(any framework-specific observations — Mongoid patterns, missing teardown, SQL patterns crept in, etc.)

### Test Coverage Assessment
(summary of test coverage for changed code)

### Score: XX/100
- Correctness: XX/30
- Security: XX/20
- Performance: XX/15
- Conventions: XX/15
- Test Coverage: XX/20
```

### Step 7: Final Recommendation

Provide a clear recommendation:
- **APPROVE** — No critical issues, code is ready
- **APPROVE WITH COMMENTS** — Minor issues noted but not blocking
- **REQUEST CHANGES** — Issues must be addressed before merge
- **BLOCK** — Critical issues that pose risk to production
