#!/bin/bash
# Structure validation pre-commit hook for ufohunters-site
# Rails 8 / MongoDB / Minitest — validates project structure integrity before commit

set -euo pipefail

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Validating project structure...${NC}"

ERRORS=0
WARNINGS=0

# 1. Check for committed secrets and sensitive files
STAGED_FILES=$(git diff --cached --name-only)

SECRET_PATTERNS="^\.env$ ^\.env\.local$ ^\.env\.production$ credentials\.json config/credentials\.yml\.enc"

for pattern in $SECRET_PATTERNS; do
    if echo "$STAGED_FILES" | grep -qE "$pattern"; then
        echo -e "${RED}BLOCKED: Attempting to commit sensitive file matching: $pattern${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# Rails master.key — never commit this
if echo "$STAGED_FILES" | grep -q "config/master.key"; then
    echo -e "${RED}BLOCKED: config/master.key must never be committed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# 2. Gemfile / Gemfile.lock consistency
if echo "$STAGED_FILES" | grep -q "^Gemfile$" && ! echo "$STAGED_FILES" | grep -q "^Gemfile.lock$"; then
    echo -e "${YELLOW}WARNING: Gemfile changed but Gemfile.lock not staged. Run 'bundle install' and stage the lockfile.${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# 3. Check for large files (>5MB) — Cloudinary handles images; binaries should not be in git
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        SIZE=$(wc -c < "$file" 2>/dev/null || echo 0)
        if [ "$SIZE" -gt 5242880 ]; then
            echo -e "${RED}BLOCKED: File too large (>5MB): $file${NC}"
            echo -e "  Use Cloudinary (via CarrierWave) for image uploads, not git.${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# 4. Check for merge conflict markers
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        if grep -lP "^(<{7}|={7}|>{7})(\s|$)" "$file" 2>/dev/null | grep -q .; then
            echo -e "${RED}BLOCKED: Merge conflict markers found in: $file${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# 5. Check for debug statements (Ruby + JS)
# binding.pry, byebug — Ruby debuggers (not in Gemfile but could be added ad-hoc)
# raise / pp are sometimes used for debug; skip those as they are too common
# console.log — JS debug statements
DEBUG_PATTERNS="binding\.pry|byebug|debugger;|console\.log"
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        MATCHES=$(grep -nE "$DEBUG_PATTERNS" "$file" 2>/dev/null || true)
        if [ -n "$MATCHES" ]; then
            echo -e "${YELLOW}WARNING: Debug statement found in: $file${NC}"
            echo "$MATCHES" | while read -r line; do echo "  $line"; done
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
done

# 6. Rails-specific: check that new model files in app/models/ declare at least one field (Mongoid)
# Mongoid models should include Mongoid::Document — warn if a new model file is missing it
for file in $STAGED_FILES; do
    if echo "$file" | grep -qE "^app/models/[^/]+\.rb$"; then
        if [ -f "$file" ] && ! grep -q "include Mongoid::Document" "$file" 2>/dev/null; then
            # Skip files like app/models/ckeditor/ submodels — check direct models only
            echo -e "${YELLOW}WARNING: $file does not include Mongoid::Document. Is this intentional?${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
done

# 7. Check that config/mongoid.yml is not accidentally removed
if echo "$STAGED_FILES" | grep -q "config/mongoid.yml" && ! [ -f "config/mongoid.yml" ]; then
    echo -e "${RED}BLOCKED: config/mongoid.yml is being deleted. This will break the database connection.${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Summary
echo ""
if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}Structure validation FAILED: $ERRORS error(s), $WARNINGS warning(s)${NC}"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}Structure validation passed with $WARNINGS warning(s)${NC}"
else
    echo -e "${GREEN}Structure validation passed${NC}"
fi

exit 0
