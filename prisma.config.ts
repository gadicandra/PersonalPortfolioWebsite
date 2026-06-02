import { defineConfig, env } from "prisma/config";

// Prisma 7 no longer auto-loads .env for the CLI. Use Node's built-in loader so
// `DATABASE_URL` is present for migrate/generate; ignore if already in the env
// (e.g. inside Docker, where compose injects it).
try {
  process.loadEnvFile();
} catch {
  // .env not found — assume the variable is set in the environment.
}

// Prisma 7 reads CLI configuration from here. The datasource URL is resolved
// from `env("DATABASE_URL")` declared in schema.prisma.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
