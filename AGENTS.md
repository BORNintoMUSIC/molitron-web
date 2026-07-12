<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Molitron Website Agent Guide

## Project Purpose

This repository powers the Molitron website rebuild. The site should be fast, AI-friendly, maintainable, SEO-focused, accessible, and grounded in verified company information.

## Technology Baseline

- Next.js App Router
- TypeScript
- Tailwind CSS when styling utility classes are already used by the project
- GitHub for source control
- Vercel for deployment when connected
- Local development under `D:\Development\Projects\molitron-web`

## Working Rules

- Inspect the existing project structure before changing files.
- Preserve current configuration unless a change is required and explained.
- Keep edits scoped to the requested task.
- Do not invent product specifications, engineering claims, certifications, dimensions, safety instructions, pricing, or performance numbers.
- Prefer reusable components and typed data over duplicated page-specific code.
- Use semantic HTML and accessible controls.
- Keep public-facing content professional, technically accurate, and easy to scan.

## SEO Rules

- Every indexable page should have a clear title and meta description.
- Use canonical URLs where applicable.
- Use structured data only when it accurately reflects visible page content.
- Product, documentation, and resource pages should expose useful HTML content instead of relying only on PDFs.
- Avoid placeholder SEO text and unverified keyword stuffing.

## Documentation Rules

- Keep internal planning and architecture notes in `docs/`.
- Keep public website content in `content/` or App Router routes according to the project pattern.
- Keep AI workflow notes in `AI/`.
- PDF documentation should have editable source material, revision dates, and clear filenames.

## Quality Checks

Before considering implementation complete, run the available project checks. Start with the scripts already defined in `package.json`.

Typical checks may include:

```powershell
npm run lint
npm run build
```

If the repository later moves to pnpm, update this section and use the package manager reflected by the lockfile.

## Git Safety

- Do not delete or revert user changes unless explicitly asked.
- Check `git status --short --branch` before and after meaningful edits.
- Keep unrelated work out of commits.
- Confirm remotes with `git remote -v` when repository location changes.

## Branch Workflow

- Keep `main` production-ready and deployable.
- Use `develop` as the staging and integration branch.
- Create short-lived branches from `develop` using `feature/*`, `fix/*`, `docs/*`, or `chore/*`.
- Use `hotfix/*` from `main` only for urgent production fixes, then merge the fix back into `develop`.
- Document workflow details in `docs/development/branch-workflow.md`.
