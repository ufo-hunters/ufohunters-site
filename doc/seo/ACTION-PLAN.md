# SEO Action Plan — ufo-hunters.com

**Date**: 2026-03-22
**Current Score**: 32/100
**Target Score**: 70/100

---

## Critical — Fix Immediately

### 1. Fix 500 errors on core pages
**Pages**: /sightings/maps, /sightings/images, /reports/new, /sightings/search/:id/:title
**Impact**: These are the site's most important pages. Without them, 99% of content is unindexable.
**Action**: Debug Rails errors (likely missing env vars, API keys, or Mongoid query issues in local dev)
**Files**: `app/controllers/stats_controller.rb`, `app/controllers/sightings_controller.rb`, `app/controllers/reports_controller.rb`

### 2. Add canonical tags
**Impact**: Prevents duplicate content across 204K+ sighting pages
**Action**: Add to `app/views/layouts/application.html.erb`:
```erb
<link rel="canonical" href="<%= request.original_url.split('?').first %>" />
```

### 3. Add Open Graph tags
**Impact**: Social sharing generates blank previews currently
**Action**: Add to layout `<head>`:
```erb
<meta property="og:title" content="<%= yield(:title) || 'UFO Hunters' %>" />
<meta property="og:description" content="<%= yield(:meta_description) || 'Latest UFO Sightings all over the world' %>" />
<meta property="og:image" content="<%= yield(:og_image) || asset_url('ufo-hunters-logo.png') %>" />
<meta property="og:url" content="<%= request.original_url %>" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="UFO Hunters" />
```

### 4. Paginate homepage sightings
**Impact**: 183KB HTML, 1.8s TTFB — kills Core Web Vitals
**Action**: Limit homepage to 20 sightings with pagination (use `kaminari` or `pagy` gem with Mongoid)

---

## High — Fix Within 1 Week

### 5. Add JSON-LD WebSite schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "UFO Hunters",
  "url": "https://www.ufo-hunters.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.ufo-hunters.com/sightings/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 6. Add JSON-LD Organization schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UFO Hunters",
  "url": "https://www.ufo-hunters.com",
  "logo": "https://www.ufo-hunters.com/assets/ufo-hunters-logo.png",
  "sameAs": [
    "https://twitter.com/UfoHuntersCom",
    "https://www.facebook.com/UfoHuntersCom"
  ]
}
```

### 7. Regenerate sitemaps dynamically
**Action**: Use `sitemap_generator` gem to auto-build from MongoDB data
**Why**: Current sitemaps are from 2020, missing 3 years of content

### 8. Fix meta descriptions
- Articles page: "Latest Articles" (15 chars) → expand to 150+ chars
- Sighting detail pages: use sighting description as meta description

### 9. Fix H1 tags
- Current: logo image in H1 on every page
- Fix: Move logo to a `<div>`, add text H1 per page (`<h1>Recent UFO Activity</h1>`, etc.)

### 10. Add security headers (production)
```ruby
# config/application.rb or middleware
config.action_dispatch.default_headers.merge!(
  'Content-Security-Policy' => "default-src 'self'; ...",
  'Strict-Transport-Security' => 'max-age=31536000; includeSubDomains'
)
```

---

## Medium — Fix Within 1 Month

### 11. JSON-LD for sighting detail pages
```json
{
  "@context": "https://schema.org",
  "@type": "Report",
  "headline": "UFO Sighting in ...",
  "datePublished": "2023-03-18",
  "description": "...",
  "spatialCoverage": {
    "@type": "Place",
    "name": "Taunton, MA",
    "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." }
  }
}
```

### 12. Implement lazy loading
```erb
<img loading="lazy" src="..." alt="..." />
```

### 13. Cloudinary WebP/AVIF
Use Cloudinary auto-format: `cl_image_tag("image.jpg", format: :auto, quality: :auto)`

### 14. Create /llms.txt
```
# UFO Hunters
> A community-driven platform for reporting and browsing UFO sightings worldwide.

## About
UFO Hunters (ufo-hunters.com) aggregates over 204,000 UFO sighting reports from around the world.

## Content
- Sighting reports with location, date, description, and sometimes photos/videos
- Articles about UFO research and analysis
- Interactive global sighting map
- Statistical data and trends

## Contact
ufohunterscom@gmail.com
```

### 15. Improve URL structure
Current: `/sightings/search/6416613bef13f10007f1573e/UFO%20Sighting%20in%20Taunton...`
Better: `/sightings/taunton-ma-2023-03-18` (slug-based)

### 16. Add pagination links
```erb
<link rel="prev" href="<%= url_for(page: @page - 1) %>" />
<link rel="next" href="<%= url_for(page: @page + 1) %>" />
```

### 17. Fix missing alt text
Audit all `<img>` tags and add descriptive alt text

---

## Estimated Impact

| Action | Current Score Impact | Effort |
|--------|---------------------|--------|
| Fix 500 errors | +15 points | M (3-5 days) |
| Canonical + OG + meta | +12 points | XS (hours) |
| JSON-LD schemas | +8 points | S (1-2 days) |
| Pagination + perf | +8 points | S (1-2 days) |
| Sitemap regeneration | +5 points | S (1 day) |
| Images + lazy loading | +3 points | XS (hours) |
| llms.txt + AI readiness | +2 points | XS (hours) |
| **Total projected** | **+53 points → 85/100** | |
