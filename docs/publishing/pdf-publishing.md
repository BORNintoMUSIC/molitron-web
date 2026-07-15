# Public PDF Publishing

This guide defines the boundary between controlled technical-document work and website publication. It does not replace the per-document review and approval workflow.

## Boundary

- Author and revise a technical document in its controlled source project under `docs/PDF_Rebuild/` when that project is present.
- Treat archived pre-controlled drafts as historical records, not source authority.
- Publish only an explicitly approved website copy to `public/docs/`.
- Never publish private certification records, build caches, QA renders, logs, or review reports.
- A file appearing in a local `output/` directory is not publication approval.

## Current Public Set

| Public PDF | Classification | HTML companion/context | Indexing |
|---|---|---|---|
| `/docs/moas-brochure-2026.pdf` | Active MOAS brochure, Rev B | `/products/moas` | Normal |
| `/docs/moas-engineering-specs-installation-2026.pdf` | Active MOAS planning guide, Rev A | `/products/moas/installation-planning` | Normal |
| `/docs/epfa-brochure-2026.pdf` | Active EPFA brochure, Rev A | `/products/epfa` | Normal |
| `/docs/epfa-operation-maintenance-manual-2026.pdf` | Active EPFA IOM manual, Rev A | `/products/epfa/operation-maintenance` | Normal |
| `/docs/enviro-clean-air-scrubber-brochure-2026.pdf` | Discontinued product/service reference | `/service-parts` | `noindex` header |
| `/docs/enviro-clean-air-scrubber-legacy-technical-reference-2026.pdf` | Discontinued product/service reference | `/service-parts` | `noindex` header |

The HTML companion or context page must retain meaningful visible content; a PDF alone is not the site's product or documentation experience.

## Replace an Approved Revision

1. Confirm document identity, revision, approval, publication authorization, and the approved output checksum or equivalent handoff evidence.
2. Compare the approved output with the intended stable public filename. Keep the stable URL unless a deliberate migration is approved.
3. Replace only the matching file in `public/docs/`; do not copy the surrounding source project or QA artifacts.
4. Update visible HTML, the claims register, document metadata, redirects, or indexing headers when the approved content changes what the site states.
5. Run `npm.cmd run check` and review `git diff` plus the published file list. The Vercel preview repeats validation across the full public set and performs the production build.
6. Use the current branch and review workflow for release.

## Add a New Public Document

Before adding a PDF, approve its public purpose, filename, revision identity, claims, HTML companion/context, indexing behavior, legacy redirects, and long-term owner. Use a lowercase kebab-case filename under `public/docs/`, add a visible site reference, then run the fast check and review the Vercel full-check preview.

The site intentionally has no wrapper that auto-publishes every local output and no generated manifest that turns working files into public assets. Publication remains an explicit reviewed copy so controlled sources and website releases cannot be confused.

Use ordinary configured Git credentials for branch work. Do not run `gh auth login` or `gh auth refresh` as a publishing prerequisite, and never store validation output or credentials in the repository.
