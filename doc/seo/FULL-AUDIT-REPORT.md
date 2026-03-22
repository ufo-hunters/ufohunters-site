# SEO Audit Report — ufo-hunters.com (localhost:3000)

**Date**: 2026-03-22
**Auditor**: Claude Code SEO Audit
**Pages analyzed**: Homepage, /articles, /sightings/about, /sightings/maps, /reports/new, sighting detail pages
**Production URL**: https://www.ufo-hunters.com

---

## Overall SEO Health Score: 32/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 35/100 | 25% | 8.75 |
| Content Quality | 45/100 | 25% | 11.25 |
| On-Page SEO | 30/100 | 20% | 6.00 |
| Schema / Structured Data | 25/100 | 10% | 2.50 |
| Performance | 30/100 | 10% | 3.00 |
| Images | 20/100 | 5% | 1.00 |
| AI Search Readiness | 5/100 | 5% | 0.25 |
| **TOTAL** | | | **32.75** |

---

## Executive Summary

### Top 5 Critical Issues

1. **Multiple pages return 500 errors** — /sightings/maps, /sightings/images, /reports/new, and sighting detail pages all crash (HTTP 500). These are core pages of the site.
2. **No canonical tags** — None of the working pages have `<link rel="canonical">`. With 204K+ sightings and URL-based content, duplicate content risk is extreme.
3. **No Open Graph tags** — Zero OG tags on any page. Social sharing generates blank previews on Facebook, Twitter, LinkedIn.
4. **No JSON-LD structured data** — Only legacy microdata (itemprop) present. No modern JSON-LD for Article, Event, or WebSite schemas.
5. **Homepage is 183KB of HTML** — Extremely bloated. The page renders ~80+ sighting cards inline, causing slow load times (1.8s server response).

### Top 5 Quick Wins

1. Add `<link rel="canonical">` to all pages (layout-level fix, 1 line)
2. Add Open Graph meta tags to the layout (5 lines of ERB)
3. Add JSON-LD WebSite schema to the homepage layout
4. Fix the 500 errors on /sightings/maps and detail pages (blocking core functionality)
5. Add `<meta name="robots" content="index, follow">` to layout

---

## 1. Technical SEO (35/100)

### Crawlability

