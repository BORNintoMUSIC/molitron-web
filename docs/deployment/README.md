# Deployment

Vercel is the website deployment target. The checked-in `vercel.json` uses `npm ci` for deterministic lockfile installs and `npm run check:full` for linting, complete public-content validation, TypeScript/build validation, and the production build.

The expected project configuration is:

- `main` is the production branch.
- Pull requests and short-lived branches receive preview deployments.
- A successful preview does not become production until its pull request is approved and merged.

Branch deployment assignments, domain ownership, DNS records, GitHub protections, and Vercel project linkage live in the external services rather than this repository. Confirm them in those services when changing infrastructure.

## Release Flow

1. Follow the [single-PR branch workflow](../development/branch-workflow.md).
2. For routine work, run `npm.cmd run check`, review the diff, commit, and push once.
3. Open a pull request to `main`. Vercel installs with `npm ci`, runs the full check, and creates the preview.
4. Review the changed routes, public documents, redirects, headers, environment-variable needs, check result, and visible preview.
5. Merge after approval. Vercel deploys the resulting `main` commit to production.
6. Verify the primary routes, quote form behavior, stable PDF URLs, redirects, sitemap, and robots response.

Run `npm.cmd run check:full` locally for structural or deployment changes, to diagnose a remote failure, or when an intentional extra release check is warranted. It is not required before every routine push because the Vercel preview is the comprehensive gate.

## Environment Variables

The quote API recognizes:

- `RESEND_API_KEY`: enables email delivery
- `QUOTE_TO_EMAIL`: optional destination override; otherwise the configured site email is used
- `QUOTE_FROM_EMAIL`: optional verified sender override

Store production values in Vercel environment settings. Keep local values in untracked environment files and never commit or print secrets.

## Preview and Rollback

- Use the pull request's preview URL to validate visible pages and document links before merge.
- Keep stable public PDF paths when replacing an approved revision so existing links and redirects continue to work.
- If production regresses, use Vercel's deployment history to restore the last known-good deployment, then fix forward through a short-lived branch and pull request to `main`.
- Local Git operations use the repository's configured remote; deployment work does not require preventive GitHub CLI authentication changes.

Confirm the current domain, DNS, production-branch, and protection state in the provider dashboards at release time; do not rely on historical planning notes for live infrastructure state.
