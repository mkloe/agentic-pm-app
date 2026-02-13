# Agentic PM App - Technical Documentation

A modern project management application built with Next.js 16 and React 19. Features Kanban boards with drag-and-drop, backlog management with filters, analytics dashboards, and team views. Uses a local JSON file as a database for zero-config setup.

## Table of Contents

| Document | Description |
|----------|-------------|
| [Architecture](./architecture.md) | System architecture, tech stack, project structure, and data flow |
| [Data Models](./data-models.md) | TypeScript types, database schema, and entity relationships |
| [API Reference](./api-reference.md) | All REST endpoints with request/response formats |
| [Components](./components.md) | UI component tree, layout system, and key interactive components |
| [Database Layer](./database-layer.md) | Storage engine, CRUD operations, and seed data |
| [Getting Started](./getting-started.md) | Setup, development workflow, and available scripts |

## Quick Start

```bash
pnpm install
pnpm seed       # populate db.json with sample data
pnpm dev        # start dev server at http://localhost:3000
```
