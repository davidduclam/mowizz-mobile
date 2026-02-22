# MoWizz Mobile

MoWizz Mobile is an Expo + React Native app that surfaces popular, top-rated, and
upcoming movies plus TV shows from a backend API. The UI uses native tabs via
`expo-router` and Tailwind-style utility classes through NativeWind.

## Features

- Discover home with horizontal rails for movies and TV shows.
- Native tab navigation (Home + Search).
- Search movies and TV shows from the Search tab.
- Movie and TV cards with posters, ratings, and year.
- Movie and TV details modals opened from card taps.
- List/details loading and error states, plus TV empty state handling.
- Search loading, empty, and inline error states.

## Tech Stack

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- [expo-router](https://expo.github.io/router/) for file-based navigation
- [NativeWind](https://www.nativewind.dev/) for Tailwind-style styling
- [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) and
  [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
  for overlay/scrim effects
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```
app/                          # File-based routes (screens and layouts)
  _layout.tsx                 # Root layout (providers)
  globals.css                 # Global styles
  (tabs)/                     # Tab routes (home, search)
    _layout.tsx               # Tabs layout
    index.tsx                 # Home tab route
    search/
      _layout.tsx             # Search stack layout (search bar)
      index.tsx               # Search tab route
  (modals)/                   # Modal routes (movie + TV details)
    _layout.tsx               # Modal presentation config
    movie/
      [id].tsx                # Movie detail modal
    tv-show/
      [id].tsx                # TV show detail modal
src/                          # Feature and shared source modules
  features/
    discover/
      screens/
        HomeScreen.tsx        # Discover home UI (movies + tv shows)
    movies/
      api/
        index.ts              # Movie API helpers
      components/
        MovieCard.tsx         # Movie card UI
      hooks/
        useMovieDetails.ts    # Single movie details hook
        useMovies.ts          # Movie lists hook
      types.ts                # Movie types
    tv-shows/
      api/
        index.ts              # TV show API helpers
        index.test.ts         # TV show API tests
      components/
        TvShowCard.tsx        # TV show card UI
      hooks/
        useTvShowDetails.ts   # Single TV show details hook
        useTvShows.ts         # TV show lists hook
      types.ts                # TV show types
    search/
      api/
        index.ts              # Search API helpers (multi search)
        index.test.ts         # Search API tests
      components/
        SearchContext.tsx     # Search context provider
      hooks/
        useSearch.ts          # Search hook
      screens/
        SearchScreen.tsx      # Search UI
      types.ts                # Search types
  shared/
    api/
      index.ts                # Shared API base URL
assets/                       # App icons and images
```

## Requirements

- Node.js 18+ (recommended)
- Expo CLI (installed automatically by `npx expo`)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables by creating a `.env` file and setting
   `EXPO_PUBLIC_API_BASE_URL` to your backend API URL.

3. Start the app:

   ```bash
   npm start
   ```

You can also launch specific platforms:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

- `npm start` — start the Expo dev server
- `npm run android` — open Android emulator
- `npm run ios` — open iOS simulator
- `npm run web` — start the web build
- `npm run lint` — run linting via Expo
- `npm test` — run Jest tests

## Notes

- The API base URL is read from `EXPO_PUBLIC_API_BASE_URL` in development.
- Search uses the backend multi-search endpoint (`/search/multi`) to return
  both movies and TV shows.
- Modal routes live under `app/(modals)/`.
