# MOAS 3D staging trial

Historical v16 record. The current presentation is documented in [MOAS v32 presentation](moas-v32-presentation.md).

2026-09-10. The owner requested publishing the unfinished cabinet trial to the existing Vercel staging site for family review in the full website context.

MOAS exterior and interior views now offer **Explore in 3D** on the homepage and MOAS product page. The viewer loads only after activation, inside the existing product explorer. Exterior starts closed; interior starts with the door open. The process diagram and the EPFA explorer keep their existing views.

The first draft offers orbit/pinch, keyboard-accessible zoom buttons, front view, a 0–150° door slider, reset, component selection and hiding, and return to images. Escape exits 3D and returns focus to the launch button. Reduced motion disables the door easing. The same-model poster stays available during download or failure. The existing product explanations, specifications, documents, and inquiry paths remain alongside the viewer.

## Asset

- Actual unfinished Fusion cabinet snapshot v16; the native model remains unchanged.
- Public derivative: `/models/moas-cabinet-v16.glb`, 7,148,648 bytes, 1,168,974 triangles.
- SHA-256: `d629e7eb05d0f1128e4254fbaf1a5c7f878a0665b648bdf2156a9e7a9000612c`.
- Poster: `/images/moas/moas-v16-poster.webp`, rendered from that cabinet configuration.
- The moving door, hinge leaf, and latch remain an eight-node assembly on the verified hinge pivot. Three.js comparison of the private and public derivatives at 0°, 90°, and 150° gives identical bounds and triangle counts.
- Native document identifiers, occurrence paths, component names, and authoring metadata were removed from the public derivative. Only generic part labels and runtime interaction metadata remain. Native STEP/OBJ/Blender files are outside the website.
- CAD colors, estimated geometry, and hidden internal covers remain part of this first draft. It is a presentation review, not a dimensioned installation drawing or mechanical clearance check.

Registration lives in `src/lib/moas-model.ts`. The lightweight activation wrapper is `MoasModelStage`; the dynamically loaded React Three Fiber viewer and resource loader are under `src/components/model/`.

## Validation and dependencies

Local full lint, public content validation (six PDFs), TypeScript, and the Next.js production build passed. The actual model was exercised in the product page at desktop and phone widths, including open/close, full slider travel, view switching, zoom/reset, and return to existing media. No browser errors were captured in these checks. Physical-phone rendering performance and visual polish remain follow-up work.

The existing Next.js 16.2.10 dependency had npm security advisories. Next.js and its ESLint configuration were updated to 16.3.4, and compatible transitive fixes were applied. The resulting npm audit reported zero vulnerabilities. `next dev` refreshed its generated AGENTS.md header as part of that update.

This change extends the current staging review branch. Production promotion remains the existing PR review and merge process.
