# Molitron Site Polish and Redesign Plan

**Status:** Approved for implementation
**Created:** July 12, 2026
**Working branch:** `feature/site-polish-audit`
**Target branch:** `develop`
**Repository:** `D:\Development\Projects\molitron-web`

## Purpose

This document is the durable handoff for the Molitron website review and redesign. It is intentionally self-contained so a future Codex session can resume the work without relying on conversation history.

The project goal is to make the Molitron website distinctive, modern, professional, technically credible, accessible, fast, SEO-focused, and consistent with currently available product documentation. The redesign should prioritize owners and facility managers seeking help with a project while keeping specifications and compliance information easy for engineers, architects, contractors, and AHJs to find.

## Required Project Rules

- Read `AGENTS.md` before changing files.
- This is Next.js 16.2.10 with breaking changes. Read relevant local documentation under `node_modules/next/dist/docs/` before changing Next-specific APIs or conventions.
- The App Router is under `src/app`. Do not create a root-level `app` directory.
- Do not invent specifications, engineering claims, dimensions, certifications, performance numbers, safety instructions, prices, lead times, or project-cycle timing.
- Keep `main` production-ready. Normal work targets `develop` through a short-lived branch.
- Preserve user files and unrelated changes.
- Use `npm.cmd` on Windows when PowerShell blocks `npm`.
- Before completion, run at least `npm.cmd run lint` and `npm.cmd run build`.
- Existing lint concerns were previously identified in `Header.tsx` and `Reveal.tsx`; distinguish pre-existing failures from new failures unless intentionally fixing them.

## Git State at Approval

- The repository was clean on `develop`, tracking `origin/develop`, before the user added source images.
- The approved branch is `feature/site-polish-audit`, created from local `develop` at commit `d499d4b`.
- User-provided source images under `assets/source-images/incoming/` are intentionally untracked at the start of implementation.
- Preserve those source files. Do not delete or destructively overwrite them.
- By default, commit optimized public derivatives, not redundant source-master duplicates, unless a later decision explicitly makes the source archive part of version control.

## Reviewed Context

The audit reviewed:

- `AGENTS.md`
- `README.md`
- All current `docs/**/*.md`
- Available `AI/**/*` context and placeholder files
- `package.json`, Next.js configuration, TypeScript configuration, redirects, and deployment configuration
- All routes under `src/app`
- Shared components under `src/components`
- Product, site, content, hero, and SEO data under `src/lib`
- Relevant local Next.js 16 documentation for metadata, JSON-LD, sitemap, robots, manifest, and dynamic routes
- All public routes at desktop and mobile widths
- All current product PDFs under `public/docs`
- All user-provided source photographs under `assets/source-images/incoming`

## Product Documentation Status

**Superseding control note, July 14, 2026:** The MOAS brochure Rev B, MOAS Engineering & Installation Planning Guide Rev A, and EPFA Product & Planning Brochure Rev A have completed their gated rebuild and publication workflows. Remaining pre-controlled site drafts were removed from public navigation and archived internally under `docs/PDF_Rebuild/Archive/pre-controlled-site-drafts/` because they contain obsolete listing wording, unreviewed technical content, and/or unapproved certification-mark treatments.

Current public active-product documents:

- `public/docs/moas-brochure-2026.pdf`
- `public/docs/moas-engineering-specs-installation-2026.pdf`
- `public/docs/epfa-brochure-2026.pdf`

The archived EPFA operation and maintenance manual and Enviro-Clean drafts are not source authority and must not be restored without controlled comparison review and publication approval. The EPFA brochure's model capacities, approximate weights, filter quantities, initial resistance, voltage, access, clearances, service interval, and project-interface values were confirmed by the owner on July 14, 2026 and are controlled in `docs/content/claims-register.md`.

## Approved Company and Content Decisions

- Public brand name: **Molitron**.
- Primary email: **cleanair@molitron.com**.
- Scott Airhart's current public title: **President**.
- Sales inquiries should primarily go to `cleanair@molitron.com`.
- Remove the public street address for now.
- Active products: **MOAS** and **EPFA**.
- Enviro-Clean is definitively discontinued for new projects.
- Enviro-Clean information and its PDF may remain available only as clearly labeled legacy/service documentation.
- Owners and facility managers seeking a quote are the primary audience.
- Secondary audiences include engineers, architects, contractors, AHJs, and buyers.
- Primary conversions, in order: quote form, phone call, engineering conversation.
- Position Molitron as serving projects nationwide. California and Denver/Colorado are focus markets, not the primary national headline.
- Remove all public claims about typical 1-6 month project cycles until Brandon confirms accurate information.
- The following owner-confirmed claims may be used with professional qualification:
  - Founded in 1986
  - California and Denver/Colorado market history
  - Nationwide support/install history
  - Colorado fabrication
  - Direct sales
  - DIA history and installations
  - Cannabis-related installation/application history
  - Named customer and installation references
  - Current MOAS performance language from the draft documentation, retaining all `up to` and process-dependent caveats
