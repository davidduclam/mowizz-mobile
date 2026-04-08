<p align="center">
  <img width="200" height="200" src="https://github.com/user-attachments/assets/c29cc9f9-bd63-4f9d-a490-cdd8ba895886" />
</p>

<h1 align="center">MoWizz</h1>

MoWizz Mobile is an Expo + React Native app that surfaces popular, top-rated, and
upcoming movies plus TV shows from a backend API. The UI uses native tabs via
`expo-router` and Tailwind-style utility classes through NativeWind.

https://github.com/user-attachments/assets/56a2eb35-3ab5-446e-92c0-83ac1f64ff3c

## Features

- Discover home with a full-screen parallax hero carousel for popular movies, plus horizontal rails for upcoming, top-rated movies, and TV shows.
- Native tab navigation (Home, Search, Watchlist).
- Search movies and TV shows from the Search tab.
- Movie and TV cards with posters, ratings, and year.
- Movie and TV details modals opened from card taps.
- Save and remove movies and TV shows to/from a personal watchlist from the detail modal.
- Watchlist tab displaying all saved items, with loading, error, and empty states.
- List/details loading and error states, plus TV empty state handling.
- Search loading, empty, and inline error states.

## Tech Stack

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- [expo-router](https://expo.github.io/router/) for file-based navigation
- [NativeWind](https://www.nativewind.dev/) for Tailwind-style styling
- [react-native-reanimated-carousel](https://github.com/dohooo/react-native-reanimated-carousel) for the hero carousel
- [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) and
  [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
  for overlay/scrim effects
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```
app/                          # File-based routes (screens and layouts)
  _layout.tsx                 # Root layout (providers)
  globals.css                 # Global styles
  (tabs)/                     # Tab routes (home, search, watchlist)
    _layout.tsx               # Tabs layout
    index.tsx                 # Home tab route
    search/
      _layout.tsx             # Search stack layout (search bar)
      index.tsx               # Search tab route
    watchlist/
      _layout.tsx             # Watchlist stack layout
      index.tsx               # Watchlist tab route
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
        index.test.ts         # Movie API tests
      components/
        MovieCard.tsx                 # Movie card UI (horizontal rail)
        MoviePosterCard.tsx           # Full-screen poster card for the hero carousel
        MoviePosterCardWatchlist.tsx  # Poster card for the watchlist grid
      hooks/
        useMovieDetails.ts    # Single movie details hook
        useMovies.ts          # Movie lists hook
      types.ts                # Movie types
    tv-shows/
      api/
        index.ts              # TV show API helpers
        index.test.ts         # TV show API tests
      components/
        TvShowCard.tsx                 # TV show card UI
        TvShowPosterCardWatchlist.tsx  # Poster card for the watchlist grid
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
    watchlist/
      api/
        index.ts              # Watchlist API helpers
      components/
        WatchlistContext.tsx  # Watchlist context provider
      screens/
        WatchlistScreen.tsx   # Watchlist UI
      types.ts                # Watchlist types
  shared/
    api/
      index.ts                # Shared API base URL
      tmdb.ts                 # TMDB image URL helper (getPosterUrl)
    components/
      MediaDetailModal.tsx    # Shared detail modal (movie + TV show)
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
- The watchlist uses a single hardcoded user (no authentication); the user ID is set in `src/features/watchlist/api/index.ts`.
