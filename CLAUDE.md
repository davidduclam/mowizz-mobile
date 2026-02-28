# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start           # Start Expo dev server
npm run ios         # Open iOS simulator
npm run android     # Open Android emulator
npm run lint        # Run ESLint via Expo
npm test            # Run all Jest tests
npx jest src/features/movies/api/index.test.ts  # Run a single test file
```

Set `EXPO_PUBLIC_API_BASE_URL` in a `.env` file before starting (required for dev; production falls back to `http://localhost:8080`).

## Architecture

**File-based routing** via `expo-router`. All routes live under `app/`, feature logic lives under `src/features/`.

**Route groups:**
- `app/(tabs)/` — Home and Search tabs using `expo-router/unstable-native-tabs` (`NativeTabs`)
- `app/(modals)/` — Movie and TV show detail screens presented as transparent fade modals
- `app/(tabs)/search/` — Search stack with a native header search bar wired to `SearchContext`

**Feature modules** under `src/features/<feature>/` each contain:
- `api/index.ts` — raw `fetch` calls against `API_BASE_URL`
- `hooks/` — stateful hooks that call the API and manage loading/error state (no external data-fetching library; uses `useEffect` + `useState`)
- `components/` — UI components (cards, context providers)
- `types.ts` — TypeScript types for that feature

**Shared:** `src/shared/api/index.ts` exports `API_BASE_URL` (from `EXPO_PUBLIC_API_BASE_URL` in dev).

**Path aliases** (configured in `tsconfig.json`):
- `@app/*` → `app/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`

**Styling:** NativeWind (Tailwind utility classes for React Native). Global CSS at `app/globals.css`.

**Search state** is stored in `SearchContext` (provided at the root layout) so the search bar in the navigation header (defined in the layout) can communicate with `SearchScreen`.

**Testing:** Jest with `jest-expo` preset. Tests mock `globalThis.fetch` directly — no mock libraries. Tests live alongside source as `*.test.ts`.
