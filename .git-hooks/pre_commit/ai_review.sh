#!/bin/bash
# AI-powered pre-commit review for ufohunters-site
# Framework: Rails 8.0.2 | Language: Ruby 3.2.8 | DB: MongoDB (Mongoid 9)

set -euo pipefail

# Configuration
FILE_EXTENSIONS="rb|erb|js|css"
MAX_DIFF_LINES=500
SEVERITY_THRESHOLD="HIGH"  # HIGH = block, MEDIUM = warn, LOW = info

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Running AI pre-commit review...${NC}"

# 1. Get staged files filtered by extension
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E "\.(${FILE_EXTENSIONS})$" || true)

if [ -z "$STAGED_FILES" ]; then
    echo -e "${GREEN}No relevant files staged for AI review${NC}"
    exit 0
fi

echo -e "${BLUE}Files to review:${NC}"
echo "$STAGED_FILES" | while read -r file; do echo "  - $file"; done

# 2. AI Review (if claude CLI available)
if command -v claude &> /dev/null; then
    echo -e "\n${BLUE}Running AI review...${NC}"

    DIFF=$(git diff --cached --diff-filter=ACM)

    if [ ${#DIFF} -gt 0 ] && [ $(echo "$DIFF" | wc -l) -le $MAX_DIFF_LINES ]; then
        REVIEW=$(echo "$DIFF" | claude -p "You are a code reviewer for a Rails 8 application (ufohunters-site). The app uses:
- Ruby 3.2.8 / Rails 8.0.2 (MVC monolith)
- MongoDB with Mongoid 9 ODM (NOT ActiveRecord — no SQL migrations, schema defined via field declarations in models)
- Minitest for testing
- Hotwire (Turbo + Stimulus) for frontend interactivity
- Custom session-based authentication (no Devise)
- Cloudinary for image storage, CarrierWave for uploads
- reCAPTCHA for form protection
- Geospatial data with 2dsphere indexes on Report model

Review this diff for:
1. Bugs or logic errors
2. Security vulnerabilities (XSS, CSRF, mass assignment, insecure direct object reference, credential exposure)
3. Performance issues (N+1 queries in Mongoid, missing indexes, large payloads)
4. Rails/Mongoid anti-patterns (e.g. using ActiveRecord patterns that do not apply to Mongoid, bypassing strong parameters, storing credentials in code)
5. Mongoid-specific issues (missing field declarations, incorrect query syntax, unindexed geospatial fields)

For each issue found, classify as HIGH/MEDIUM/LOW severity.
If no significant issues, respond with 'LGTM'.
Be concise. Focus on the changes only." 2>/dev/null || echo "AI review unavailable")

        if echo "$REVIEW" | grep -q "HIGH"; then
            echo -e "${RED}AI Review found HIGH severity issues:${NC}"
            echo "$REVIEW"
            echo -e "\n${YELLOW}Commit blocked. Fix HIGH issues or use --no-verify to skip.${NC}"
            exit 1
        elif echo "$REVIEW" | grep -q "MEDIUM"; then
            echo -e "${YELLOW}AI Review found MEDIUM severity issues:${NC}"
            echo "$REVIEW"
            echo -e "${YELLOW}Proceeding with commit. Consider fixing these.${NC}"
        else
            echo -e "${GREEN}AI Review: LGTM${NC}"
        fi
    else
        echo -e "${YELLOW}Diff too large for AI review (${MAX_DIFF_LINES} line limit). Skipping.${NC}"
    fi
else
    echo -e "${YELLOW}Claude CLI not found, skipping AI review${NC}"
fi

echo -e "\n${GREEN}AI review step complete${NC}"
exit 0
