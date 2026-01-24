# MoWizz Mobile

MoWizz Mobile is an Expo + React Native app that surfaces popular, top-rated, and
upcoming movies from a backend API. The UI uses native tabs via `expo-router` and
Tailwind-style utility classes through NativeWind.

## Features

- Home screen with horizontal rails for popular, top-rated, and upcoming movies.
- Native tab navigation (Home + Search).
- Movie cards with posters, ratings, and release year.

## Tech Stack

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- [expo-router](https://expo.github.io/router/) for file-based navigation
- [NativeWind](https://www.nativewind.dev/) for Tailwind-style styling
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```
app/                # File-based routes (screens and layouts)
components/         # Reusable UI components (MovieCard, etc.)
services/           # API helpers and data hooks
types/              # Shared TypeScript types
assets/             # App icons and images
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

## Notes

- The movie API base URL is read from `EXPO_PUBLIC_API_BASE_URL` in development.
- The `Search` screen is currently a placeholder with a native search bar in the
  header and can be extended to wire up search queries.
