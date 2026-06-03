import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env for the CLI. Use Node's built-in loader so
// `DATABASE_URL` is present for migrate/generate; ignore if already in the env
// (e.g. inside Docker, where compose injects it).
try {
  process.loadEnvFile();
} catch {
  // .env not found — assume the variable is set in the environment.
}

// Prisma 7 reads CLI configuration from here. Read the URL lazily via
// process.env (not Prisma's `env()` helper, which throws at config-load time
// when the var is missing) so `prisma generate` still runs during the Vercel
// build — where DATABASE_URL only exists at runtime. migrate/deploy resolve it
// when it's set.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
