# syntax=docker/dockerfile:1

# ----- base (pnpm via corepack) -----
FROM node:24-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

# ----- dependencies -----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ----- build -----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# ----- runner: standalone output only, non-root -----
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
