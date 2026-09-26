# MOAS owner overview — September 19, 2026

Integrated the user's supplied `D:/Fusion/Video Walkthrough/MOAS Overview/MOAS Video Walkthrough.mp4` into the forest-green staging build on `codex/homepage-visual-prototype`, continuing PR #42.

- A dedicated forest-green video section follows the planning overview and precedes the 3D explorer. Hero and section-navigation links lead directly to it.
- Native video controls support inline mobile playback, seeking and fullscreen. `preload="none"` and an extracted WebP poster avoid downloading the movie before the visitor plays it. A separate video link is available below the player.
- Website derivative: 1920×1080 H.264, 30 fps, AAC audio, 140 seconds, approximately 36 MB (source approximately 84 MB). FFmpeg CRF 24, medium preset, 128 kbps AAC, faststart metadata. The source file is unchanged.
- The source has a burned-in “INTERNAL REVIEW · AUDIO PENDING” label. It is preserved pending the user's optional preference. No caption file was supplied; no speech transcript is invented.
- `npm run check` passed. Desktop layout reviewed locally; deployed playback and anonymous access must also be verified.

## Publication boundary

The user explicitly requested a publicly accessible Vercel link without account creation. The target is the newer forest-green branch deployment, not the older production build at `molitron-web.vercel.app`. Domain assignments were inspected in Vercel: the project's configured production domain is only `molitron-web.vercel.app`; the new build's branch alias is `molitron-web-git-codex-homepage-visual-prototype-muzick.vercel.app`.

`molitron.com`, `www.molitron.com`, and their existing public site remain frozen. No DNS, domain assignment, existing public-site changes, production merge or promotion is part of this update. Preserve unrelated edits to AGENTS.md, deployment guidance, and the earlier prototype checkout.
