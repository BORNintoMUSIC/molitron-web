# Homepage visual prototype

September 6, 2026. Branch: `codex/homepage-visual-prototype`. Base: `main` at `a27bce9`.

## Review scope

The homepage opening and one MOAS walkthrough establish a proposed desktop and phone direction. The remaining site continues to use its existing routes, content, navigation, documents, and deployment configuration. A few homepage introductions have been rewritten to remove internal editorial language.

The opening uses an off-white reading surface, a forest-green product scene, Source Sans 3, and the existing published MOAS image. It has direct routes to the walkthrough and project inquiry. No new dependencies, external fonts, tracking, or background video have been added.

The walkthrough provides three button-selected views: cabinet exterior, cabinet interior, and an illustrative cabinet-to-exhaust relationship. Buttons work with clicks, normal keyboard activation, arrow keys, Home, and End; the selected description is announced through a polite live region. On narrow screens the controls appear above the image. The diagram is explicitly illustrative and is not an installation drawing or performance simulation.

## Asset and content authority

- Exterior: existing `/images/moas/moas-closed-professional-gpt2.png`.
- Interior: existing `/images/remastered/moas-open-v2.webp`.
- Company facts: `src/lib/site.ts` and `docs/content/claims-register.md`.
- Operating explanation: `src/lib/products.ts` and the current published MOAS planning guide.

These are the site's existing image assets, not new CAD renders. The prototype has no live 3D model, free rotation, or CAD animation. The completed Fusion design will supply a later verified web asset; it has not been opened or modified for this work. The schematic communicates only the relationship between the outside cabinet and remote nozzles, with no dimensional or quantified performance claim.

## Validation

- `npm.cmd run check`: passed (Next.js route types, TypeScript, ESLint, changed-content validation).
- `npm.cmd run check:full`: passed (ESLint, validation of all six public PDFs and referenced assets, production compilation, TypeScript, and static page generation).
- Browser checks: desktop at 1440 CSS pixels; narrow layouts at 390 and 320 CSS pixels. The Chromium scrollbar uses 15 pixels of those viewport widths. No horizontal document overflow was observed at either narrow size.
- Verified interior selection, exhaust-path selection, arrow-key selection, homepage anchor, mobile menu opening, and Escape dismissal.
- Visually reviewed the desktop opening and all three walkthrough states, plus the phone opening and diagram state.
- The new animations/transitions have reduced-motion overrides; physical-device and assistive-technology testing remain release work.
- Vercel continues to run the repository's full validation and production build for the preview.

## Review and next phase

Review the opening's composition, visual character, phone hierarchy, and the explanatory value of the walkthrough. Assess this as a focused design milestone; the remaining homepage sections are not a complete redesign.

After the direction is accepted, refine it with the approved Fusion imagery and extend the design consistently to the product pages. Keep the prototype on its branch until the design and Vercel preview are approved for merge. `main` supplies the current alpha deployment.
