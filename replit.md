# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **`artifacts/growthpulse`** (web, slug `growthpulse`, served at `/`) — GrowthPulse Pro, a social media management dashboard migrated from a Next.js 15 / Vercel project. Now React + Vite + wouter routing + Tailwind v4 + shadcn UI + Firebase Auth (client-only). The original `next/link`, `next/image`, `next/navigation`, `next/script` imports are routed through local shims under `src/lib/next-shims/`. Genkit AI flows under `src/ai/flows/` use a stub `ai/genkit.ts` that returns schema-aware mock data so all UI works without server-side AI keys.
- **`artifacts/api-server`** (api) — Express scaffold (not used by growthpulse).
- **`artifacts/mockup-sandbox`** (design) — Component preview sandbox.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
