# Portfolio

[![status-badge](https://ci.grug.dev/api/badges/1/status.svg)](https://ci.grug.dev/repos/1)

My personal (overengineered) portfolio site

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, SSR) with [TanStack Router](https://tanstack.com/router) file-based routing and [TanStack Query](https://tanstack.com/query)
- **Runtime & tooling:** [Bun](https://bun.sh) + [Vite](https://vite.dev)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com), [shadcn](https://ui.shadcn.com) + [retroui](https://retroui.dev) components, [lucide](https://lucide.dev) icons
- **Forms & validation:** TanStack Form + [Zod](https://zod.dev), with [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) and email via [Nodemailer](https://nodemailer.com)
- **Analytics:** [Umami](https://umami.is)
- **Production server:** custom Bun server (`server.ts`) — the TanStack `start-bun` reference server
- **CI/CD:** [Woodpecker](https://woodpecker-ci.org) → Docker registry → [Dokploy](https://dokploy.com)

## Getting Started

Requires [Bun](https://bun.sh). Scripts use the `--bun` flag so they run on Bun rather than Node.

```bash
bun install
cp .env.example .env   # fill in values as needed
bun --bun run dev      # dev server on http://localhost:3000
```

### Scripts

```bash
bun --bun run dev      # dev server (port 3000)
bun --bun run build    # production build -> dist/
bun --bun run start    # run the production Bun server
bun --bun run lint     # ESLint
bun --bun run format   # prettier --write, then eslint --fix
bun --bun run check    # prettier --check only
```

## Building For Production

The build outputs the client to `dist/client` and the SSR handler to `dist/server/server.js`. The custom Bun server (`server.ts`) serves the static client and forwards dynamic requests to the SSR handler.

```bash
bun --bun run build
bun --bun run start    # serves on $PORT (default 3000)
```

## Hosting

### Docker Compose

Pull and run the published image:

```bash
docker compose up -d
```

Build and run locally instead:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### CI/CD

`.woodpecker.yml` defines the CI/CD pipeline. On every push and pull request it runs `lint`, `check`, and `tsc --noEmit`. On a push to `master` it builds and publishes the Docker image to the registry, then triggers a Dokploy redeploy.

## Configuration

Copy `.env.example` to `.env` and fill in the values. Additional env variables (`ASSET_PRELOAD_*`, `PORT`, etc.) are available at the top of `server.ts`.
