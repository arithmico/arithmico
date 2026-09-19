# Migration prompt: ESLint 8/9 → 10 (flat config)

## Context to give the assistant

You are working in the `arithmico` npm workspace monorepo. Lint configuration is currently split across two styles:

- `packages/libraries/engine/.eslintrc` — legacy config format, `root: true`, extends `eslint:recommended`, `plugin:@typescript-eslint/eslint-recommended`, `plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`, with a `rules` block for `@typescript-eslint/no-unused-expressions` (`allowShortCircuit: true`) and `@typescript-eslint/no-unused-vars` (`caughtErrors: "none"`). These two rule overrides exist because the engine source uses the pattern `__FUNCTIONS.matrixInverse && fragment.addFunction(...)` for compile-time feature flags consumed by `swc.config.js` — do not remove or weaken them.
- `calculator`, `documentation`, `blog`, `backoffice` — legacy config via `eslintConfig` in `package.json`, extending `react-app` (from `eslint-config-react-app` / Create React App conventions).
- `packages/services/api` — already on flat config (`eslint.config.js`) using `typescript-eslint` and ESLint 9.

Nx has already been upgraded to 23 (previous migration step) before this one runs.

## Task

Upgrade ESLint to 10 across `engine`, `calculator`, `documentation`, `blog` and `backoffice`, and migrate every remaining legacy config to flat config (`eslint.config.js`/`eslint.config.mjs`). `api` is already on flat config; only bump its ESLint version if a newer 10.x release exists and update `typescript-eslint` accordingly.

1. Read the ESLint v9 and v10 migration guides. Note that ESLint 9 already made flat config the default and removed automatic `.eslintrc` discovery unless `ESLINT_USE_FLAT_CONFIG=false` is set; v10 removes that escape hatch entirely, so `.eslintrc` and `eslintConfig` in `package.json` will stop working.
2. For `engine`: convert `.eslintrc` to `eslint.config.js` using `@eslint/js` and `typescript-eslint`. Preserve both custom rule overrides (`no-unused-expressions` with `allowShortCircuit: true`, `no-unused-vars` with `caughtErrors: "none"`) and the prettier integration (`eslint-plugin-prettier` / `eslint-config-prettier`, already at 5.5.6 / 10.1.8).
3. For `calculator`, `documentation`, `blog`, `backoffice`: replace the `eslintConfig` block extending `react-app` with an equivalent flat config. Since `eslint-config-react-app` is a Create React App package not designed for flat config, check whether it ships a flat-config export; if not, reconstruct the equivalent rule set manually using `eslint-plugin-react`, `eslint-plugin-react-hooks` and `@typescript-eslint` directly, and document the substitution in a code comment at the top of each `eslint.config.js`.
4. Remove the `eslintConfig` key from each affected `package.json` once the flat config file replaces it, and remove the `eslintIgnore` key in favor of the `ignores` array in flat config.
5. Do not modify test files as part of this migration; if lint now flags something in a test file that was previously silent, prefer a targeted per-file override in the flat config over editing the test.

## Validation checklist

- `nx run-many -t lint` succeeds for all 8 projects with the same or a documented, reviewed set of findings compared to before the migration.
- The engine's feature-flag pattern still lints cleanly (no re-introduction of the 111 `no-unused-expressions` false positives seen during the 2026-09-18 dependency update).
- No workspace still declares `eslintConfig` or `eslintIgnore` in its `package.json`.
- Prettier integration still runs through ESLint (`npm run lint` reports prettier violations) in every workspace that had it before.
