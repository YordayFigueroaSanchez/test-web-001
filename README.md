# test-web-001

Modern, accessible, and responsive web application built with Angular 19 and Tailwind CSS v3.4.

## Features

- **Angular 19** — Standalone components, Signals, new control flow syntax
- **Tailwind CSS v3.4** — Mobile-first responsive design with dark mode
- **WCAG 2.1 AAA** — Skip navigation, ARIA landmarks, keyboard navigation, 7:1 contrast
- **i18n** — Build-time internationalization (Spanish/English) with `@angular/localize`
- **Jest** — Unit testing with Angular Testing Library
- **GitHub Pages** — Automated deployment via GitHub Actions

## Prerequisites

- Node.js 20+
- npm 10+

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

Open `http://localhost:4200/` — the app reloads automatically on file changes.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm test` | Run tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run build` | Production build (default locale) |
| `npm run build:es` | Production build with all locales |
| `npm run lint` | Run ESLint |

## Building

```bash
# Standard build
ng build

# Localized build (ES + EN)
npx ng build --localize
```

Build artifacts are stored in `dist/test-web-001/`.

## Testing

```bash
# Run all tests
npm test

# With coverage (80% threshold)
npm run test:coverage
```

## Project Structure

```
src/app/
├── components/     # Reusable UI components (button, card, modal, etc.)
├── layout/         # Layout components (header, footer, mobile menu)
├── pages/          # Page components (home, about, features, gallery, contact)
└── shared/         # Shared services, interfaces, animations, directives
```

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via GitHub Actions.

## License

Private project.
