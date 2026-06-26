# Civic Issue Reporting PWA

A React + TypeScript + Tailwind progressive web app for reporting civic issues such as road damage, water supply concerns, garbage collection problems, street lighting issues, and public safety reports. The application is designed to be simple, multilingual, and mobile-friendly so citizens can report problems quickly from a phone or desktop browser.

## Project Overview

This project was built as a take-home assignment to demonstrate a complete frontend flow for civic issue reporting. It focuses on:

- A clear three-step reporting experience
- Multilingual support for English and Marathi
- A polished mobile-first UI
- Progressive web app behavior for installation and offline readiness
- A simple local submission flow with a generated reference ID

## Features

- Multilingual interface with English and Marathi support
- Category-based issue selection
- Detailed issue description form
- Optional voice input for faster reporting
- Optional image upload support
- Confirmation screen with generated reference ID
- Local persistence of submitted reports in browser storage
- Progressive web app support

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React i18next
- React Icons
- Vite PWA Plugin

## Project Structure

```text
src/
  components/       # Reusable UI components
  i18n/             # Internationalization setup
  locals/           # Translation files
  pages/            # Route-level screens
  types/            # Shared TypeScript types
  utils/            # Helper utilities
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Design Decisions

- Mobile-first layout: the experience is optimized for small screens first, with responsive expansion for larger displays.
- Simple step-based flow: users move through a guided reporting journey instead of facing a long form immediately.
- Accessible interaction patterns: buttons, form controls, and language switching were designed to remain understandable and usable.
- Minimal but polished UI: the design avoids unnecessary complexity while aiming for a modern and trustworthy civic experience.
- Progressive enhancement: core functionality works without relying on advanced browser features, while optional enhancements such as voice input are added when available.

## Future Improvements

The current version is intentionally focused on the core reporting flow. Potential next steps include:

- Backend integration for persistent issue submission
- Real user authentication and role-based access
- Validation feedback with inline error states
- Improved file handling and image preview
- Better analytics and reporting dashboards
- More robust offline handling and caching strategies

## Known Limitations

- Voice input depends on browser support for speech recognition APIs.
- Image uploads are handled locally in the current UI flow and are not yet sent to a backend service.
- Submitted reports are stored in browser local storage for demo purposes.
- The app currently focuses on the frontend experience rather than full civic operations workflows.

## AI Usage Log

- 2026-06-26 — Refined the UI to improve clarity, spacing, typography, and overall polish for interview readiness.
- 2026-06-26 — Helped structure the multilingual flow and improve component consistency.
- 2026-06-26 — Drafted this README to present the project in a professional, submission-ready format.
