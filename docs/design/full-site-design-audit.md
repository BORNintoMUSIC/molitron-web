# Molitron full-site design audit

Date: September 6, 2026  
Scope: the existing Molitron staging website, all 16 content routes, shared navigation, footer, product interactions, technical references, inquiry flow, and utility states.  
Design baseline: the approved forest-green homepage prototype. This work extends that direction throughout the existing Next.js site.

## Design conclusion

Molitron has two active products with distinct jobs. The website should make that clarity its central strength: MOAS for odor abatement and EPFA for dry filtration. Visitors should recognize both quickly, understand the difference, inspect the equipment, find the technical reference, and reach the manufacturer.

The alpha’s main weakness was inconsistency. A confident, industrial opening led into a different visual language: teal photo overlays, serif headings, repetitive cards, long introductions, and utility pages with oversized marketing heroes. The document library and support paths also gave the two products uneven visibility.

The revised site uses one design system, with different levels of visual emphasis for product discovery, application context, and technical reading.

## Findings and implemented changes

| Area | Finding | Applied design |
| --- | --- | --- |
| Shared visual system | Forest green in the prototype competed with teal and serif styling elsewhere. | Forest green, warm off-white, restrained olive accents, Source Sans 3, fine rules, modest corners, and consistent spacing throughout. Removed unused legacy gallery/navigation CSS and the extra serif font preload. |
| Navigation | Product choice was hidden in a dropdown; support links crowded the header. | Direct MOAS and EPFA links, Applications and Resources disclosures, About, and a clear inquiry action. Both products also appear in the footer. |
| Homepage opening | MOAS carried the entire product story. | Two visible product showcases in one opening. Each links directly to its product page. |
| Homepage narrative | Repeated selection cards, product cards, and dense listing text diluted the story. | Opening → guided explorer → distinct product roles → applications → family company story → installation history → technical resources → questions → inquiry. |
| Guided experience | Only MOAS had an interactive story. | A shared explorer with MOAS and EPFA selection, cabinet/assembly views, interior photography, and clearly labeled illustrative process diagrams. |
| Product index | Long product cards buried the difference between the systems. | Equal photo stages, concise product roles, useful features, and a scrollable comparison table. |
| Product detail | Atmospheric background image, gallery, summary, and specifications felt disconnected. | Dedicated product opening, in-page navigation, overview, guided explanation, retained specifications, documents, photo inspection, and project history. |
| Resources | Four documents appeared as one undifferentiated set. | Separate MOAS and EPFA groups, product imagery, a prominent online guide for each, and consistent PDF download rows. |
| Applications | Uneven layouts and generic card grids. | Shared editorial structure with context imagery, numbered considerations, useful project inputs, both product options, and document-library access. |
| About | Repetitive milestones and combative sales phrasing distracted from the company. | Family business, Colorado fabrication, founding year, direct contact, leadership, and documented installation history. |
| Codes and listings | Product listing scope was mixed into generic educational content. | Equal MOAS/EPFA listing summaries, specific report/file context, separate project-review material, and clear links to technical references. |
| Service | EPFA’s manual was more visible than MOAS support. Public copy also described planned future website features. | Balanced support for current equipment, product-specific inquiry links, practical information to share, and a separate legacy equipment section. Removed website-roadmap copy. |
| Technical guides | Long pages had limited navigation and retained the old visual language. | Compact editorial openings, sticky section links, clearer reading rhythm, and keyboard-accessible table regions. |
| Inquiry flow | Many technical fields appeared immediately, with several assumptions preselected. Product context was lost when following inquiry links. | Inquiry/contact groups, optional technical details, service-specific notes, neutral defaults, and validated product/goal preselection from links. |
| Form feedback | A local development response could look like a delivered request. | Distinguishes delivered requests from local validation. Failed requests retain the entered information and show the direct contact path. |
| Interaction accessibility | Menu behavior relied on hover/focus overlap; desktop Escape could lose focus. | Explicit disclosure controls, outside-click dismissal, Escape focus return, mobile focus trapping, inert background content, and cleanup when resizing to desktop. |
| Mobile details | The narrow-width review found an overflowing library link. | Its callout stacks vertically on phones. Wide specification tables scroll within their own accessible region. |

## Route coverage

