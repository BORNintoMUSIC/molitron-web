# MOAS video comparison — September 21, 2026

The user requested both MOAS overview videos in the existing product-page video section, with tabs labeled **Version 2.0** and **Version 3.0**, until they choose which film to retain.

- Route: `/products/moas#video-overview`.
- Version 2.0 keeps the existing `/videos/moas-overview.mp4?v=04`, poster and English captions unchanged. The internal v04 filenames predate the user-facing version labels.
- Version 3.0 uses `/videos/moas-overview-v3.mp4`, matching English captions and a poster from the completed native render. The 47,152,065-byte MP4 is copied without re-encoding from the approved Kitchen 4.4 production: 1920 × 1080, 30 fps, 112 seconds, all eight supplied narration takes.
- Version 3.0 is selected initially. Switching pauses playback and retains each video's position. Neither video autoplays or preloads its full media.
- Tabs support pointer selection, Left/Right arrows and Home/End, with selected states, panel associations and visible keyboard focus. Both videos retain native controls, captions, inline mobile playback and separate-video links.

MP4 SHA-256: `e7a76317e50ba9b13c2553b78df8df176c85fc29d35c16943a32f611387918e5`.

Local validation: `npm run check` passed. Both native 1080p videos played without media errors (123.3 and 112 seconds). Switching in either direction paused playback and retained each position. ArrowRight, Home and End selected and focused the expected tab. Desktop and 390-pixel phone layouts were reviewed; the inactive panel stays hidden.

Delivery follows the user's standing Vercel staging arrangement: PR #42 and `codex/homepage-visual-prototype`, serving `https://molitron-web.vercel.app`. Fresh Vercel Domains inspection confirmed that this project has only that domain, assigned to the same branch. Preserve its public access and branch mapping. No merge to main or infrastructure changes are needed for this comparison.

The existing public site, `molitron.com`, `www.molitron.com`, DNS, registrar, hosting and provider settings remain protected. This video request does not authorize a public-domain transition.
