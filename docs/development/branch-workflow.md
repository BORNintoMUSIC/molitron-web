# Branch Workflow

This repository uses `main` for production-ready code and `develop` for staging and integration work.

## Long-Lived Branches

- `main`: production-ready branch. Keep it deployable, reviewed, and stable.
- `develop`: staging and integration branch. Merge completed work here before promoting it to `main`.

## Short-Lived Branches

Create short-lived branches from `develop` for normal work:

- `feature/*`: new user-facing or internal functionality.
- `fix/*`: bug fixes that are not urgent production hotfixes.
- `docs/*`: documentation-only changes.
- `chore/*`: maintenance, tooling, cleanup, or dependency work.

Create `hotfix/*` branches from `main` only when production needs an urgent fix. After a hotfix reaches `main`, merge the same fix back into `develop`.

## Flow

1. Start new planned work from the latest `develop`.
2. Keep each branch focused on one purpose.
3. Open a pull request back into `develop` for review and integration.
4. Promote `develop` to `main` only when the integrated state is ready for production.
5. Keep `main` and `develop` protected from unrelated or experimental changes.

## Local Commands

```powershell
git switch main
git pull origin main
git switch -c develop
git push -u origin develop
```

For normal work after `develop` exists:

```powershell
git switch develop
git pull origin develop
git switch -c feature/example-name
```
