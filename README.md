# SnapAPI ⚡

> Paste any JSON schema → get a live, documented REST API in seconds.

![SnapAPI Demo](https://via.placeholder.com/800x400/0a0a0f/00ff88?text=SnapAPI+Demo+GIF)

## Why I Built This

Every time I start a new frontend project, I waste 20–30 minutes setting up a mock API server just so I can fetch *something*. Tools like json-server are clunky to configure, and hosted solutions lock features behind paywalls. I wanted a dead-simple SaaS that lets anyone paste a JSON object and immediately get shareable, hittable REST endpoints — no setup, no config files, no nonsense.

## Live Demo

🔗 **[snapapi.dev](https://snapapi.dev)** *(coming soon)*

## Features

- **Instant API generation** — paste JSON, get 5 REST endpoints immediately
- **Live mock server** — endpoints actually respond with data (in-memory, resets on redeploy)
- **Auto-generated docs** — each endpoint shows method, path, and sample response
- **Copy URL** — one-click copy to paste into Postman, frontend fetch calls, etc.
- **Freemium model** — free tier for side projects, Pro tier for teams

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| API Routes | Next.js Route Handlers |
| Font | JetBrains Mono |
| Deployment | Vercel |

## Getting Started

```bash
git clone https://github.com/yourusername/snapapi
cd snapapi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. User pastes a JSON schema into the editor
2. They name their resource (e.g. `users`, `products`)
3. `generateEndpoints()` creates 5 standard REST endpoints (GET all, GET by ID, POST, PUT, DELETE)
4. The Next.js API route `/api/mock/[resource]` handles actual requests using an in-memory store
5. Endpoints are rendered as interactive cards with copy-URL and preview functionality

## API Reference

All mock APIs are served under:
```
https://snapapi.dev/mock/{resource}
https://snapapi.dev/mock/{resource}/:id
```

Supported methods: `GET`, `POST`, `PUT`, `DELETE`

## Roadmap

- [ ] Persistent storage (Redis or PlanetScale)
- [ ] Auth tokens per API
- [ ] Swagger/OpenAPI export
- [ ] Custom response delays (simulate latency)
- [ ] Webhook support
- [ ] Team workspaces

## Business Model

| Plan | Price | Limits |
|------|-------|--------|
| Free | $0/mo | 3 APIs, 1k req/mo |
| Pro | $12/mo | Unlimited APIs, 100k req/mo, custom domain |
| Team | $49/mo | Everything in Pro + team seats + SSO |

Target market: frontend developers, QA engineers, bootcamp students, and indie hackers building MVPs.

## License

MIT
