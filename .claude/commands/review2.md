---
name: review2
description: "Independent second-opinion architecture and design review for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
argument-hint: "[base-branch]"
---
# /review2 — Independent Second-Opinion Review

Perform an independent code review from a fresh perspective. This review is intentionally more opinionated than `/review` and focuses on architectural decisions, subtle bugs, and long-term maintainability in the Rails 8 + Mongoid 9 context.

## Instructions

### Step 1: Read CLAUDE.md

Read `/home/paco/Documentos/APP/UFO/ufohunters-site/CLAUDE.md` to understand conventions and constraints.

### Step 2: Gather Changes

```bash
git diff --cached
git diff
git log --oneline -5
```

### Step 3: Independent Analysis

#### Architecture & Design
- Does this change fit the existing MVC architecture or fight against it?
- Is business logic in the right layer? (Fat model, skinny controller)
- Does this introduce unnecessary coupling between Mongoid documents?
- Would a different approach be simpler while achieving the same result?
- Is a service object warranted, or is this complexity premature?

#### Mongoid-Specific Architecture
- Are relationships modeled correctly (embedded vs referenced)?
- Are geospatial coordinates stored as `[longitude, latitude]` (GeoJSON order)?
- Are indexes appropriate and declared for new query patterns?
- Is the `ufo` collection store_in directive correct for new Reports-related models?

#### Edge Cases & Robustness
- What happens with nil coordinates on a report?
- What happens when a user submits a report with invalid coordinates?
- What happens when Cloudinary upload fails?
- What happens when MongoDB connection is temporarily unavailable?
- What happens with concurrent report submissions from the same user?

#### Error Handling
- Are all error paths explicit? No silent swallowing.
- Are Mongoid validation errors surfaced to users correctly?
- Are external service failures (Cloudinary, reCAPTCHA, SendGrid) handled gracefully?
- Are error messages user-friendly (no stack traces in views)?

#### Security Deep Dive
- Authentication: Is the caller verified via session auth before protected actions?
- Authorization: Can users only modify their own reports/articles?
- Input validation: Are user-submitted coordinates validated before 2dsphere indexing?
- reCAPTCHA: Is it verified before saving user-submitted UFO reports?
- File uploads: Are CarrierWave uploaders enforcing file type and size limits?
- Mass assignment: Are all controller actions using strong parameters?

#### CLAUDE.md Compliance
- Does this change follow all conventions in CLAUDE.md?
- No SQL/ActiveRecord patterns introduced?
- No fixture references introduced?
- Minitest teardown present in test files?

### Step 4: Opinionated Takes

Be direct. If something smells wrong, say so:

```
OPINION: [Strong/Moderate/Mild]
What: Description of the concern
Why: Why this matters for ufohunters-site
Alternative: What I would do instead
```

### Step 5: Output Report

```
## Independent Review — ufohunters-site

### First Impressions
(1-2 sentences: what does this change do and is the approach sound?)

### Architecture Assessment
(findings related to design and architecture)

### Mongoid-Specific Assessment
(findings related to document design, indexes, query patterns)

### Edge Case Analysis
(findings related to robustness)

### Error Handling Assessment
(findings related to error paths)

### Security Assessment
(findings related to auth, mass assignment, uploads, reCAPTCHA)

### CLAUDE.md Compliance
- [ ] Follows Rails + Mongoid conventions (no ActiveRecord patterns)
- [ ] No SQL migration files introduced
- [ ] No fixture references
- [ ] Minitest teardown present in test files
- [ ] No anti-patterns from CLAUDE.md NEVER list
- [ ] Tests present for new code

### Opinionated Takes
(OPINION items)

### Confidence Score: XX/100
How confident am I that this code will work correctly in production?
- 90-100: Ship it, very confident
- 70-89: Good, minor concerns
- 50-69: Needs attention, notable risks
- Below 50: Would not ship without changes

### Verdict
(One of: SHIP IT / LOOKS GOOD / NEEDS WORK / DO NOT SHIP)
(Brief justification)
```
