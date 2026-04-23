# Project Build Guidelines

## Core Goal
- Build a pixel-faithful implementation of the Lendsqr assessment UI and flows.
- Prioritize clean architecture, semantic HTML, responsive behavior, and maintainable code.

## Mandatory Tech Stack
- Next.js App Router + TypeScript.
- SCSS Modules for styling.
- React Hook Form + Zod resolver for forms.
- Zustand for client state persistence.
- Axios + TanStack Query for API/data fetching and caching.
- Vitest for unit tests.

## Folder Architecture Rules
- Keep feature/module code inside `app` route groups, not in a `src/features` structure.
- Use route-group module boundaries:
  - `app/(auth)` for auth module code.
  - `app/(dashboard)` for dashboard module code.
  - `app/(dashboard)/users` for users module code.
- Module internals should live in local subfolders where applicable:
  - `_components/`, `_hooks/`, `_services/`, `styles/`.
- Shared cross-module code only goes into shared app-level folders:
  - `app/_components`
  - `app/_providers`
  - `app/_lib`
  - `app/_lib/server/data` (JSON fixtures/mock DB files for route handlers)
  - `app/styles`
- Do not reintroduce a feature-oriented `src/` architecture.

## UI Component Rules
- Use semantic HTML elements (`main`, `section`, `header`, `article`, `nav`, `table`, etc.).
- Use shared typography primitives:
  - `HeadingText` for `h1` to `h6`.
  - `BodyText` for paragraph/body text usage.
- Use the reusable `Button` component (shadcn-style API) instead of raw button duplication whenever possible.
- Prefer composition and reusable primitives over one-off UI implementations.

## Styling Rules
- SCSS Modules only for component/page styles.
- Follow BEM-style naming in SCSS module class selectors.
- Use design tokens from `app/styles/_tokens.scss`; avoid hardcoded duplicate values.
- Keep global style responsibilities split:
  - `app/styles/_tokens.scss` for design tokens.
  - `app/styles/_typography.scss` for typography utility classes.
  - `app/styles/globals.scss` for global resets/imports only.
- Mobile-first approach required.
- Keep desktop auth split layout intact while centering auth content on tablet/mobile.

## Form and Validation Rules
- All forms must use React Hook Form.
- Zod schemas must define and enforce validation rules.
- Integrate via `@hookform/resolvers/zod`.
- Keep error handling explicit for field-level and form-level errors.

## State and Data Rules
- Use Zustand for local persisted UI/business state (e.g., auth/session-selected entities).
- Use Axios for HTTP calls.
- Use TanStack Query hooks for server-state fetching/caching.
- Keep API mapping/adapters typed and close to the owning module.
- Route handlers must remain thin: delegate data loading/mapping/query logic to server modules in `app/_lib/server`.
- Mock DB payloads can be stored as JSON under `app/_lib/server/data` and accessed through a repository layer.
- Never let frontend components parse raw DB payload shapes directly; always return normalized, typed API envelopes.
- Keep route response envelopes explicit and stable (e.g., `{ users: [...] }`, `{ user: {...} }`, `{ kpis: [...] }`).

## Quality and Testing Rules
- Preserve strict TypeScript quality.
- Add/update tests when changing behavior in auth, users data mapping, or critical flows.
- Run and pass:
  - `pnpm format`
  - `pnpm lint`
  - `pnpm test`

## Consistency Rules
- Reuse existing patterns before introducing new patterns.
- Avoid duplicate logic/styles when a shared primitive/token already exists.
- Keep naming clear, consistent, and domain-aligned.
- Prefer small, focused changes over broad unrelated refactors.

## Git and Delivery Rules
- Make atomic, meaningful commits by phase after approval.
- Keep commit messages clear and purpose-driven.
- Do not include unrelated changes in a focused phase commit.
