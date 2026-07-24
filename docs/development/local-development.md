# Local Development

Run commands from the repository or active worktree root. Install from the npm lockfile on first setup and after dependency changes:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. Use `npm.cmd` when the Windows PowerShell execution policy blocks the `npm` script shim.

## Validation

Use the fast check for ordinary code, copy, PDF, asset-reference, and customer-logo registry work:

```powershell
npm.cmd run check
```

It runs Next.js route type generation, TypeScript, scoped ESLint, and changed-site-content validation.

Use the full check after route or Next.js configuration changes, image-pipeline changes, dependency or deployment changes, for troubleshooting, or when intentionally verifying a release locally:

```powershell
npm.cmd run check:full
```

It lints, validates all public documents and asset references, and performs a production build. Vercel runs this command for preview and production deployments, so routine edits do not need to repeat it locally. Validation prints a concise result to the terminal; do not retain permanent check logs in the repository.

## App Router and Fonts

The active App Router lives in `src/app`. Do not create a root-level `app/` directory because it can conflict with the active route tree.

Source Sans 3 and Source Serif 4 are loaded from local Fontsource packages through `next/font/local` in `src/app/layout.tsx`; local development and builds do not require Google Fonts requests.
