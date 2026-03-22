#!/bin/bash
# Pre-push review reminder for ufohunters-site
# Reminds developers to run /review2 before pushing feature branches

set -euo pipefail

BLUE='\033[0;34m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# Get the current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Skip reminder on main/master/develop — pushes to these branches go through their own review gates
if [[ "$BRANCH" == "main" || "$BRANCH" == "master" || "$BRANCH" == "develop" ]]; then
    exit 0
fi

# Count commits ahead of main
COMMITS_AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || git rev-list --count origin/master..HEAD 2>/dev/null || echo "0")

if [ "$COMMITS_AHEAD" -gt 0 ]; then
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}Pre-push Reminder — ufohunters-site${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e ""
    echo -e "  Branch:         ${GREEN}$BRANCH${NC}"
    echo -e "  Commits ahead:  ${GREEN}$COMMITS_AHEAD${NC}"
    echo -e ""
    echo -e "  Before creating a PR, consider running:"
    echo -e "  ${GREEN}/review2${NC} — Independent AI code review"
    echo -e "  ${GREEN}/review${NC}  — Detailed code review with inline comments"
    echo -e ""
    echo -e "  For Rails-specific checks:"
    echo -e "  ${GREEN}rails test${NC}              — Run Minitest suite"
    echo -e "  ${GREEN}rails assets:precompile${NC} — Verify asset pipeline (Propshaft)"
    echo -e "  ${GREEN}rails tailwindcss:build${NC} — Verify Tailwind CSS compilation"
    echo -e ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
fi

exit 0