| Route | Resulting role |
| --- | --- |
| / | Product-led brand introduction and exploration of both systems |
| /products | Equal product presentation and practical comparison |
| /products/moas | Dedicated MOAS story, explorer, specifications, and resources |
| /products/epfa | Dedicated EPFA story, filter explorer, model range, and resources |
| /resources | Product-organized document library |
| /solutions | Visual application index |
| /solutions/restaurants | Kitchen project context and equipment selection |
| /solutions/airports-hospitality | Shared-building planning and qualified installation history |
| /solutions/cannabis | Process-specific application review |
| /solutions/industrial | Documented review of a nonstandard process and airstream |
| /about | Family company, Colorado roots, and direct manufacturer relationship |
| /codes-compliance | Product listing scope and project-review context |
| /service-parts | Current-equipment support and separate legacy references |
| /contact | Shorter inquiry path with product/service context |
| /products/moas/installation-planning | Navigable HTML planning reference |
| /products/epfa/operation-maintenance | Navigable HTML operation and maintenance reference |

The not-found page and error boundary inherit the same typography, colors, and action styling. Existing route URLs, sitemap membership, document redirects, and legacy PDF noindex behavior are retained.

## Content and technical fidelity

- MOAS and EPFA remain the only active products. Enviro-Clean appears in the context of existing-equipment support.
- All six approved PDFs are unchanged.
- An AST comparison verified the MOAS technical-data and project-role arrays, EPFA controlled-data array, and EPFA model-range array against the previous commit. Their source values are unchanged.
- Two EPFA highlight phrases were edited to remove internal “owner-confirmed” wording; the capacities and technical meaning were retained.
- Existing performance qualifications, listing scope, project-specific limitations, and guide safety boundaries remain present.
- The family-business description comes from the owner’s request. Founding year, Colorado fabrication, direct sales, leadership, and installation history use the existing claims register.
- Application artwork is described as illustrative context. It is not presented as a new customer case study.
- Product diagrams explain a relationship or sequence. They are not installation drawings, performance simulations, or the unfinished Fusion model.

## Verification

- TypeScript, ESLint, repository content/asset validation, and optimized production build.
- Browser layout inspection across all 16 routes at desktop, tablet, standard-phone, and narrow-phone widths.
- One H1 per route, descriptions and canonical links, internal section-anchor destinations, and image loading checks.
- MOAS/EPFA explorer selection, step controls, keyboard navigation, and diagrams.
- Product photo navigation, full-size inspection, Escape dismissal, and focus handling.
- Desktop and mobile navigation, keyboard opening/closing, mobile background exclusion, focus trapping, and focus return.
- Product/service inquiry preselection, required-field validation, and local-only submission feedback with fictional test data. No email was sent.
- Narrow-phone library-callout correction checked against the production build.
- Preview deployment remains the review destination; production publishing requires the normal approved merge.

See the accompanying browser review captures and measurement output in the workspace’s prototype-review/full-site folder.

### Review limits

Browser viewport emulation is not a physical iPhone/Android test. Real-device Safari/Chrome testing, real email delivery, and field performance measurements are still prelaunch checks. No claim is made that this audit is a formal WCAG certification or that a Core Web Vitals target has been measured and achieved.

The local development server retained an older compiled global stylesheet during editing. A fresh development cache restored it; final visual checks use the production build to verify the delivered CSS rather than relying on hot reload.

## Design rules for the next additions

1. **Let the equipment carry the visual impact.** Use clear product photography, considered lighting, large names, and purposeful interaction. Keep specifications close.
2. **Show both products; explain their different jobs.** Treat combined use as a project-specific conversation.
3. **Match visual intensity to the visitor’s task.** Product exploration can be rich; manuals, service, and contact should be direct and readable.
4. **Make the phone experience intentional.** Keep content in normal document flow, controls reachable, tables locally scrollable, and essential information available before any large interactive asset loads.
5. **Use consistent proof.** Every brochure, guide, product page, and future assistant should draw on the same approved product facts.
6. **Keep the company human.** Colorado manufacturing, the family business, and direct access to Molitron are stronger material than generic “AI-powered” language.

## Next milestones for the broader rebuild

**Fusion-to-web product experience.** Replace the appropriate photographic explorer stage with an approved, optimized web model after the Fusion design is ready. Keep the surrounding product story, controls, semantic HTML, and poster-image fallback. Validate mouse, touch, keyboard, reduced-motion behavior, loading, and performance on actual phones before adding more motion.

**Brand asset library.** Commission or collect approved workshop, people, equipment, and installation photography. Build a controlled set of product views that can serve the website, brochures, technical covers, and sales material.

**Document alignment.** Extend the website’s palette, spacing, terminology, and product hierarchy into new document work using the approved Molitron document template. Existing technical publications should be revised through their own controlled workflow.

**Search and AI readiness.** Continue publishing readable HTML companions with stable product URLs and source-grounded Organization, Product, and TechArticle data. Any future inquiry assistant should answer from approved documentation and route project-specific engineering questions to Molitron.

**Launch verification.** Complete real-device review, email-delivery verification, accessibility testing, image/performance measurements, analytics and inquiry tracking, and the owner’s content review before approving the main-branch release.
