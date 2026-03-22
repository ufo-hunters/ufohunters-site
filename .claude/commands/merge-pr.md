---
name: merge-pr
description: "Guided PR merge workflow with pre-merge checklist and validation for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
argument-hint: "<pr-number>"
---
# /merge-pr — Guided PR Merge Workflow

Perform a safe, guided merge of a pull request with pre-merge checks and post-merge cleanup.

## Instructions

### Step 1: Identify the PR

```bash
git branch --show-current
gh pr view --json number,title,state,mergeable,reviewDecision,statusCheckRollup,headRefName,baseRefName,additions,deletions,changedFiles
```

If no PR exists for the current branch, report the error and stop.

### Step 2: Pre-Merge Safety Checks

```
## Pre-Merge Checklist — ufohunters-site

- [ ] PR state is OPEN
- [ ] CI checks passing (if GitHub Actions is configured)
- [ ] Review approved (reviewDecision = APPROVED)
- [ ] No merge conflicts (mergeable = MERGEABLE)
- [ ] Branch is up to date with base
```

```bash
git fetch origin
git log --oneline HEAD..origin/$(gh pr view --json baseRefName -q '.baseRefName') | head -20
```

Run the test suite locally:

```bash
bundle exec rails test
```

All tests must pass before merging.

**Rails/Mongoid-specific checks:**
- [ ] No SQL migration files were introduced (check `db/migrate/`)
- [ ] Test files have `teardown { delete_all }` for Mongoid collections
- [ ] No ActiveRecord query patterns were introduced
- [ ] Mongoid indexes are declared in model files (not in migrations)

If any CRITICAL check fails (tests, conflicts), do NOT proceed. Ask the user to fix issues first.

### Step 3: Merge Strategy Selection

```
## Merge Strategy

1. **Squash and merge** (recommended for feature branches)
   - Combines all commits into one clean commit
   - Best for: feat/, fix/ branches with messy commit history

2. **Merge commit** (recommended for long-lived branches)
   - Preserves full commit history with a merge commit
   - Best for: branches with meaningful, atomic commits

3. **Rebase and merge** (recommended for clean histories)
   - Replays commits on top of base branch
   - Best for: branches with clean, linear commit history

Current branch: <branch-name>
Commits in PR: <count>
Recommendation: <strategy> because <reason>
```

Ask the user which strategy to use before proceeding.

### Step 4: Execute Merge

```bash
# For squash:
gh pr merge --squash --delete-branch

# For merge commit:
gh pr merge --merge --delete-branch

# For rebase:
gh pr merge --rebase --delete-branch
```

### Step 5: Post-Merge Cleanup

```bash
git checkout $(gh pr view --json baseRefName -q '.baseRefName') 2>/dev/null || git checkout main
git pull origin $(git branch --show-current)
git fetch --prune
git log --oneline -5
```

### Step 6: Report

```
## Merge Complete

- PR: #<number> — <title>
- Strategy: <squash|merge|rebase>
- Merged into: <base-branch>
- Remote branch: deleted
- Local branch: switched to <base-branch>
- Status: SUCCESS
```

### Safety Rules

- NEVER force-merge a PR with failing tests (`bundle exec rails test`)
- NEVER merge without user confirmation on strategy
- ALWAYS use --delete-branch to clean up after merge
- If anything unexpected happens, stop and report the error
