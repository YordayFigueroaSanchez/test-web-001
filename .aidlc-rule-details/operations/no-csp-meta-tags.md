# Rule: Prohibit CSP Meta Tags In HTML

## Purpose
Enforce header-based Content Security Policy in operations and prevent CSP regressions in generated HTML.

## Policy
- NEVER add `<meta http-equiv="Content-Security-Policy">` to source HTML files.
- CSP MUST be defined in infrastructure headers (proxy/CDN/web server).
- `frame-ancestors` and `report-to` directives MUST be configured in response headers, not meta tags.

## Required Checks
- CI MUST fail if CSP meta tags are found under `src/**/*.html`.
- CI MUST fail if deployed artifact HTML contains CSP meta tags.

## Implementation Guidance
- Keep HTML free of CSP meta tags.
- If inline scripts are needed, move them to external files served from same origin when feasible.
- For GitHub Pages, keep header policy materialized in deployment artifacts and apply at an upstream proxy/CDN that supports response headers.
