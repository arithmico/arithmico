# Migration prompt: cache-manager 6 → 7

## Context to give the assistant

You are working in the `packages/services/api` workspace of the `arithmico` monorepo. It uses `cache-manager` `^6.4.3` together with `@nestjs/cache-manager` `^3.1.3` (NestJS 11's official cache integration).

## Task

Upgrade `cache-manager` from 6 to 7, and `@nestjs/cache-manager` to the matching major that supports it.

1. Read the `cache-manager` v7 changelog and release notes. Focus on: changes to the `Cache` interface (method signatures for `get`, `set`, `del`, `wrap`), changes to how stores are registered (`caching()` / `createCache()` factory functions), and any change to default TTL handling or the `Keyv`-based storage adapter that `cache-manager` now uses internally.
2. Check the `@nestjs/cache-manager` compatibility matrix (its `peerDependencies` on `cache-manager`) and upgrade it to whichever version declares support for `cache-manager` 7. Do not upgrade `cache-manager` alone if `@nestjs/cache-manager` does not yet support it; if no compatible `@nestjs/cache-manager` release exists at migration time, document that as a blocker instead of forcing an incompatible pairing.
3. Search `packages/services/api/src` for every place that injects `CACHE_MANAGER` or calls cache methods directly, and update call sites for any renamed or restructured methods.
4. If a custom cache store or TTL configuration is set up in a module (e.g. `CacheModule.registerAsync` or similar), verify the configuration options object still matches the new API.
5. Do not modify test files; update any test doubles/mocks for the cache manager to match the new interface shape if the interface changed.

## Validation checklist

- `npm run build -w api` succeeds.
- `npm run test -w api` passes with the same test count as before.
- Manually or via an integration test, confirm that a cache `set` followed by `get` still returns the expected value and that TTL expiry still behaves as configured.
- `npm audit` for the api workspace does not regress compared to the 2026-09-18 baseline (42 vulnerabilities workspace-wide).
