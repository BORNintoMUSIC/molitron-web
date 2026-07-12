# Local Development

Use the npm lockfile and run local commands from the project root:

```powershell
cd D:\Development\Projects\molitron-web
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`.

Use `npm.cmd` in PowerShell if `npm` is blocked by the Windows script execution policy.

## App Router Location

The active Next.js App Router lives in `src/app`. Do not create an empty root-level `app` folder; Next may treat it as the app directory and serve 404s instead of the `src/app` routes.

## Fonts

The site uses local Fontsource packages for Source Sans 3 and Source Serif 4, loaded through `next/font/local` in `src/app/layout.tsx`. This keeps local development and builds from depending on live Google Fonts requests.

## Common Checks

```powershell
npm.cmd run lint
npm.cmd run build
```
