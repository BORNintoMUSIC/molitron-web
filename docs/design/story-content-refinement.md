# Story and content refinement

September 6, 2026. This review follows the forest-green full-site redesign at commit 1b375a8bee8b8418e0ca2d553d639e943e8020df. It refines the existing staging branch and leaves the Fusion work for its own milestone.

## Result and measurement

Measured main-page copy fell from **7,399 to 4,911 words: 2488 fewer words, a 33.6% reduction**. The target was at least 20%. All 16 existing content routes remain available.

The count uses the text nodes inside each page's main element, including closed disclosures and select options, in its initial state. Script, style, SVG metadata, aria-hidden elements and screen-reader-only duplicates are excluded. Shared header/footer navigation, image alt text, PDF contents and metadata are outside this page-copy metric. Whitespace is normalized and Unicode letter/number words are counted consistently, with apostrophes and hyphenated terms kept together. This measures reading volume, not conversion or usability gains.

The initial explorer state now shows the interior; all six exterior/interior/process states were also reviewed through the controls. No material was moved into collapsed or hidden containers to reach the reduction. The two guide routes and their technical text remain in the denominator. Their three-word changes come only from the removed shared CTA eyebrow. Guide source files, product specifications/model data and the six PDFs are unchanged.

| Route | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| / | 693 | 258 | 62.8% |
| /products | 248 | 155 | 37.5% |
| /products/moas | 575 | 430 | 25.2% |
| /products/epfa | 877 | 699 | 20.3% |
| /resources | 237 | 196 | 17.3% |
| /solutions | 126 | 62 | 50.8% |
| /solutions/restaurants | 352 | 143 | 59.4% |
| /solutions/airports-hospitality | 329 | 146 | 55.6% |
| /solutions/cannabis | 345 | 147 | 57.4% |
| /solutions/industrial | 363 | 124 | 65.8% |
| /about | 241 | 127 | 47.3% |
| /codes-compliance | 729 | 240 | 67.1% |
| /service-parts | 257 | 190 | 26.1% |
| /contact | 188 | 161 | 14.4% |
| /products/moas/installation-planning | 925 | 922 | 0.3% |
| /products/epfa/operation-maintenance | 914 | 911 | 0.3% |

Measured links inside main went from 194 to 168. These are link elements, not unique destinations; the decrease mostly removes repeated invitations to the same products and contact page.

## What the audit found

The visual language was consistent, but the narrative repeatedly restarted. The homepage explained product roles in the hero, explorer, comparison rows and FAQ. Every application page repeated the full two-product catalog, an input checklist, a planning discussion and multiple contact invitations. The listing page repeated its listing records in both an editorial section and a general company FAQ. Generic headings described the presence of information instead of helping visitors understand the next decision.

The new sequence is: recognize the two products → inspect their operation → understand the application → see the people and installation history → choose project inquiry or technical support. The forest-green product stages, actual equipment photography and family-business story carry the visual identity.

## Page responsibilities

| Page or group | Visitor question | Refinement |
| --- | --- | --- |
| Home | What does Molitron make, and where do I go next? | Explicit MOAS/EPFA roles at the opening; an interior-first explorer; application cards; heritage and qualified installation history; one final section for project inquiry and operating guides. Removed the repeated role section and company FAQ. |
| Product comparison | Which system addresses my concern? | Two equal product cards, then application/process/placement comparisons. Both values remain readable on a phone without sideways scrolling. The combined-system inquiry carries both products into contact. |
| MOAS | How does odor treatment fit my exhaust? | Short fit and installation brief. Qualified numerical claims are retained in the specification table instead of repeated as long highlights. Optional solution-container information is retained. |
| EPFA | What does the filtration assembly require? | Short scope and coordination brief. Full specifications, all eleven models, service information and optional-carbon qualification remain. The hero names the covered EPFA model range beside its listing. |
| Applications index | Which environment resembles my project? | Direct route to the four application briefs, with the commercial-kitchen scope stated once. Removed the second introductory section. |
| Restaurants | What must a kitchen exhaust plan consider? | Hood and cooking load → discharge and neighbors → installation coordination. Product scope and model links stay adjacent. |
| Airports & hospitality | How does the kitchen relate to the building? | Kitchen layout → shared spaces → service access. Retains qualified Denver International Airport history. |
| Cannabis | Is the equipment appropriate for this process? | Process and exhaust information, explicit kitchen-scope limits and individual application review. Retains the qualified Greenmount history. |
| Industrial & specialty | Can this equipment be considered for another process? | Source → airstream → site. Explicitly retains the warning against assuming fit or listing coverage. |
| About | Who is behind the equipment? | Colorado fabrication, the family business, Scott Airhart and nationwide installation history. Removed another product pitch and a redundant final contact band. |
| Resources | Which document do I need? | Product-grouped online guides and PDFs remain prominent. Listings and service links use their destination names. |
| Listings | What is actually covered? | Exact MOAS/EPFA listing records, the project-approval boundary and a concise project-review brief. Removed duplicate records and general sales FAQs. |
| Service | How do I get help with installed equipment? | Product-specific service links, equipment identification and a separate discontinued Enviro-Clean section. Service actions retain their inquiry context. |
| Contact | How can I reach Molitron? | Direct phone/email and a concise form introduction. Product and service selections carry through incoming links; technical details remain optional. |
| Both technical guides | What are the documented requirements? | Technical content and controlled document links retained. Existing readable HTML, section navigation and printable PDFs remain the detailed reference. |

## Review loops

1. Inventory and baseline: read all routes, shared presentation data and claims controls; capture initial copy and explorer states.
2. Structural edit: remove duplicated sections and consolidate application planning; remeasure. This pass reached 33.7% before final refinements.
3. Visual and interaction review: inspect phone and desktop journeys. Replace the swiping comparison, make the explorer open its interior, give product anchors space below sticky navigation, remove the cramped repeated document thumbnail and clarify listing scope. A final phone diagram check removed a duplicate caption and retained enough media height to separate its labels. Final page-copy reduction is 33.6%.

## Validation and limits

The optimized production build, TypeScript, ESLint and validation of all six PDFs and 69 asset references passed. Layout checks covered all 16 routes at 320, 390, 820 and 1440 pixels: one H1, valid local section anchors and no page-wide horizontal overflow. Intentional horizontal scrolling remains inside long technical tables and section navigation.

The six explorer views, keyboard Home navigation, product anchor position, phone menu Escape/focus behavior and the product-specific service inquiry were exercised. These are browser viewport checks, not physical-device certification, an accessibility audit or measured field performance. The quote-delivery backend was unchanged; no test inquiry was sent to the business.

## Fusion handoff

Keep the present product-media area as the future model stage. The existing exterior/interior/process views provide a useful structure for approved Fusion model and animation states. Preserve the HTML explanations, technical links, product context, keyboard controls and static photography fallback when the renderer is added.

The next 3D milestone should establish approved exports and camera views, then validate loading, touch interaction, motion preferences and performance on actual desktop and mobile hardware. The visitor should still be able to understand the equipment and contact Molitron before loading the model. Avoid adding a second, competing product story around the future viewer.

Staging remains the existing draft PR and Vercel preview. Production promotion is a separate reviewed step.
