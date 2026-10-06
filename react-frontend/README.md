# Maybank Full Stack Assessment — Place Finder

A React application for finding places with Google Places Autocomplete and viewing the selected location on Google Maps. The application also keeps a Redux-backed list of places searched during the current session.

## Features

- Search for places with Google Places Autocomplete.
- View the selected place on Google Maps.
- Review searches made during the current session.
- Manage search state with Redux Toolkit and Redux Thunk.

Search history is held in memory and resets when the page is refreshed.

## Technology

- React and JavaScript (ES modules)
- Vite
- Redux Toolkit and React Redux
- Redux Thunk
- `@vis.gl/react-google-maps`
- Google Places and Maps JavaScript APIs

## Requirements

- Node.js and npm
- A Google Maps Demo Key suitable for the APIs used by this assessment application

## Setup

The Google Maps key is read from `VITE_GOOGLE_MAPS_API_KEY`. Create a `.env.local` file in the project root and add your own key:

```dotenv
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_demo_key
```

Do not commit `.env.local` or share a key assigned to you. The evaluator should supply their own Google Maps Demo Key in their local `.env.local` file. This key is used by the browser-based Maps integration; it should not be treated as a server-side secret or reused for production.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available scripts

```bash
npm run dev    # Start the Vite development server
npm run build  # Create a production build
npm run lint   # Run ESLint
```

## Preview the production build

Build the app, then preview the generated production build locally:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/   # Place search and map interface components
└── store/        # Redux store and search state
```

The application entry point and other Vite configuration files are located at the project root.
