# Roman Numeral Converter

Demo project for converting from Arabic to Roman numerals.

Implements the modern standard Roman numeral specification, 1-3999, found at https://en.wikipedia.org/wiki/Roman_numerals#Standard_form


## Frontend

- Uses React with TypeScript + SWC, built by Vite
- SWC increases speed at the cost of real-time typechecking, but ESLint is in place already for pre-commit typechecking
- Vite also increases speed, and it's been gaining market share, so I've been wanting to build a small project with it

## Backend

- Uses Fastify for its NodeJS framework
  - Very fast, can be extended with NestJS for more integrations, can be migrated to Express relatively easily
  - The service's domain is unlikely to grow beyond microservice scope, so needing to use Express seems unlikely
- For logging, uses Pino, Fastify's default
  - Includes requestId, response statusCode and responseTime
- Tracing across layers enabled with optional x-request-id header (for now, might replace with traceparent)
- For tracing, uses cls-rtracer for handling incoming headers
  - It's widely used, well-regarded, and lightweight
- For testing: Vitest (it's relatively new, I'd heard good things about it, it will work with both React and NodeJS, and I wanted to try it out), and supertest (allows HTTP calls against the server in tests)

## Code Quality and Style

- Husky, eslint, typescript-eslint, prettier - Industry best practice
- lint-staged limits Husky to only staged files, which I wish I had known about earlier

## Known Issues