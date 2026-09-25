# MOAS operation and maintenance manual publication

On September 25, 2026, the owner explicitly requested uploading the completed 2026 operation and maintenance PDF to the MOAS product page and replacing the previous manual.

- Source: `MOAS-Operation-and-Maintenance-2026.pdf`, 30 pages, September 2026, Review 01, owner review edition.
- Exact size: 2,048,050 bytes.
- SHA-256: `24338a3d301e2d58651054d2ec9e2c30370bd7d88b390743698a3fed01202d30`.
- Public URL: `/docs/moas-operation-maintenance-manual-2026.pdf`.
- Visible context: `/products/moas#documents` and the shared `/resources` document list.
- The current Vercel page and assigned branch had only the brochure and planning guide, with no existing MOAS manual download or redirect. This adds the manual entry and preserves both distinct documents.
- Only the exact PDF is copied to public assets. Editable sources, certification records, meeting notes, and QA artifacts remain outside the public set.

The download description identifies the owner review edition. The PDF retains all seven final-page review items. Publication authorization is not technical resolution of those items. The product-page water specification is clarified to 80 PSI maximum to match the owner's confirmed manual decision.

## Release boundary

Read-only Vercel domain inspection on September 25 confirmed only `molitron-web.vercel.app`, valid and assigned to `codex/homepage-visual-prototype`. Follow the existing V3/V4 publication workflow: scoped PR into that assigned branch, successful full-check preview, review, then merge. Do not promote the broader redesign to `main` or change project/domain settings.

Do not change `molitron.com`, `www.molitron.com`, their existing public site, DNS, hosting, redirects, certificates, or domain assignments. The public-site freeze remains in force until the owner explicitly authorizes that specific transition.
