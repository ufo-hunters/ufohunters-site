#!/bin/bash
# Setup git hooks for ufohunters-site
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Setting up git hooks for ufohunters-site..."

# Configure git to use .git-hooks directory
git config core.hooksPath .git-hooks
echo "  git config core.hooksPath = .git-hooks"

# Create symlinks for hook entry points (fall back to copy if symlinks unsupported)
ln -sf pre_commit/pre-commit.sh "$SCRIPT_DIR/pre-commit" 2>/dev/null || cp "$SCRIPT_DIR/pre_commit/pre-commit.sh" "$SCRIPT_DIR/pre-commit"
ln -sf pre_push/pre-push.sh "$SCRIPT_DIR/pre-push" 2>/dev/null || cp "$SCRIPT_DIR/pre_push/pre-push.sh" "$SCRIPT_DIR/pre-push"

# Make all scripts executable
find "$SCRIPT_DIR" -name "*.sh" -exec chmod +x {} \;
chmod +x "$SCRIPT_DIR/pre-commit" 2>/dev/null || true
chmod +x "$SCRIPT_DIR/pre-push" 2>/dev/null || true

echo ""
echo "Git hooks configured successfully."
echo ""
echo "Hooks installed:"
ls -la "$SCRIPT_DIR/pre-commit" "$SCRIPT_DIR/pre-push" 2>/dev/null
echo ""
echo "Active hooks:"
echo "  pre-commit:"
echo "    1. structure_validation.sh — secrets, Gemfile.lock, large files, conflict markers, debug statements"
echo "    2. ai_review.sh            — AI code review (requires claude CLI)"
echo "  pre-push:"
echo "    1. review2_reminder.sh     — reminds to run /review2 on feature branches"
echo ""
echo "To disable hooks temporarily: git commit --no-verify / git push --no-verify"
echo "To uninstall: git config --unset core.hooksPath"