- Customer logos may be used for confirmed installation references. Prefer official brand assets and avoid language that implies endorsement.

## Pending Evidence and Future Documentation Tasks

Record and preserve these as explicit pending items in internal Markdown:

1. Obtain the correct official ETL and UL mark artwork and the certification-body authorization required for each proposed promotional placement.
2. Confirm EPFA initial fan resistance/static pressure.
3. Confirm EPFA capacity and approximate weight by model.
4. Confirm accurate lead-time or project-cycle language before adding any timing claim.
5. Update each PDF individually in future dedicated projects using editable sources and updated imagery.

The private certification records are controlled under `docs/Certifications/`. Public language must use `ETL Listed` for MOAS and `UL Listed` for EPFA with the exact product-specific scope recorded in `docs/content/claims-register.md`; do not infer UL 710 coverage for MOAS.

## Language Corrections

### EPFA

- Describe EPFA primarily as three-stage dry filtration for smoke particulate, grease vapor, and particulate matter in light-duty commercial kitchen exhaust.
- Do not imply that standard MERV filtration provides general odor removal.
- Tie odor treatment to the optional carbon final stage or to MOAS.
- Preserve the no-water/no-pumps/no-solution distinction for the filtration process.
- Do not publish unresolved model capacity, weight, or static-pressure data.

### MOAS

- Preserve `up to 95%` odor reduction and `up to 50%` smoke reduction only with the existing qualifications.
- Explain that results depend on the cooking process, hood performance, exhaust configuration, installation, and calibration.
- Prefer plain language over repeatedly using `molecular` as a marketing flourish.
- Do not turn performance statements into guarantees.

### Enviro-Clean

- Label as `Discontinued`, `Legacy equipment`, or `For existing installations only`.
- Do not include it in current product comparisons or current-document collections.
- Route owners of installed systems to service/support.
- Preserve legacy URLs and redirects where practical.

## Approved Visual Direction

Use a **precision industrial** visual system:

- Light-first design; remove the public dark-mode toggle.
- Deep mineral teal for primary structure and brand bands.
- Warm off-white backgrounds instead of a cold gray grid on every page.
- Graphite and stainless-steel neutrals.
- Restrained safety-amber accents for status, legacy, warning, or engineering cues.
- Modern engineered sans-serif typography for the primary hierarchy.
- Serif may remain only as a limited heritage/editorial accent if it strengthens the composition.
- Authentic Molitron equipment photography should lead product pages.
- Generated atmospheric imagery may be used only for supporting application context.
- Never fabricate a product, installation, certification mark, connection, label, or equipment detail in generated imagery.
- Use subtle drawing/data-plate motifs rather than decorative gradients, glass effects, or generic SaaS styling.
- Reduce heavy image overlays so equipment and field context remain visible.
- Avoid repetitive identical cards; create clearer hierarchy between navigation, explanations, evidence, specifications, and conversion sections.

## Source Image Inventory

User-provided source images live under:

`assets/source-images/incoming/`

Folders:

- `moas/`
- `epfa/`
- `installations/`
- `legacy-enviro-clean/`

The 16 uploaded images visually match images or derivatives already present under `public/images`. They remain useful as source masters and authoritative references but do not add substantially new compositions.

Best primary assets:

- MOAS closed transparent cutout, 1920 x 3413
- MOAS open transparent cutout, 1694 x 2412
- EPFA closed transparent cutout, 1920 x 1080
- EPFA open transparent cutout, 1920 x 1440
- EPFA entrance/inlet-open cutout, 1920 x 1080
- EPFA stacked closed, 1920 x 1688
- EPFA stacked open, 1920 x 1440
- Four installed MOAS units, 1921 x 1169
- EPFA rooftop installation, 1632 x 1224

Secondary or conditional assets:

- MOAS wall installations: crop and improve lighting while preserving the real installation.
- DIA exterior: use for history/application context only if publication rights are confirmed.
- Low-resolution EPFA rooftop image, 400 x 300: do not use as a primary zoom asset unless restoration passes close visual inspection.
- Kitchen image with large `Typical installation` graphic: exclude from the main site unless a clean original becomes available; it contains people and a baked-in overlay.
- Enviro-Clean cutout: legacy/service use only.

