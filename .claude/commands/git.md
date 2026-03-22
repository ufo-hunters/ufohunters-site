---
name: git
description: "Unified git and PR workflow helper with branch naming and commit conventions for ufohunters-site."
allowed-tools: Read, Grep, Glob, Bash
argument-hint: "<action>"
---
# /git — Unified Git & PR Workflow

A single command for all common git operations with convention enforcement for ufohunters-site.

## Usage

Invoke with a sub-command:
- `/git status` — Overview of current state
- `/git branch <name>` — Create a properly named branch
- `/git commit` — Create a well-formatted commit
- `/git push` — Push with safety checks
- `/git pr` — Create or update a pull request

If invoked without a sub-command, default to `/git status`.

---

## Sub-Command: status

```bash
echo "=== Branch ==="
git branch --show-current
git log --oneline -1

echo "=== Status ==="
git status --short

echo "=== Ahead/Behind ==="
git rev-list --left-right --count HEAD...@{upstream} 2>/dev/null || echo "No upstream set"

echo "=== Recent Commits ==="
git log --oneline -10

echo "=== Stash ==="
git stash list

echo "=== Branches ==="
git branch -vv
```

Output:
```
Branch: <current branch>
Upstream: <tracking branch or "none">
Ahead: N commits / Behind: M commits
Modified: X files / Staged: Y files / Untracked: Z files
Last commit: <hash> <message> (<time ago>)
Stashes: N
```

---

## Sub-Command: branch <name>

Branch names MUST follow: `<type>/<short-kebab-case-description>`

Valid types:
- `feat/` — New features
- `fix/` — Bug fixes
- `refactor/` — Code restructuring
- `docs/` — Documentation
- `chore/` — Maintenance, tooling, CI

If the provided name does not match the pattern:
1. Report the violation
2. Suggest a corrected name
3. Ask for confirmation before creating

```bash
git checkout -b <validated-branch-name>
```

---

## Sub-Command: commit

### Step 1: Check for Staged Changes

```bash
git diff --cached --stat
```

### Step 2: Determine Commit Type

| Type       | When to use                                             |
|------------|---------------------------------------------------------|
| `feat`     | New functionality visible to users                      |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs`     | Documentation only                                      |
| `test`     | Adding or updating Minitest tests                       |
| `chore`    | Build, CI, dependencies, Gemfile updates                |
| `perf`     | Performance improvement                                 |
| `style`    | Formatting, whitespace (no logic change)                |
| `ci`       | CI configuration changes (GitHub Actions, Travis)       |

### Step 3: Format Commit Message

```
type(scope): short description (imperative mood, <72 chars)

Optional body: explain the "why" not the "what".

Refs: #issue (if applicable)
```

**Scopes for ufohunters-site**: `reports`, `sightings`, `articles`, `users`, `sessions`, `stats`, `map`, `auth`, `assets`, `ci`, `mongoid`

### Step 4: Pre-Commit Checks

Before creating the commit, verify:

```bash
# No debug artifacts
grep -rn "binding.pry\|debugger\|puts\b" app/ --include="*.rb" | grep -v "^\s*#"

# No accidental SQL migration files
ls db/migrate/*.rb 2>/dev/null && echo "WARNING: SQL migration found" || true
```

### Step 5: Execute Commit

```bash
git commit -m "<formatted message>"
```

---

## Sub-Command: push

### Pre-Push Checks

1. Confirm current branch is NOT `main` or `master`
2. Check if upstream is set
3. Run tests before pushing (recommended):

```bash
bundle exec rails test
```

### Execution

```bash
# If no upstream, set it
git push -u origin $(git branch --show-current)

# If upstream exists
git push
```

---

## Sub-Command: pr

### Create New PR

```bash
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
- <bullet points from commit messages>

## Changes
- <list of changed files grouped by purpose>

## Testing
- [ ] All tests pass (`bundle exec rails test`)
- [ ] No debug artifacts (`binding.pry`, `puts`)
- [ ] No SQL migration files introduced (Mongoid project)
- [ ] Mongoid teardown present in test files (`delete_all`)
- [ ] No ActiveRecord patterns
EOF
)"
```

---

## Error Handling

- If `gh` CLI is not available, skip PR-related operations and inform the user
- If not in a git repository, report and stop
- All destructive operations require explicit confirmation
- NEVER force-push to `main` or `master`
