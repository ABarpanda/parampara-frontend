# Parampara — Frontend

Parampara is a community-driven platform to preserve and share family rituals, stories, and traditions. The frontend (this repository) is a React + Vite application that provides pages for browsing, creating, and managing rituals, along with informational pages (About, Privacy, T&Cs, FAQ, Guidelines).

---

## Table of contents

- [Project objective](#project-objective)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run (development)](#run-development)
  - [Build & preview](#build--preview)
- [Project structure (high level)](#project-structure-high-level)
- [Routes & key pages](#routes--key-pages)
- [Environment / API](#environment--api)
- [Contributing](#contributing)
- [Contact & support](#contact--support)
- [Notes about repository scan](#notes-about-repository-scan)

---

## Project objective

Parampara exists to honor and preserve intergenerational knowledge — family rituals, stories, and traditions — by providing a living archive where users can document and share cultural practices. The About Us page emphasizes safeguarding living knowledge, connecting generations, and preserving cultural diversity. The Privacy Policy stresses minimal personal data collection, data security, and user rights.

Key goals:

- Provide an accessible place to record rituals and oral traditions
- Encourage community contributions and discovery
- Respect user privacy and give users control over their data

---

## Features

- Browse and explore community-submitted rituals
- Create, edit, and delete your own rituals (authenticated)
- User authentication and profile management
- Ritual detail pages with metadata (location, date, author, media)
- Informational pages: About, Privacy Policy, Terms & Conditions, FAQ, Community Guidelines
- Mobile-friendly UI (Tailwind CSS)
- Icons via lucide-react

---

## Tech stack

- React 18
- Vite (dev server + build)
- Tailwind CSS for styling
- react-router-dom for client routing
- Axios for API requests
- lucide-react for icons
- Dev tooling: ESLint, PostCSS, Autoprefixer

(See package.json for exact versions.)

---

## Getting started

### Prerequisites

- Node.js (recommended 18+)
- npm (or yarn/pnpm)
- A backend API (Parampara backend) — this frontend expects an API server for authentication and rituals endpoints.

### Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/ABarpanda/parampara-frontend.git
cd parampara-frontend
npm install
```

### Run (development)

Start the Vite dev server:

```bash
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

### Build & preview

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project structure (high level)

- index.html — App entry
- package.json / package-lock.json — dependencies & scripts
- vite.config.js, postcss.config.js, tailwind.config.js — build & styling config
- src/
  - App.jsx — route definitions and app shell
  - index.css — tailwind import / global styles
  - components/ — Navbar, Footer, ProtectedRoute, and UI pieces
  - pages/ — Home, Explore, CreateRitual, RitualDetail, Login, Register, Profile, AboutUs, Privacy, TnC, FAQ, Guidelines, etc.
  - contexts/ — AuthContext (authentication state)
  - services/ — API wrappers (axios instances) used to call backend endpoints

Note: Many pages include user-facing content (AboutUs.jsx, Privacy.jsx, TnC.jsx, FAQ.jsx) that describe the product and policy.

---

## Routes & key pages

Routes are defined in `src/App.jsx`. Main public routes include:

- `/` — Home
- `/about` — About Parampara (project mission & origins)
- `/explore` — Browse rituals
- `/privacy` — Privacy Policy
- `/guidelines` — Community Guidelines
- `/faq` — Frequently Asked Questions
- `/login` — Login
- `/register` — Register

Protected routes (require authentication):

- `/create` — Create a ritual
- `/ritual/:id/edit` — Edit a ritual
- `/profile` — User profile, edit profile, manage rituals

---

## Environment / API

This frontend communicates with a backend API via services in `src/services` (axios-based wrappers are used across pages). Typical expectations:

- An API base URL (e.g., in an environment variable like VITE_API_URL)
- Endpoints for:
  - authentication (login/register)
  - rituals (list, create, view, edit, delete)
  - users / profiles
  - connections / interactions (likes, comments, shares)

If you add environment variables, follow Vite conventions (prefix with VITE_). Example `.env`:

```env
VITE_API_URL=https://yourparampara.server
```

Check `src/services/api` (or similar) for exact environment variable names expected by the code.

---

## Contributing

- Fork the repository and open a PR against `main`.
- Run linting and tests (if any): `npm run lint`
- Follow the established code style (Tailwind + functional React).
- For UI changes, try to keep accessibility and responsiveness in mind.

If you plan to change data contracts (API fields, authentication flows), coordinate with the backend repository and update documentation accordingly.

---

## Contact & support

For questions or concerns referenced in the repo pages:

- Support email: support@ourparampara.in

Use the above for user-facing support. For developer or repo-specific queries, open an issue on this GitHub repository.
