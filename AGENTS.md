<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Molitron Website Agent Guide

## Purpose and Layout

This repository powers the Molitron website. Keep it fast, accessible, SEO-focused, maintainable, and grounded in verified company information.

- `src/app/`: Next.js App Router routes and API handlers. Do not create a root-level `app/` directory.
- `src/components/` and `src/lib/`: reusable UI, typed product/site data, claims, and asset registries.
- `public/`: approved public assets only.
- `docs/`: internal development, publishing, claims, SEO, and historical records.
- `AI/`: AI workflow notes that are still useful to the project.

## Normal Commands

Use the npm lockfile. On Windows PowerShell, use `npm.cmd` if the `npm` script shim is blocked.

```powershell
npm.cmd ci                 # first setup or after dependency changes
npm.cmd run dev            # local development
npm.cmd run check          # ordinary code, content, and PDF changes
npm.cmd run check:full     # structural changes or intentional local release verification
```

`check` generates Next.js route types, runs TypeScript and ESLint, and validates changed site content. `check:full` validates all public documents and performs a production build; Vercel runs it for previews and production. Do not create permanent check logs in the repository.

## Working Rules

- Inspect the current structure and `git status --short --branch` before changing files.
- Preserve user work and current configuration unless a scoped change requires otherwise.
- Do not invent product specifications, engineering claims, certifications, dimensions, safety instructions, pricing, performance numbers, lead times, or project timing.
- Check public claims against `docs/content/claims-register.md` and the current approved source record.
- Prefer reusable components and typed data over duplicated page-specific code.
- Use semantic HTML, accessible controls, useful alternative text, and visible focus states.
- Give each indexable page a clear title, meta description, canonical URL where applicable, and useful HTML content. Structured data must match visible content.

## Customer Logos

- Register published logos in `src/lib/customer-logos.ts` and store only approved, optimized derivatives in `public/images/previous-customers/optimized/`.
- Keep raw logo source folders outside `public/`; the normal image optimizer intentionally skips the approved logo derivatives.
- Preserve accessible customer names when a logo replaces visible text.
- Customer history may be stated, but never imply endorsement, sponsorship, or a current commercial relationship.

## PDF Publishing Boundary

- Author or revise technical documents through the controlled one-document workflow under `docs/PDF_Rebuild/` when that source project is present.
- Put only an approved website copy in `public/docs/`; private certification records and working artifacts are never publication assets.
- Follow `docs/publishing/pdf-publishing.md` for stable filenames, HTML companions, indexing, redirects, approval, and validation.
- Do not treat archived pre-controlled drafts as source authority.

## Git, Branches, and Deployment

- Do not delete, revert, move, or overwrite unrelated user changes.
- Review `git diff` and keep unrelated files out of commits.
- Never place credentials or tokens in the repository or command output.
- Use the configured Git remote normally. Do not run preventive `gh auth login`, `gh auth refresh`, or similar credential-changing commands.
- Treat `main` as the single long-lived branch. Create short-lived branches from `main` and open one pull request back to `main`, following `docs/development/branch-workflow.md`.
- Preserve review and required deployment checks on `main`. Do not revise remote protections or the promotion flow without user approval.
- Follow `docs/deployment/README.md` for Vercel and environment guidance. Vercel previews are the staging surface and run the full validation command.