| Check | Status | Details |
|-------|--------|---------|
| robots.txt | PASS | Present, blocks /sessions/* and /users/* correctly |
| Sitemap | WARN | References https://www.ufo-hunters.com/sitemap1-4.xml, last modified 2020. Stale by 6 years |
| HTTP status codes | FAIL | 3 of 6 tested pages return 500 errors |
| Response time | WARN | 1.82s for homepage (target: <500ms) |
| Redirect chains | PASS | No redirect loops detected |

### Indexability

| Check | Status | Details |
|-------|--------|---------|
| Canonical tags | FAIL | Missing on ALL pages |
| Meta robots | WARN | No explicit robots meta tag (defaults to index,follow but explicit is better) |
| Pagination (rel=prev/next) | FAIL | Missing — homepage lists 80+ sightings with no pagination signals |
| Hreflang | N/A | Single-language site (en) |
| lang attribute | PASS | `lang="en"` present on html tag |

### Security Headers

| Header | Status | Value |
|--------|--------|-------|
| X-Frame-Options | PASS | SAMEORIGIN |
| X-Content-Type-Options | PASS | nosniff |
| X-XSS-Protection | WARN | Set to 0 (disabled). Modern browsers use CSP instead |
| Referrer-Policy | PASS | strict-origin-when-cross-origin |
| Content-Security-Policy | FAIL | Missing entirely |
| Strict-Transport-Security (HSTS) | FAIL | Missing (critical for production) |
| X-Permitted-Cross-Domain-Policies | PASS | none |

### URL Structure

| Check | Status | Details |
|-------|--------|---------|
| Clean URLs | WARN | Sighting URLs contain MongoDB ObjectIDs (`/sightings/search/6416613bef13f10007f1573e/...`). Not SEO-friendly |
| URL length | WARN | Sighting URLs are very long (100+ chars with full title) |
| URL encoding | WARN | Titles in URLs contain spaces encoded as %20 — hyphens preferred |

---

## 2. Content Quality (45/100)

### E-E-A-T Assessment

| Signal | Status | Details |
|--------|--------|---------|
| Author attribution | WARN | No visible author info on sighting reports |
| About page | PASS | /sightings/about exists with site description |
| Contact info | PASS | Email visible in footer (ufohunterscom@gmail.com) |
| Date freshness | WARN | Latest content is from March 2023 — 3 years stale |
| Trust signals | WARN | No HTTPS enforcement visible, no privacy policy page (only in footer text) |
| Content depth | PASS | 204K+ sightings with location, date, descriptions |

### Thin Content Risk

- **Homepage**: 183KB HTML but content is a repetitive list of sighting cards with minimal unique text per card
- **Sighting cards**: Each card has ~1-2 sentences. Individual pages would have more, but they return 500 errors
- **Articles page**: Working, appears to have longer-form content

### Duplicate Content Risk: HIGH

- No canonical tags means search engines must guess the canonical version
- Sighting URLs contain full titles — any title variation creates duplicate URLs
- No pagination rel=prev/next means crawlers may see the homepage as infinite duplicate content

---

## 3. On-Page SEO (30/100)

### Homepage

| Element | Status | Value |
|---------|--------|-------|
| Title tag | PASS | "Recent UFO Activity - UFO Hunters" (41 chars) |
| Meta description | PASS | "Latest UFO Sightings all over the world" (40 chars — too short, target 150-160) |
| Meta keywords | PASS | Present with relevant terms |
| H1 | WARN | H1 is a logo image, not text. Search engines may not read it |
| H2 | PASS | "204565 sightings reported...and growing" |
| H3 | PASS | Multiple relevant headings |
| Internal linking | PASS | Good internal link structure to sightings |
| Heading hierarchy | WARN | Jumps from H1 (logo) to H2 to H3 to H4, skipping semantic flow |

### Articles Page

| Element | Status | Value |
|---------|--------|-------|
| Title tag | PASS | "Articles - UFO Hunters" |
| Meta description | WARN | "Latest Articles" — only 15 chars, far too short |
| H1 | WARN | Same logo-in-H1 pattern |

### About Page

| Element | Status | Value |
|---------|--------|-------|
| Title tag | PASS | "About - UFO Hunters" |
| Meta description | PASS | "About ufo-hunters.com and who is behind this site" |
| H1 | WARN | Same logo-in-H1 pattern |

### Missing Open Graph Tags (ALL pages)

None of the pages have:
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`

Twitter cards are partially present (card, site, title, description) but missing `twitter:image`.

---

## 4. Schema / Structured Data (25/100)

### Current Implementation

- **Microdata (itemprop)**: Heavily used — 448 itemprop attributes on homepage
  - `itemListOrder`, `datePublished`, `headline` on sighting cards
  - `uploadDate`, `thumbnailUrl`, `description` on video entries
  - `name`, `url` on site branding
- **JSON-LD**: None
- **Schema types detected**: Implicit ItemList, VideoObject fragments

### Issues

| Issue | Severity |
|-------|----------|
| No JSON-LD at all — microdata is harder for search engines to parse | High |
| No WebSite schema (enables sitelinks search box) | High |
| No Organization schema (brand knowledge panel) | High |
| No Article schema on articles page | Medium |
| No Event/Report schema on sighting entries | Medium |
| Microdata fragments are incomplete (no itemscope/itemtype wrappers visible) | High |
| Video entries use itemprop but may lack full VideoObject markup | Medium |

### Recommendations

Add JSON-LD blocks to the layout for:
1. `WebSite` with `SearchAction` (sitelinks search)
2. `Organization` (brand panel)
3. `ItemList` on homepage (sighting list)
4. `Article` on articles pages
5. `VideoObject` on video entries

---

## 5. Performance (30/100)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Server response (TTFB) | 1,825ms | <500ms | FAIL |
| HTML size | 183KB | <50KB | FAIL |
| JS files | 2 + inline | — | PASS |
| CSS files | 1 + external (MapLibre, Google Fonts) | — | PASS |
| Script tags | 14 | — | WARN |
| Cache-Control | max-age=0, private | Should use public caching | WARN |
| ETag | Present | — | PASS |
| Server-Timing | Present (detailed) | — | PASS |

### Key Issues

- **1.8s TTFB**: The `cache_generate.active_support` takes 1,625ms — the page is likely rendering 80+ sighting cards from MongoDB on every request
- **183KB HTML**: Way too large. Paginate to 20 sightings max and lazy-load more
- **External resources**: MapLibre GL CSS loaded from unpkg CDN, Google Fonts loaded externally — both block rendering
- **No gzip/brotli compression visible** in headers

---

## 6. Images (20/100)

| Metric | Value | Status |
|--------|-------|--------|
| Total images | 10 | — |
| With alt text | 7 (70%) | WARN |
| Missing alt text | 3 (30%) | FAIL |
| Lazy loading | Not detected | FAIL |
| WebP/AVIF formats | Not detected (PNG/JPG) | WARN |
| Responsive (srcset) | Not detected | FAIL |

### Issues

- 3 images missing alt text (accessibility + SEO penalty)
- No lazy loading — all images loaded upfront including below-fold
- No modern image formats (WebP/AVIF)
- No responsive images (srcset/sizes) for mobile optimization
- Cloudinary is available but not leveraged for automatic format/size optimization

---

## 7. AI Search Readiness (5/100)

| Check | Status | Details |
|-------|--------|---------|
| llms.txt | FAIL | 404 — file doesn't exist |
| JSON-LD structured data | FAIL | None present |
| Passage-level citability | WARN | Sighting entries have clear location + date structure but are too short for citation |
| Content uniqueness | PASS | User-generated sighting reports are highly unique |
| AI crawler access | UNKNOWN | robots.txt doesn't block AI crawlers (GPTBot, ClaudeBot) — good by default |
| Brand mention signals | WARN | "UFO Hunters" brand appears but no Organization schema to reinforce |

### Recommendations

1. Create `/llms.txt` explaining the site's purpose and data structure
2. Add JSON-LD schemas (WebSite, Organization, ItemList)
3. Ensure sighting detail pages have substantial content (currently 500 errors)
4. Add author/source attribution to sighting reports

---

## Robots.txt Analysis

```
User-Agent: *
Disallow: /articles/myspace
Disallow: /sessions/*
Disallow: /users/*

Sitemap: https://www.ufo-hunters.com/sitemap.xml
```

**Assessment**: Mostly good. Blocks login/user pages. However:
- `/articles/myspace` is an oddly specific block — verify this is intentional
- Sitemap URL points to production (expected for local dev)
- No specific rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- Consider adding `Crawl-delay` for aggressive bots

---

## Sitemap Analysis

The sitemap index references 4 sub-sitemaps, all with `lastmod` from 2020:
- sitemap1.xml (2020-09-16)
- sitemap2.xml (2020-06-30)
- sitemap3.xml (2020-06-30)
- sitemap4.xml (2020-06-30)

**Issues**:
- **6 years stale** — sitemaps should be regenerated dynamically
- Content from 2020-2023 is missing from sitemaps entirely
- Should be auto-generated from MongoDB data, not static files

---

## Pages with 500 Errors

These pages crash and are completely inaccessible:

| Page | Expected Content |
|------|-----------------|
| /sightings/maps | Interactive map with 204K+ sightings — flagship feature |
| /sightings/images | Image gallery of sighting evidence |
| /reports/new | New sighting submission form — core UGC funnel |
| /sightings/search/:id/:title | Individual sighting pages — the most important SEO pages |

**Impact**: These 500 errors mean that the vast majority of the site's indexable content is completely broken. This is the #1 priority to fix before any SEO optimization matters.

---

## Summary by Priority

### Critical (fix immediately)
1. Fix 500 errors on /sightings/maps, /sightings/images, /reports/new, and sighting detail pages
2. Add canonical tags to all pages (layout-level)
3. Add Open Graph tags to layout
4. Reduce homepage HTML from 183KB (paginate sightings)

### High (fix within 1 week)
5. Add JSON-LD WebSite + Organization schemas
6. Regenerate sitemaps dynamically from MongoDB
7. Fix meta descriptions (too short on articles page)
8. Add Content-Security-Policy header
9. Add HSTS header for production
10. Fix H1 tag — should be text, not a logo image

### Medium (fix within 1 month)
11. Add JSON-LD Article schema to articles
12. Add JSON-LD ItemList schema to sighting listings
13. Implement lazy loading for images
14. Use Cloudinary transformations for WebP/AVIF
15. Add responsive images (srcset/sizes)
16. Create /llms.txt for AI search visibility
17. Improve URL structure (slugs instead of ObjectIDs)
18. Add pagination with rel=prev/next
19. Add missing alt text to images

### Low (backlog)
20. Add Crawl-delay to robots.txt
21. Self-host Google Fonts
22. Self-host MapLibre CSS
23. Add Organization schema for Google Knowledge Panel
24. Add VideoObject JSON-LD for video entries
