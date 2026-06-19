FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# VITE_* values are inlined into the client bundle at build time (public values)
ARG VITE_UMAMI_WEBSITE_ID
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID
ARG VITE_UMAMI_WEBSITE_URL
ENV VITE_UMAMI_WEBSITE_URL=$VITE_UMAMI_WEBSITE_URL
ARG VITE_UMAMI_PERFORMANCE_TRACKING
ENV VITE_UMAMI_PERFORMANCE_TRACKING=$VITE_UMAMI_PERFORMANCE_TRACKING
ARG VITE_TURNSTILE_SITE_KEY
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY
RUN bun --bun run build

FROM oven/bun:1-slim AS production
WORKDIR /app
ENV NODE_ENV=production

# Port the server listens on; defaults to 3000 when not provided
ARG PORT=3000
ENV PORT=$PORT

COPY --from=build /app/server.ts ./server.ts
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE ${PORT}

CMD ["bun", "run", "server.ts"]
