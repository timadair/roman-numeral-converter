# roman-numeral-converter
Demo project for converting from Arabic to Roman numerals

Uses Fastify for its NodeJS framework.  Very fast, can be extended with NestJS for more integrations, can be migrated to Express relatively easily.  The service's domain is unlikely to grow beyond microservice scope, so needing to use Express seems unlikely.

For testing: Vitest (it's relatively new and I wanted to try it out), and supertest (allows HTTP calls against the server in tests)

For code quality and style: Husky, eslint, typescript-eslint, prettier.  lint-staged limits Husky to only staged files, which I wish I knew about earlier.