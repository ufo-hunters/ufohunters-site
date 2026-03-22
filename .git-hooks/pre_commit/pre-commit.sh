#!/bin/bash
# Pre-commit hook entry point for ufohunters-site
set -euo pipefail

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"

# Run structure validation first (fast, blocks on secrets/large files/conflicts)
if [ -f "$HOOKS_DIR/pre_commit/structure_validation.sh" ]; then
    bash "$HOOKS_DIR/pre_commit/structure_validation.sh"
fi

# Run AI review (may be slower, requires claude CLI)
if [ -f "$HOOKS_DIR/pre_commit/ai_review.sh" ]; then
    bash "$HOOKS_DIR/pre_commit/ai_review.sh"
fi
