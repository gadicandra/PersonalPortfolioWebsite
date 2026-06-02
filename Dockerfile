# syntax=docker/dockerfile:1

# ----- base (pnpm via corepack) -----
FROM node:24-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# openssl is needed by Prisma tooling on slim images
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
# Placeholder so `prisma generate` (build-time, no DB needed) can resolve the
# strict env() in prisma.config.ts. compose overrides this at runtime.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# ----- dependencies -----
FROM base AS deps
COPY package.json pnpm-lock.yaml prisma.config.ts ./
COPY prisma ./prisma
# Allowed build scripts (incl. prisma generate via postinstall) come from the
# `pnpm.onlyBuiltDependencies` allowlist in package.json.
RUN pnpm install --frozen-lockfile

# ----- build -----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# `build` runs `prisma generate && next build`
RUN pnpm run build

# ----- runner -----
FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
# Apply migrations, seed (idempotent upsert), then serve.
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm exec tsx prisma/seed.ts && pnpm start"]
