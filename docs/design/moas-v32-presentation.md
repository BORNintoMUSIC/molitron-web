# MOAS v32 presentation

September 25, 2026. The MOAS explorer now uses the prepared cabinet v32, external solution container v5, and Stenner pump v2. It keeps the existing opt-in loading on the homepage and MOAS product page.

The subsequent [camera and lighting milestone](moas-viewer-controls-lighting.md) replaces the initial navigation and lighting described below. It adds screen-space pan, continuous camera handling, closer component framing and revised studio lighting; the v32 asset and native sources remain unchanged. Timing figures below belong to the original presentation pass.

Owner-requested follow-up: the 3D stage now matches the product explorer's forest-green gradient (`#2b4c42` to `#1b3932`), with light heading text and a matching `/images/moas/moas-v32-forest-poster.webp` loading image. The original poster listed below is retained as release evidence. Expanded controls also remain visible in short desktop windows. Model materials and studio lighting are unchanged.

The cabinet door and its latch respond to direct clicks and a 0–150° keyboard-accessible slider. The external fill lid slides forward 214.3252 mm; its rails, fixed entry panel, and pickup assembly stay stationary. Buttons provide equivalent actions. Twelve component descriptions remain in HTML when the model fails to download. Selection frames a component, interior selections open the door, and Reset restores the starting view, mechanisms, zoom, and selection. Expanded view traps keyboard focus; Escape reduces it, then returns to images and restores launch focus. Door, lid, and camera easing respect reduced-motion preferences.

## Public asset

| Item | Measured value |
| --- | --- |
| GLB | `/models/moas-cabinet-v32.glb` |
| Transfer size, including embedded textures | 3,222,684 bytes |
| Triangles | 353,748 |
| Material primitives | 123 |
| Texture maps | Two 512 × 512 PNGs |
| Decoded geometry buffer | 7,459,884 bytes, excluding runtime copies and renderer resources |
| Matching browser poster | `/images/moas/moas-v32-poster.webp`, 47,842 bytes |
| SHA-256 | `64a022e86e0db28d155a84fce351faedd0d1a6c322302470412772cb6259e2c4` |

The satin stainless uses directional roughness/normal maps and anisotropy. Nonmetal colors are converted from source sRGB to linear values, with separate plastic, rubber, transparent, and metal behavior. Neutral studio reflections and dynamic contact shadows support both mechanisms. The source visual-envelope overlap is removed only from the presentation derivative. Existing approved MOAS nameplate artwork is retained. No unknown pump flow/pressure SKU or nameplate was invented; the owner identified ECON VX, 120 VAC.

The public GLB contains semantic component IDs and mechanism metadata. Native CAD IDs, private occurrence paths, and authoring annotations are removed. The editable Blender master, kitchen replacement, source records, texture generators, and repeatable export scripts remain in the private workspace.

## Validation

- glTF Validator: zero errors and zero warnings. Its one informational message concerns unsupported validation of Meshopt; a real Meshopt decode and browser load also passed.
- Six raw/compressed poses (door 0°, 90°, 150°; lid closed/open) agree to a maximum bounding-box difference of 0.367 mm. All ten stationary groups retain identical bounds during motion. These checks establish presentation fidelity, not installation clearances.
- Desktop and 390-pixel layouts reviewed. Direct door/lid clicks, orbit drag filtering, slider endpoints via keyboard, component focus, automatic interior opening, reset, focus wrap, Escape, and return focus exercised.
- Production-build model failure preserves the poster, retry control, and HTML component descriptions. A local proxy also exercises a throttled model transfer.
- `npm.cmd run check` and `npm.cmd run check:full` passed, including all six public PDFs and the production build.

Development samples on this Windows desktop recorded median/p95 frame times of 7.5/35.8 ms at an 1115 × 837 canvas and 10.7/27.8 ms at 390 × 290. These short animation samples exclude idle demand-rendering gaps; they are not sustained FPS guarantees or physical-phone measurements. The renderer reported 247 draw calls and 707,498 triangles for its combined color/transmission pass, 139 geometry resources, and 8 texture resources. The GLB itself has 123 primitives; transmission and shadows add rendering work. Physical iOS/Android performance and device memory remain unmeasured. Reduced-motion branches were reviewed but the OS preference was not switched during this run.

## Delivery

Continue on `codex/homepage-visual-prototype` through draft PR #42. The authorized delivery target is `https://molitron-web.vercel.app`; its Preview branch assignment was verified in Vercel before release. A merge into `main` still requires the existing review approval.

Do not change `molitron.com`, `www.molitron.com`, their site, DNS, hosting, certificates, or domain assignments. The Vercel project domain inspection showed only the authorized short Vercel domain. A future public-site transition requires explicit authorization.
