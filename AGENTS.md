# AGENTS.md

TanStack Start (React 19, SSR) portfolio app. Bun + Vite + Tailwind v4. Deployed as a Nitro Node server.

## Commands

Bun is the package manager and runtime. Scripts are run with the `--bun` flag (uses Bun, not Node):

- `bun --bun run dev` — dev server on port 3000
- `bun --bun run build` — production build (Nitro output in `.output/`)
- `bun --bun run test` — Vitest (jsdom). Single file: `bun --bun vitest run path/to/file`
- `bun --bun run lint` — ESLint. `bun --bun run format` runs prettier --write then eslint --fix
- `bun --bun run check` — prettier --check ONLY (does not typecheck or lint)
- `bun --bun run generate-routes` — `tsr generate`, regenerates `src/routeTree.gen.ts`

There is no typecheck script; run `bunx tsc --noEmit` if you need one.

## Routing & generated code

- File-based routing in `src/routes/`. Adding/moving a route file regenerates `src/routeTree.gen.ts` automatically during dev/build, or run `generate-routes` manually. Never hand-edit `routeTree.gen.ts`.
- Root layout: `src/routes/__root.tsx` (`shellComponent` renders the full `<html>` document; this is SSR, no separate index.html).
- Router setup with TanStack Query SSR integration lives in `src/router.tsx`; query client context comes from `src/integrations/tanstack-query/root-provider.tsx`.

## Imports & aliases

Two aliases both map to `src/`: `@/*` and `#/*` (see tsconfig + package.json `imports`). Existing code mixes them; `@/` is used by components.

## Components

shadcn-based. `components.json` defines two sources:
- `src/components/ui/` — shadcn (style `radix-nova`, base color neutral)
- `src/components/retroui/` — components from the `@retroui` registry (https://retroui.dev)

UI primitives use `@base-ui/react` and `radix-ui`; icons use `lucide-react`. Compose classNames with `cn()` from `@/lib/utils` (clsx + tailwind-merge) and `cva` for variants.

## Style

Prettier: no semicolons, single quotes, trailing commas `all`. Match this in all new code.
ESLint extends `@tanstack/eslint-config` with these rules disabled: `import/no-cycle`, `import/order`, `sort-imports`, `@typescript-eslint/array-type`, `@typescript-eslint/require-await`, `pnpm/json-enforce-catalog`.

## Notes

- `nitro` is pinned to `nitro-nightly`; Vite externalizes `@sentry/*` in the Nitro rollup config.
- Many `@tanstack/*` deps use `latest` — versions can drift between installs.
- `demo`-prefixed files (if present) are starter scaffolding and safe to delete.
