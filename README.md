# Roman Numeral Converter

Demo project for converting from Arabic to Roman numerals.

Implements the modern standard Roman numeral specification, 1-3999, found at https://en.wikipedia.org/wiki/Roman_numerals#Standard_form


## Build and run locally

# Docker

After you have Docker installed, run this in a terminal:

```bash
git clone https://github.com/timadair/roman-numeral-converter.git
cd roman-numeral-converter
docker build -t roman-numeral-app .
docker run -p 127.0.0.1:8080:8080 roman-numeral-app
```
Then open your browser to https://localhost:8080
Metrics are available at https://localhost:8080/metrics
The backend can be called directly at https://localhost:8080/romannumeral?query={integer}

# Dev

This project uses pnpm.  (see https://pnpm.io/installation to install)
To run the backend and frontend separately, open two terminals in the root directory

```bash
cd api
pnpm run dev
```

```bash
cd web
pnpm run dev
```

# Test

Unit Tests for both the UI and backend can be run together from the root directory or separately from web/ and /api with `pnpm run test`
E2E tests have been manual thus far, which is tolerable with only one page.  No Storybook or Playwright yet.

## Dependencies Explained

# Frontend

Uses React with TypeScript + SWC, built by Vite.
- React - required by design doc
- TypeScript - adds static typing.  In spite of needing to add extra libraries to make sure transpiling happens everywhere it's needed, I will prefer TS over JS whenever possible
- SWC - increases speed at the cost of real-time typechecking, but ESLint is in place already for in-IDE and pre-commit typechecking
- Vite - has an excellent reputation and growing market share.  Works well with React.  I've been wanting to use it in a prototype.  Has some resolvable issues with Spectrum.
- Adobe Spectrum - required by design doc
- Spectrum icons - has the Moon/Light icons to imitate Adobe's darkmode toggle.
- Jest - Vitest is designed to work with Vite and is blazingly fast, but it and Spectrum have issues I wasn't able to fix quickly.  Fell back to Jest.

# Backend

- Fastify - NodeJS framework
  - Very fast, can be extended with NestJS for more integrations, can be migrated to Express relatively easily
  - The service's domain is unlikely to grow beyond microservice scope, so needing to use Express seems unlikely
- Fastify/cors - Plugin to allow the frontend to call the backend to resolve XSS issues
- Fastify/static - Serve the UI from the backend NodeJS server in production.  Allows the project to deploy from a single dockerfile without using docker-compose.
- Pino - Fastify's default logger
  - Includes requestId, response statusCode and responseTime
- cls-rtracer - Made it easy to include the x-request-id in all request logging.  Lightweight, well-regarded.
  - For deeper tracability in the future, look into the traceparent header instead of x-request-id
- Vitest - test runner.  It's relatively new, I'd heard good things about it, can work with both React and NodeJS, and was designed to work with Vite.
- Supertest - allows HTTP calls against a server in test

# Code Quality and Style

- Husky, eslint, typescript-eslint, prettier - Industry best practice
- lint-staged limits Husky to only staged files, which I wish I had known about earlier

## Known Issues

-Doesn't support non-Arabic numeral inputs, at least when I tried out simplified Chinese characters.  It's an extreme edge case, but I thought I'd note it.