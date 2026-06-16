FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Umami analytics ID is inlined into the bundle at build time (public value)
ARG VITE_UMAMI_WEBSITE_ID
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID
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
