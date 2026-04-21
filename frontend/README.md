# MediQ Frontend

MediQ is a medical intelligence platform. This repository contains the React-based frontend, including a marketing landing page and an application dashboard.

## Tech Stack

- **React 19** with TypeScript
- **React Router v7** — client-side routing
- **Material-UI (MUI) v6** — component library and theming
- **Tailwind CSS v3** — utility-first styling with shadcn/Radix UI primitives
- **Craco** — Create React App customization (Webpack, dev server)
- **Axios** — HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+

### Install dependencies

```bash
yarn install
```

### Run the development server

```bash
yarn start
```

Opens at [http://localhost:3000](http://localhost:3000). The page hot-reloads on changes.

### Build for production

```bash
yarn build
```

Output is in the `/build` directory.

### Run tests

```bash
yarn test
```

## Project Structure

```
src/
├── components/
│   ├── mediq/          # Landing page sections (Hero, Features, Pricing, FAQ, …)
│   │   └── animations/ # Custom SVG/canvas animations
│   └── ui/             # shadcn-based primitive components (Radix UI wrappers)
├── pages/              # Full page components (Dashboard)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions (cn() class merger)
└── theme.ts            # MUI theme builder (light/dark palettes)
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Routes

| Path         | Description                          |
|--------------|--------------------------------------|
| `/`          | Marketing landing page               |
| `/dashboard` | Application dashboard with sidebar   |

## Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Open a merge request targeting `dev`
