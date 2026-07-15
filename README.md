# Molitron Website

Next.js App Router website for Molitron's commercial kitchen pollution-control and odor-abatement products, documentation, service resources, and quote requests.

## Stack

- Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- Static-friendly product and application pages with accurate metadata and structured data
- Quote request API with optional Resend delivery
- Vercel deployment target

## Local Development

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. Use `npm.cmd` in PowerShell if the `npm` shim is blocked by the execution policy.

For ordinary work, run the fast validation path:

```powershell
npm.cmd run check
```

For structural or deployment changes, troubleshooting, or intentional local release verification, run:

```powershell
npm.cmd run check:full
```

See [local development](docs/development/local-development.md) for details.

Normal delivery uses one short-lived branch from `main`, one pull request back to `main`, and a Vercel preview that runs the full check before production merge.

## Site Map

| Path | Purpose |
|---|---|
| `/` | Company and product overview |
| `/products`, `/products/moas`, `/products/epfa` | Active products |
| `/products/moas/installation-planning` | MOAS planning-guide HTML companion |
| `/products/epfa/operation-maintenance` | EPFA manual HTML companion |
| `/solutions/*` | Restaurant, airport/hospitality, and cannabis applications |
| `/codes-compliance` | Educational compliance hub |
| `/about` | Company history and leadership |
| `/contact` | Quote request form |
| `/service-parts` | Service, parts, and discontinued Enviro-Clean resources |
| `/sitemap.xml`, `/robots.txt` | Search-engine discovery controls |

MOAS and EPFA are active products. Enviro-Clean Air Scrubber material is retained only for legacy service. Follow the [PDF publishing guide](docs/publishing/pdf-publishing.md) before replacing or adding a public document.

## Quote Form Email

Without `RESEND_API_KEY`, local submissions are validated and a limited diagnostic is written to the development server console. Create an untracked `.env.local` to test delivery:

```env
RESEND_API_KEY=re_...
QUOTE_TO_EMAIL=cleanair@molitron.com
QUOTE_FROM_EMAIL=Molitron Website <quotes@your-verified-domain.com>
```

The sending domain must be configured with the email provider before production use. Never commit environment files or credentials.

## Project References

- Site identity and navigation: `src/lib/site.ts`
- Approved public claims: `docs/content/claims-register.md`
- Branch workflow: `docs/development/branch-workflow.md`
- Deployment: `docs/deployment/README.md`
- Internal documentation index: `docs/README.md`
