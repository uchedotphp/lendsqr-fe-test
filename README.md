# Lendsqr Frontend Engineer Assessment

This repository contains my implementation of the [Lendsqr Frontend Engineer Assessment V2](https://docs.google.com/document/d/e/2PACX-1vQ5YKfvm86OxmpiboMOpLO1V7RmKNYJX87W9zWME6Y647gywVHVEayaMRznCc6vLO95mPKD5WunVSi2/pub).

The app is built with a fullstack Next.js setup using TypeScript and SCSS, with local JSON-backed API routes for predictable mock data.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- SCSS Modules (BEM-style class naming)
- Zustand (client state management)
- TanStack Query + Axios (server state + API calls)
- Zod + React Hook Form (validation and form handling)
- Vitest + Testing Library (unit tests)
- Biome (lint/format)

## Implemented Pages

- `/login`
- `/dashboard`
- `/users`
- `/users/[id]`

## Features Delivered

- Authentication flow with protected dashboard routes.
- Users page with:
  - KPI cards
  - filterable/sortable table UI
  - row actions (activate/deactivate, blacklist/unban)
  - paginated view
- User details page with:
  - top header actions wired to status endpoints
  - summary panel and tabbed details layout
  - reusable shared components
- Dashboard page with:
  - KPI cards
  - quick action cards
  - recent activities panel with status chips
- Toast feedback for action success/failure states.
- Mobile-responsive layouts across implemented pages.

## Mock Backend Structure

Mock data is stored in repository JSON files and served through Next.js route handlers:

- `app/_lib/server/data/users-db.json`
- `app/_lib/server/data/dashboard-db.json`
- `app/_lib/server/users-repository.ts`
- `app/_lib/server/dashboard-repository.ts`

Primary API routes:

- `GET /api/users`
- `GET /api/users/kpis`
- `GET /api/users/[id]`
- `GET /api/users/[id]/details`
- `PATCH /api/users/[id]/blacklist`
- `PATCH /api/users/[id]/activate`
- `GET /api/dashboard`

## Local Development

### Prerequisites

- Node.js 18.17+ (or newer)
- pnpm

### Install and Run

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Demo Login

- Email: `admin@lendsqr.com`
- Password: `Lendsqr123`

## Quality Commands

```bash
pnpm lint
pnpm format
pnpm test
pnpm build
```

## Architecture Notes

- UI components are split into small, focused units to keep pages maintainable.
- Server data access is centralized with repository modules (DRY/KISS).
- Page-level data hooks hydrate Zustand stores so deeply nested components can read shared state without prop drilling.
- User status mutations update both server data and client cache/store for immediate UI consistency.

## Assessment Mapping Notes

- Required pages are implemented (`/login`, `/dashboard`, `/users`, `/users/[id]`).
- TypeScript and SCSS are used throughout, as required.
- Mock APIs are implemented using local route handlers and JSON fixtures.
- Responsive behavior is implemented for desktop and mobile breakpoints.

## Submission Fields

Update these before final submission:

- Live URL: https://uchechukwu-prince-nwulu-lendsqr-fe-test.vercel.app
- Public repository URL: https://github.com/uchedotphp/lendsqr-fe-test
- Loom video URL: https://www.loom.com/share/bfdab297bcad41949336c31ea7baf3b7
