---
name: panel
description: "Daily development dashboard showing project health, recent changes, and pending tasks for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
---
# /panel — Daily Development Dashboard

Generate a morning briefing dashboard showing the current state of ufohunters-site.

## Instructions

### Step 1: Gather Data

```bash
# Current branch and status
git branch --show-current
git status --short

# Recent commits (last 24-48 hours)
git log --oneline --since="2 days ago" --all

# Open PRs (if GitHub CLI available)
gh pr list --state open --json number,title,author,createdAt,reviewDecision,statusCheckRollup,headRefName --limit 20 2>/dev/null || echo "gh CLI not available or not authenticated"

# PRs needing your review
gh pr list --state open --search "review-requested:@me" --json number,title,author 2>/dev/null || echo ""

# Recently merged PRs
gh pr list --state merged --json number,title,mergedAt --limit 5 2>/dev/null || echo ""
```

### Step 2: Check Project Status Files

```bash
# Backlog status
cat product/backlog/_status.md 2>/dev/null || echo "No product/backlog/_status.md found"

# Technical debt tracker
cat doc/deuda-tecnica.md 2>/dev/null || echo "No doc/deuda-tecnica.md found"
```

### Step 3: Check Test Suite Health

```bash
# Run tests (or just check last test output)
echo "Run 'bundle exec rails test' to check test health"

# Check for any skipped or failing test patterns
grep -r "skip\b" test/ --include="*.rb" | grep -v "# skip" | head -10 2>/dev/null || echo "No skipped tests found"
```

### Step 4: Local State Check

```bash
# Uncommitted work
git stash list

# Branches with unpushed commits
git log --branches --not --remotes --oneline --decorate

# Check for merge conflicts in progress
git status | grep -i "conflict\|rebase\|merge" || echo "No conflicts or in-progress operations"
```

### Step 5: Rails-Specific Checks

```bash
# Check for any accidental SQL migration files (should not exist in this Mongoid project)
ls db/migrate/*.rb 2>/dev/null && echo "WARNING: SQL migration files found — this project uses Mongoid" || echo "OK: No SQL migration files"

# Check for debug artifacts
grep -rn "binding.pry\|debugger\|puts\b" app/ --include="*.rb" | grep -v "^\s*#" | head -5 2>/dev/null || echo "No debug artifacts found"
```

### Step 6: Generate Dashboard

```
================================================================
  DAILY PANEL — ufohunters-site
  Date: <today's date>
  Branch: <current branch>
  Stack: Ruby 3.2.8 / Rails 8.0.2 / Mongoid 9.0
================================================================

## Git Status
  Modified: X files
  Staged: Y files
  Untracked: Z files
  Stashed: N entries

## Open Pull Requests (N total)
  | #   | Title                    | Author   | CI     | Review   |
  |-----|--------------------------|----------|--------|----------|
  | 123 | Add report pagination    | @dev     | PASS   | APPROVED |

## Needs Your Review
  - #124 Fix map JSON endpoint (@dev2)

## Failing CI
  - (CI not yet configured — see CLAUDE.md for GitHub Actions setup)

## Recent Merges (last 48h)
  - #120 Refactor sightings controller (merged 6h ago)

## Recent Commits (last 48h)
  <commit log>

## Unpushed Work
  <branches with unpushed commits>
  <stashed changes>

## Rails Health Checks
  SQL migrations:     OK (none — Mongoid project)
  Debug artifacts:    <result>
  Skipped tests:      <count>

## Backlog Status
  <summary from product/backlog/_status.md or "No status file found">

## Technical Debt
  <summary from doc/deuda-tecnica.md or "No debt tracker found">

## Today's Priorities
  1. <derived from open PRs needing review>
  2. <derived from failing CI>
  3. <derived from backlog status>
  4. <derived from uncommitted work>

================================================================
```

### Notes

- If `gh` CLI is not available, skip GitHub-related sections and note it
- CI section notes that GitHub Actions is not yet configured (Travis CI is stale)
- Priorities are derived from urgency: failing CI > pending reviews > in-progress work > backlog items