## Image Processing Requirements

Use two levels of processing.

### Deterministic processing

- Preserve untouched source masters.
- Correct orientation, exposure, white balance, tonal range, and modest perspective issues.
- Apply conservative denoising and sharpening.
- Clean transparent cutout edges without removing real equipment details.
- Strip unnecessary EXIF and private metadata from public derivatives.
- Use stable, descriptive, lowercase filenames.
- Produce efficient derivatives and use Next.js image optimization for responsive AVIF/WebP delivery.
- Set accurate `sizes` values.
- Use `priority`/eager loading only for genuine LCP imagery.
- Lazy-load below-the-fold gallery assets.
- Do not preload every gallery image.
- Provide accurate alt text and useful visible captions where context matters.

### AI-assisted restoration

- Use selectively for weak lighting, limited resolution, background cleanup, or distracting nontechnical clutter.
- Preserve equipment geometry, fittings, labels, controls, wiring, filters, doors, ducts, and installation conditions.
- Never invent missing equipment details.
- Compare every result directly against its source before publishing.
- Reject any output that alters technical details or creates ambiguous labels.

### Zoom behavior

- Initial gallery view should use responsive web-sized imagery.
- Load a higher-resolution inspection asset only when the user opens zoom/lightbox.
- Zoom controls must be keyboard accessible and usable on touch screens.
- Avoid loading all full-resolution originals during initial page render.

## Customer Logo Requirements

- Source logos from official customer brand websites or official media resources.
- Prefer SVG where legitimately available; otherwise use a clean high-resolution raster source.
- Optimize locally and avoid hotlinking.
- Keep presentation visually consistent, potentially monochrome or restrained-color where trademark guidance allows.
- Use logos only for owner-confirmed installation references.
- Do not state or imply sponsorship, partnership, or endorsement.
- Retain text names as an accessible fallback.

## Route and Conversion Plan

### Homepage

Recommended order:

1. Concise nationwide value proposition.
2. Primary `Request a Quote` action.
3. Secondary `Call` or `Discuss a Project` action.
4. Problem selector: odor, smoke/grease/particulate, or both.
5. Clear MOAS-versus-EPFA explanation.
6. Listing/history credibility strip with appropriately qualified language.
7. Application and installation evidence.
8. Buyer project-input checklist.
9. Compliance/documentation entry point.
10. Final quote CTA.

The mobile homepage hero should be materially shorter than the audited approximately 849 px height so visitors reach product/problem selection within the first viewport or immediately after it.

### Products index

- Expand beyond two product cards.
- Add a clear comparison by problem, method, utilities, and typical fit.
- Keep specifications qualified and link to the individual product pages.
- Make `Not sure which system?` a direct quote/conversation path.

### MOAS product page

- Lead with a recognizable real product view.
- Explain problem, method, benefits, limitations, project inputs, specifications, documents, and installations in that order.
- Keep performance caveats adjacent to performance claims.
- Use closed/open cabinet images and installation context.

### EPFA product page

- Lead with recognizable EPFA equipment.
- Make filter stages visually understandable.
- Explain optional carbon distinctly from standard filtration.
- Use stacked and rooftop imagery to demonstrate configuration context without inventing capacity claims.

### Solutions

- Strengthen restaurant, airport/hospitality, and cannabis pages with buyer-oriented problem framing.
- Present cannabis as an expanding application, not Molitron's core category.
- Link each application to the correct product path and quote inputs.

### Codes and Compliance

- Keep visible educational HTML and AHJ/design-professional disclaimers.
- Simplify language for owners while retaining pathways to technical documentation.
- Do not overstate jurisdictional acceptance or code approval.
- Separate active product documents from legacy material.

### Service and Parts

- Create clear MOAS, EPFA, and legacy Enviro-Clean paths.
- Add useful identification/request guidance for existing owners.
- Present the Enviro-Clean PDF only in the legacy section.

### About

- Use national positioning while retaining Colorado heritage, 1986 founding, DIA history, direct-sales model, and Scott Airhart's role.
- Remove the public street address.

### Contact and quote flow

- Keep the quote form as the primary conversion.
- Group fields into scannable project sections.
- Keep `Not sure - need a recommendation` prominent.
- Remove project-cycle promises.
- Provide phone and engineering-conversation alternatives.
- Add a concise privacy/use statement.
- Keep important technical inputs without making the form feel like a full submittal.

## Shared Component Plan

Likely files include:

- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/Logo.tsx`
- `src/components/PageHero.tsx`
- `src/components/ProductCard.tsx`
- `src/components/ProductGallery.tsx`
- `src/components/Section.tsx`
- `src/components/CtaBand.tsx`
- `src/components/QuoteForm.tsx`
- `src/components/DocDownloads.tsx`
- `src/components/FaqList.tsx`
- `src/components/Button.tsx`
- `src/app/globals.css`

Required interaction improvements:

- Remove dark-mode UI and theme initialization/storage behavior.
- Give the mobile drawer an obvious close control within the panel.
- Manage focus when opening and closing navigation.
- Keep touch targets at least approximately 44 x 44 CSS pixels.
- Preserve keyboard navigation and visible focus states.
- Respect reduced-motion preferences.

## Content and Data Files

Likely files include:

- `src/lib/site.ts`
- `src/lib/products.ts`
- `src/lib/content.ts`
- `src/lib/heroes.ts`
- `src/lib/seo.ts`
- New or expanded internal documentation under `docs/branding`, `docs/seo`, and `docs/content`

Create a typed documentation registry if it cleanly separates:

- Current MOAS documents
- Current EPFA documents
- Legacy Enviro-Clean documents

## SEO Plan

- Revalidate all route titles and descriptions after copy changes.
- Preserve a single clear H1 per route.
- Preserve canonical URLs.
- Improve internal links between problems, products, applications, documents, service, and quotes.
- Remove unsupported `priceRange` structured data.
- Reassess duplicate Organization and LocalBusiness schema; prefer the most accurate manufacturer/organization representation.
- Add BreadcrumbList only where visible breadcrumbs are implemented.
- Keep Product and FAQ schema synchronized with visible content.
- Do not assign the current timestamp to every sitemap route on every generation.
- Use recognizable product/application OG imagery.
- Preserve legacy redirects.
- Consider `X-Robots-Tag: noindex` for legacy PDFs while keeping them directly accessible to existing owners.
- Do not keyword-stuff or add unsupported geographic landing pages.

## Performance Plan

- Keep server-rendered HTML content for product and solution pages.
- Minimize unnecessary client components.
- Avoid loading the full product gallery at inspection resolution on initial render.
- Fix the observed LCP warning caused by an above-the-fold product image being lazy-loaded.
- Use explicit image dimensions/aspect ratios to avoid layout shift.
- Review font loading after simplifying the typography system.
- Avoid decorative effects that increase paint or compositing cost without improving comprehension.

## Validation Plan

Run and record:

```powershell
npm.cmd run lint
npm.cmd run build
```

Also validate:

- Desktop and mobile layouts at approximately 360, 390, 768, 1024, and 1440 px.
- No horizontal overflow.
- Keyboard navigation for header, menus, accordions, galleries, zoom, and forms.
- Mobile drawer opening, closing, focus return, and Escape behavior.
- Reduced-motion behavior.
- Color contrast and visible focus.
- Quote-form validation and success/error states without transmitting real user data during QA.
- Every route's title, description, canonical, H1, and primary internal links.
- JSON-LD against visible content.
- Sitemap, robots, legacy headers, and redirects.
- Image LCP, lazy loading, sizes, and zoom-on-demand behavior.
- Browser console warnings/errors.
- Visual comparison of remastered assets against original sources.

## Expected Git and PR Workflow

1. Work only on `feature/site-polish-audit`.
2. Keep source-photo masters preserved.
3. Check `git status --short --branch` throughout implementation.
4. Keep unrelated files out of the commit.
5. Commit the approved redesign and documentation intentionally.
6. Push the feature branch.
7. Open a draft PR into `develop` with validation results and any unresolved evidence items.
8. Do not push directly to `main` or `develop`.

## Resume Instructions for a Future Session

If a future Codex session inherits this work:

1. Read `AGENTS.md`.
2. Read this file completely.
3. Inspect `git status --short --branch` and confirm the active branch is `feature/site-polish-audit` or determine whether work was already committed/merged.
4. Preserve `assets/source-images/incoming/` and all user changes.
5. Review any completed plan steps and continue from the first incomplete section rather than restarting.
6. Do not edit the PDFs in this task.
7. Do not add unresolved project-cycle or EPFA model data.
8. Run the required checks before committing.

## Completion Definition

This task is complete when:

- The approved identity, content, legacy status, and conversion hierarchy are consistently implemented.
- The visual system is modern, distinctive, light-first, and technically credible.
- Product imagery is optimized and technically faithful.
- Active and legacy documentation are clearly separated.
- SEO and structured data accurately reflect visible content.
- Mobile and desktop experiences pass the validation plan.
- Lint/build results and known exceptions are documented.
- Changes are committed and a PR into `develop` is prepared.
