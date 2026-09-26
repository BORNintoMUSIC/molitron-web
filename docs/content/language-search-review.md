# Language and search review

Implemented September 6, 2026, following approval of the language, SEO and AI visibility proposal. This pass covers all 16 website routes and shared copy while retaining the forest-green design and the existing technical documents.

## Editorial changes

The opening retains “Exhaust control. Built around your kitchen.” Its category line now names commercial kitchen pollution control, and the introduction identifies Molitron, its Colorado fabrication and the different roles of MOAS and EPFA.

Product introductions expand both names and explain the intended application and method. Product heroes, comparison cards and Product structured data now share the same definitions from `src/lib/products.ts`. Placement, the optional carbon stage, performance qualifications and listing scope remain in the relevant product sections.

| Area | Previous wording or behavior | Result |
|---|---|---|
| MOAS explorer | “The components behind the mist.” | “Inside the MOAS cabinet.” The exhaust-path explanation also identifies MOAS directly. |
| Comparison | “Choose by what needs treatment.” | “Do you need MOAS, EPFA or both?” Existing comparison rows explain treatment, method and placement. |
| EPFA | Odor-treatment qualification following the specification table | The same qualified explanation has the heading “Does EPFA provide odor control?” |
| About | “A family business. Built around the equipment.” | “A family business. Built in Colorado.” Scott is introduced by name and role. |
| Applications | Vague industrial heading and abbreviated coordination language | Explicit application-review heading, clearer planning inputs and first-use expansion of CFM on the restaurant page. |
| Document library | Internal approval/publication wording in summaries | Short descriptions of the contents and their planning or service purpose. Document identities, URLs and limitations remain. |
| Online guides | “Final publication” and “Open final PDF” | Product-specific guide/manual labels with PDF and revision information. |
| EPFA service handoff | A generic project button from the installed-equipment manual | “Request EPFA service support” opens the contact form with EPFA and service selected. |
| MOAS planning handoff | Generic project inquiry | “Discuss MOAS installation” opens MOAS application guidance. |
| Contact | Heading based on the initial URL, even after changing the inquiry selector | A neutral “How can we help?” heading works for quotes, guidance and service. Field labels and fallback feedback are clearer. |

## Search and structured data

Each route has a distinct branded title and an accurate description. The page title, Open Graph and Twitter text are produced together. Absolute titles fix the homepage omission caused by the layout template applying only to child route segments.

The cannabis search description now describes suitability review rather than broad equipment coverage. The listing page no longer promises California air-district guidance. Navigation labels use “Equipment listings” while retaining `/codes-compliance`.

Search metadata names the company as author and publisher rather than automatically attributing every page to Scott. Obsolete keyword meta-tag arrays were removed. Sharing images use current assets, with descriptions identifying illustrative application artwork appropriately.

Organization, Product and TechArticle records use stable identifiers based on the configured site origin. The organization references the existing approved wordmark. Product records connect to their online guide; the guides reference their product and the same organization. The Product description matches the visible introduction. No prices, ratings, testimonials or unverified review dates were added.

These changes make the content clearer and more consistent for readers and search systems. They do not promise rankings or AI citations.

## Verification

- Full lint, public-content validation, TypeScript and production build passed.
- All 16 rendered pages have one H1, branded titles, matching page/social descriptions and company attribution. Product introductions match their structured descriptions.
- All 16 routes were checked at 320, 390, 820 and 1440 pixels. No horizontal page overflow or clipped heading/copy was found. The existing rotated explorer arrow was separately checked after producing a geometric overflow flag; its labels remain inside the control.
- All six explorer views were checked at phone and desktop widths, including keyboard Home navigation.
- EPFA service and MOAS planning links were exercised through the browser. Changing inquiry type preserves the appropriate heading and switches the notes/optional details correctly. No inquiry was submitted.
- Against starting revision `c1ba68b91ecf28b0b9e85d792258c4bcf6c037b6`, all six PDFs are byte-for-byte unchanged. Product specifications, certifications, technical claim lists, installation references, document URLs, all eleven EPFA model rows and both guide data/responsibility tables are unchanged.

## Subsequent work

The public-domain transition remains a separate launch step: reconcile legacy Molitron pages, map old HTML URLs, align the primary domain and canonical URLs, and verify production crawler access. Existing preview indexing protection and discontinued-document indexing rules remain in place.

Verified installation stories and search/AI citation measurement can follow when project evidence and analytics access are available. Future Fusion models should retain the visible HTML product definitions, specifications and guide links alongside their interactive views.
