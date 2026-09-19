# Migration prompt: NestJS 11 → 12

## Context to give the assistant

You are working in the `packages/services/api` workspace of the `arithmico` monorepo. It currently uses the NestJS 11 family (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/config`, `@nestjs/jwt`, `@nestjs/mongoose`, `@nestjs/cqrs`, `@nestjs/bull`, `@nestjs/axios`, `@nestjs/cache-manager` all around `^11.x`), together with `class-validator` `^0.15.1`, `joi` `^18.2.9` for config validation, and is deployed via `Dockerfile.api`, whose production base image was raised to `node:22-alpine` in the 2026-09-18 update specifically because NestJS 11 and joi 18 both require Node ≥ 20. Run this migration only after steps 3 (`nanoid`), 4 (`cache-manager`) and 5 (`Mongoose 9`) are complete and validated, since `@nestjs/mongoose` and `@nestjs/cache-manager` need to already be on Mongoose- and cache-manager-compatible releases before their NestJS peer is bumped again.

## Task

Upgrade every `@nestjs/*` package used in `packages/services/api` from the 11.x line to the latest 12.x release.

1. Read the official NestJS 12 migration guide and changelog. Focus on: any change to the minimum Node.js version, changes to the dependency injection container or module resolution behavior, changes to decorators used here (`@Injectable`, `@Controller`, `@Module`, CQRS decorators from `@nestjs/cqrs`, Bull queue decorators from `@nestjs/bull`), and any change to how `@nestjs/config` loads and validates environment variables via `joi`.
2. Upgrade all `@nestjs/*` packages together to matching 12.x releases; do not upgrade a subset, since NestJS packages within a major line are designed to be installed as a matched set.
3. Search `packages/services/api/src` for usages of any NestJS API flagged as removed or changed in the migration guide, in particular around guards, interceptors, exception filters, and the CQRS command/query/event bus if the CQRS package's API changed.
4. Re-check `Dockerfile.api`: confirm whether NestJS 12 changes the Node.js version requirement further; if so, adjust the `node:22-alpine` production base and the `node:22` builder base accordingly, and re-verify the note in `update.md` about `bcrypt` potentially compiling from source on Alpine/musl.
5. Do not modify test files; if a NestJS testing utility (`@nestjs/testing`) changed its `Test.createTestingModule` API, adjust only the setup boilerplate, not test assertions.

## Validation checklist

- `npm run build -w api` succeeds.
- `npm run test -w api` passes with the same test count as before.
- The application boots locally (`npm run start -w api` or equivalent) and responds to at least one existing endpoint.
- A real Docker build of `Dockerfile.api` succeeds end to end, confirming the Node version and `bcrypt` native module concerns noted in `update.md` are resolved.
- `npm audit` for the api workspace does not regress compared to the pre-migration baseline.
