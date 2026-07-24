# Branch Workflow

`main` is the repository's single long-lived branch and the source of production deployments. Normal work uses one short-lived branch, one pull request to `main`, and one Vercel preview before merge.

## Branches

- `main`: reviewed, production-ready, and deployable.
- `feature/*`: user-facing or internal functionality.
- `fix/*`: defect corrections, including urgent fixes unless a different path is explicitly approved.
- `docs/*`: documentation-only work.
- `chore/*`: maintenance, tooling, cleanup, or dependency work.

Create every new short-lived branch from the latest `main`. Keep it focused and delete or archive it only after its work is safely merged and branch removal is separately authorized.

## Normal Flow

1. Update local `main` and create a short-lived branch.
2. Edit and preview locally.
3. Run `npm.cmd run check`, review the diff, then commit and push once.
4. Open one pull request from the short-lived branch to `main`.
5. Let the Vercel preview run `npm run check:full`; review its checks and visible preview.
6. Merge only after the change and preview are approved. The resulting `main` deployment is production.

Do not push directly to `main` for routine work. Preserve review and required deployment checks on `main`; changes to remote protections require explicit approval.

## Local Commands

```powershell
git switch main
git pull origin main
git switch -c feature/example-name
```

Use `fix/`, `docs/`, or `chore/` instead when one of those scopes fits better.

## `develop` Transition

`develop` is no longer the starting point or PR target for new work. Keep the existing remote branch intact while outstanding branches or records are checked. Reconcile or retarget any remaining work deliberately; do not delete `develop` as part of routine cleanup.
