#!/bin/bash
# Pre-push hook entry point for ufohunters-site
set -euo pipefail

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -f "$HOOKS_DIR/pre_push/review2_reminder.sh" ]; then
    bash "$HOOKS_DIR/pre_push/review2_reminder.sh"
fi
