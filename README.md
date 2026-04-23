# Lendsqr Frontend Assessment

A feature-first Next.js 16 implementation for the Lendsqr frontend challenge, built with TypeScript, SCSS modules (BEM naming), Zustand, Zod, Axios, and TanStack Query.

## Stack

- Next.js 16 + React 19 + TypeScript
- SCSS modules (mobile-first, BEM)
- Zustand (auth and selected-user persistence)
- Zod (form schema and validation)
- Axios + TanStack Query (API data access and caching)
- Vitest (positive/negative unit tests)

## Implemented pages

- `\/login`
- `\/dashboard`
- `\/users`
- `\/users\/[id]`

## Mock auth credentials

- Email: `admin@lendsqr.com`
- Password: `Lendsqr123`

## Users API

By default the app reads users from:

- `https://randomuser.me/api/?results=500`

Override with:

```bash
NEXT_PUBLIC_USERS_API_URL=<your-endpoint>
```

## Getting started

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm lint
pnpm test
```
