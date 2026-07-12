# Molitron.com — Phase 1 rebuild

Next.js (App Router) rebuild of [molitron.com](https://molitron.com): commercial kitchen pollution control and odor abatement (MOAS + EPFA).

## Stack

- **Next.js 16** + TypeScript + Tailwind CSS 4
- Static-friendly product/content pages with JSON-LD (Organization, LocalBusiness, Product, FAQ)
- Quote form API at `/api/quote` (optional Resend email delivery)
- Deploy target: **Vercel** (domain currently on Squarespace DNS)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, use `npm.cmd` if `npm` is blocked by the script execution policy. See [docs/development/local-development.md](docs/development/local-development.md) for the Codex local startup notes.

```bash
npm run build
npm start
```

## Quote form email

Without env vars, submissions are validated and **logged to the server console** (fine for local testing).

For production delivery to `scott@molitron.com`:

1. Create a [Resend](https://resend.com) account
2. Verify a sending domain (or use Resend test sender while developing)
3. Copy `.env.example` → `.env.local` and set:

```env
RESEND_API_KEY=re_...
QUOTE_TO_EMAIL=scott@molitron.com
QUOTE_FROM_EMAIL=Molitron Website <quotes@your-verified-domain.com>
```

## Phase 1 routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/products`, `/products/moas`, `/products/epfa` | Product line |
| `/solutions/*` | Restaurants, airports/hospitality, cannabis |
| `/codes-compliance` | Educational compliance hub |
| `/about` | Company + Scott Airhart |
| `/contact` | Quote request form |
| `/service-parts` | Service / parts stub |
| `/sitemap.xml`, `/robots.txt` | SEO |

## DNS cutover (Squarespace → Vercel)

1. Deploy this repo to Vercel and note the deployment URL
2. In Squarespace DNS for `molitron.com`, add records Vercel provides (usually A/CNAME)
3. Keep WordPress live until cutover is verified
4. Set up Google Search Console + GA4 on the new domain after go-live

## Content notes

- Active products only: **MOAS** and **EPFA**
- **Enviro-Clean Air Scrubber** is discontinued (stated on site)
- Photos from the legacy site can be added under `public/` in a later pass
- Case studies and quote configurator wizard are Phase 2

## Contact (site config)

Edit `src/lib/site.ts` for phone, address, email, and navigation.
