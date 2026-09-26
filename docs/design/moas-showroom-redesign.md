# MOAS showroom / guided explorer

## Design states

- Whole system: fully framed cabinet and solution container on the forest stage; three view choices above, one cabinet action below, compact Rotate / Pan / zoom / Fit dock. No empty detail card.
- Inside: an explicit open-cabinet overview. Mechanism controls remain separate and preserve the camera pose.
- Components: accessible component picker and concise detail, with Next and Back to whole system. Desktop places the inspector beside the canvas; narrow stages use a dismissible sheet below the canvas, with an explicit expand/collapse control. Neither layout covers geometry.
- More controls: directional camera buttons, front view, door angle, fill lid and Reset all. Help explains gestures and keyboard alternatives.
- Loading / failure: the same forest poster, progress or retry, and a working HTML component explorer when download fails.

Use the existing model, materials, camera controller, direct mesh selection and component facts. No illustrative floating markers, new render effects, automatic rotation or kitchen walkthrough. Use container width for layout, 44px targets, visible focus and reduced-motion behavior. Short windows scroll within the expanded viewer.

## Delivery boundary

Continue draft PR #42 on `codex/homepage-visual-prototype`; deliver and verify anonymously at `https://molitron-web.vercel.app`. Inspect actual Vercel assignments before release. Do not change `molitron.com`, `www.molitron.com`, their existing site, DNS, hosting or domain settings. Preserve unrelated workspace edits.

## Implementation and evidence — September 26, 2026

The active viewer now takes the full product-explorer width and owns its navigation; Back to images restores the original photo/process navigation. The embedded viewer follows normal page flow. Expansion uses a bounded grid, with a compact landscape dock and an independently scrollable inspector when vertical space is short. Opening 3D places its navigation below the sticky site header.

Whole system / Inside / Components have explicit state separate from door position. Cabinet and fill-lid actions do not issue camera commands. Component selection uses the current canvas container dimensions, avoiding a stale aspect ratio when its inspector opens. A selection made during model download is honored when the model becomes ready. Keyboard entry can focus the picker without scrolling; direct mesh selection keeps focus in the model. Escape closes Help/More/details before reducing or exiting, including when focus is in the header. The focus trap excludes hidden and inert fallback controls.

The mobile sheet has an explicit More detail / Less control and a close action. Its summary, Next component and return action remain compact; camera controls retain 44px targets. Short landscape places details beside the model so Rotate/Pan, zoom, Fit and exit remain reachable. Narrow portrait retains the stacked layout. Precision controls and gesture/keyboard help are disclosures; the caveat remains available in Help in short windows.

A failed download or unavailable WebGL retains the poster and HTML component information, with Retry 3D and disabled camera controls. A one-time WebGL2 probe releases its temporary context immediately; dormant native-canvas fallback content is inert. A later GPU context loss or asynchronous renderer failure after a successful probe is not separately recovered by this milestone.

Validation completed locally:

- TypeScript, ESLint, changed/full content validation, production build (7 PDFs, 62 asset references, 23 routes), and all seven existing camera-math regressions passed.
- Browser checks covered desktop, 390px phone and short landscape layouts; actual device testing remains outstanding. Numeric camera logs verify manual rotate/pan followed by zoom and unchanged camera position/target through cabinet and fill-lid operations. Keyboard arrows, Shift+arrows, zoom, F, forward/reverse focus wrap and layered Escape restoration were exercised.
- Local production proxies tested failed downloads, Retry, unavailable WebGL, and throttled success with a queued pump selection. The reduced-motion JavaScript branch was exercised using a local QA media-query override; OS-level reduced motion and physical touch/performance are unverified.
- No rendering effects, lighting, model geometry, material authoring or component facts changed. GLB SHA-256 remains `64a022e86e0db28d155a84fce351faedd0d1a6c322302470412772cb6259e2c4`.

Private screenshots and command evidence are under `moas-3d-lab/review/showroom-*`, outside public assets. Read-only Vercel inspection confirmed the project's only configured domain is `molitron-web.vercel.app`, mapped to `codex/homepage-visual-prototype`. Release remains through draft, unmerged PR #42. The protected public domains and their existing site remain untouched.
