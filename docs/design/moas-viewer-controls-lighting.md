# MOAS explorer: camera and lighting milestone

September 25–26, 2026. Follow-up to the completed v32 source replacement. The public GLB, authored materials, Blender master, kitchen installation and service connections are unchanged. GLB SHA-256 remains `64a022e86e0db28d155a84fce351faedd0d1a6c322302470412772cb6259e2c4` (3,222,684 bytes).

## Viewer behavior

The camera and orbit target now form one shared pose for gestures and buttons. Only explicit Fit view, Front, Reset and component-focus actions reframe. Operating either mechanism, clearing selection, switching drag mode and resizing do not reset the inspection view. Resizing keeps the current pose; Fit view recovers framing for the new aspect ratio.

- Rotate / Pan chooses the primary drag or one-finger gesture. Pan moves the object across the screen without turning it. Right-drag also pans; two fingers combine pan and pinch zoom.
- Four arrows rotate by 12 degrees or pan by 9% of the shorter viewport dimension, according to the selected mode. Zoom buttons change the current distance by a factor of 1.1. Wheel/pinch and button zoom use the same camera rather than separate zoom state. Inspection distance is bounded to 0.18–24 normalized scene units; CAD dimensions are unchanged.
- Focus the model with Tab for arrow-key navigation, Shift+arrows to pan, +/− to zoom and F to fit. The shortcut explanation appears with keyboard focus and is associated with the model for assistive technology.
- Fit view frames the complete system at its current mechanism state and viewing direction. Front deliberately frames from the front. Reset restores the starting exterior/interior pose, closed fill lid, selection and Rotate mode. Repeated commands accumulate, and a manual gesture interrupts camera easing.
- Front/Reset transitions use the shortest spherical path around the target; they no longer cut through the target when returning from the rear. Component framing uses proportional padding; the horizontal fan has an underside inspection angle to expose its guard.
- Clicks on the door/latch and external fill lid keep their mechanism actions. Pointer movement and multi-pointer gestures suppress click selection, including when a drag ends outside the canvas.

The layout responds to the actual stage width. Wide stages have a component sidebar; narrow stages place controls and component descriptions below the canvas in a scrollable layout. Controls have 44px targets. Short expanded windows retain the recovery and mechanism controls. The focus trap includes the keyboard-focusable model and excludes disabled controls.

## Lighting

Five neutral studio reflection cards produce a broad satin gradient, side separation and controlled overhead/rim reflections. A 1024px shadowed key and weaker fill give nonmetal components additional depth. The reflection environment remains 256px, DPR remains capped at 1.5, and rendering is demand-driven. The exact forest gradient remains `radial-gradient(ellipse at 48% 38%, #2b4c42, #1b3932 73%)`.

A darker first experiment obscured parts and was rejected. A broad frontal second experiment restored readability; narrowing and offsetting the front reflection in the final pass improved the closed-door gradient without changing material authoring. No geometry, native sources, component identity or engineering claims changed. The unused whole-door-sweep bounds calculation was removed from loading; framing measures the requested pose when needed.

## Reproduction and verification

Run `npm.cmd run check`, `npm.cmd run check:full`, and (Node 22.6+) `node --experimental-strip-types --test scripts/verify-viewer-camera.mjs`.

Seven mathematical regressions cover full-box perspective fits at multiple aspect ratios, screen-space pan direction, interleaved and repeated relative commands, small-component framing, rear/front transition radius and yaw wrapping, requested door bounds/restoration, and consistent reset after lid movement.

Browser checks exercised manual orbit followed by button zoom, manual pan followed by zoom, vertical pan, mechanisms from a panned/oblique view, and reset after an open lid. Development-only camera diagnostics recorded the actual pose after gestures. Comparisons passed for unchanged direction/target during zoom, equal position/target translation during pan, no mechanism-driven camera change, and identical reset destination. Additional checks covered direct door/lid clicks, drag ending outside the canvas followed by a successful click, keyboard navigation, 0/150-degree slider limits, forward/reverse dialog focus wrap, Escape and launch-focus restoration.

Production-build responsive checks covered 390×844 and 1280×500 viewports. At 390px there was no horizontal overflow and measured buttons were at least 44×44px. Short-window Reset, door and exit controls remained within the viewport. A failed GLB download retained retry, poster and selectable HTML component descriptions while disabling camera controls.

Private evidence is in `moas-3d-lab/review/polish-*`: baseline and iteration images, browser camera comparisons, independent math/raycast review, responsive/failure captures and Vercel domain inspection. These local review artifacts are not public website assets.

Physical iOS/Android touch, memory and sustained GPU performance remain unmeasured. Reduced-motion branches are implemented and reviewed; the OS preference was not changed for this run. Mathematical regressions and desktop viewport tests do not substitute for physical-device tests. The added directional shadow pass has a GPU cost; prior timing numbers in the v32 note describe the prior lighting and must not be treated as measurements of this revision.

## Release boundary

Deliver on `codex/homepage-visual-prototype` through draft PR #42, unmerged. Before release, the Vercel project `muzick/molitron-web` showed only `molitron-web.vercel.app`, assigned to this Preview branch. Verify the public short URL anonymously after the automatic build. Do not alter `molitron.com`, `www.molitron.com`, their existing public site or domain/DNS/hosting settings. Their transition still requires explicit authorization.
