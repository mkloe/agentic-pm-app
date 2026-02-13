# Getting Started

## Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

## Installation

```bash
pnpm install
```

## Seed the Database

Generate `data/db.json` with sample data (1 project, 5 team members, 6 labels, 18 tasks):

```bash
pnpm seed
```

## Development

```bash
pnpm dev        # Start dev server at http://localhost:3000
pnpm build      # Production build
pnpm start      # Run production build
pnpm lint       # Run ESLint
```

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start Next.js development server |
| `build` | `next build` | Create production build |
| `start` | `next start` | Run production server |
| `lint` | `eslint` | Run ESLint checks |
| `seed` | `tsx scripts/seed.ts` | Seed `data/db.json` with sample data |

## Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript config - strict mode, `@/*` path alias |
| `next.config.ts` | Next.js configuration (minimal/defaults) |
| `postcss.config.mjs` | PostCSS with Tailwind CSS plugin |
| `eslint.config.mjs` | ESLint with Next.js preset |

## Path Aliases

The `@/*` alias maps to the project root. Usage:

```typescript
import { getTasks } from "@/lib/db";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
```
