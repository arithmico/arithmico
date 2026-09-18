# Dependency Update 2026-09-18

This document describes the dependency update of the monorepo, the code and configuration changes it required, and the validation results.

## Scope

Every package was raised to the latest release within its current major branch, plus a number of low-risk major upgrades that were checked against their changelogs. Larger migrations (Tailwind 4, Vite 8, TypeScript 7, ESLint 10, React Router 7, NestJS 12, Nx 23, Tauri 2 and others) are deliberately excluded, see "Deliberately not updated" below.

Test content was left untouched. The only changes to source files are Prettier reformatting and two renamed ESLint disable comments.

In total, 120 version entries across eight `package.json` files were changed.

## Version changes

### All frontend workspaces and libraries

Applies to `engine`, `parser`, `ui-components`, `calculator`, `documentation`, `blog` and `backoffice`, wherever the package is present.

| Package | old | new |
| --- | --- | --- |
| typescript | ^5.1.6 | ^5.9.3 |
| prettier | ^3.3.3 | ^3.9.8 |
| eslint | ^8.57.0 | ^8.57.1 |
| eslint-plugin-prettier | ^5.2.1 | ^5.5.6 |
| eslint-config-prettier | ^8.10.0 | ^10.1.8 |
| @typescript-eslint/eslint-plugin | ^6.21.0 | ^8.70.0 |
| @typescript-eslint/parser | ^6.21.0 | ^8.70.0 |
| vite | ^6.2.0 | ^6.4.3 |
| autoprefixer | ^10.4.20 | ^10.6.1 |
| postcss | ^8.4.47 | ^8.5.28 |
| tailwindcss | ^3.4.11 | ^3.4.19 |
| overlayscrollbars | ^2.10.0 | ^2.16.0 |
| @types/react | ^18.3.5 | ^18.3.31 |
| @types/react-dom | ^18.3.0 | ^18.3.7 |
| react-router-dom | ^6.26.2 | ^6.30.6 |

### engine

| Package | old | new |
| --- | --- | --- |
| @swc/cli | ^0.6.0 | ^0.8.1 |
| @swc/core | ^1.7.26 | ^1.16.2 |
| @swc/jest | ^0.2.36 | ^0.2.39 |
| @types/jest | ^29.5.3 | ^29.5.14 |
| vite (pinned exactly) | 6.2.0 | 6.4.3 |

### parser

`peggy` from ^3.0.2 to ^5.1.0.

### calculator

| Package | old | new |
| --- | --- | --- |
| @vitejs/plugin-react-swc | ^3.7.0 | ^4.3.3 |
| @headlessui/tailwindcss | ^0.2.1 | ^0.2.2 |
| better-react-mathjax | ^2.0.3 | ^2.3.0 |
| react-hotkeys-hook | ^4.5.1 | ^4.6.2 |
| @react-pdf/renderer | ^3.4.4 | ^3.4.5 |

### backoffice

| Package | old | new |
| --- | --- | --- |
| @hookform/resolvers | ^3.9.0 | ^3.10.0 |
| async-mutex | ^0.4.1 | ^0.5.0 |
| react-hook-form | ^7.53.0 | ^7.88.0 |
| react-intl | ^6.6.8 | ^6.8.9 |
| zod | ^3.23.8 | ^3.25.76 |

### api

| Package | old | new |
| --- | --- | --- |
| @aws-sdk/client-cloudfront, -s3, -ses | ^3.750.0 | ^3.1135.0 |
| @nestjs/common, -core, -platform-express | ^11.0.10 | ^11.2.5 |
| @nestjs/axios | ^4.0.0 | ^4.0.1 |
| @nestjs/bull | ^11.0.2 | ^11.0.5 |
| @nestjs/cache-manager | ^3.0.0 | ^3.1.3 |
| @nestjs/config | ^4.0.0 | ^4.0.4 |
| @nestjs/cqrs | ^11.0.2 | ^11.0.3 |
| @nestjs/jwt | ^11.0.0 | ^11.0.2 |
| @nestjs/mongoose | ^11.0.1 | ^11.0.4 |
| @nestjs/cli | ^11.0.4 | ^11.0.24 |
| @nestjs/schematics | ^11.0.1 | ^11.1.0 |
| @nestjs/testing | ^11.0.10 | ^11.2.5 |
| axios | ^1.7.9 | ^1.20.0 |
| bcrypt | ^5.1.1 | ^6.0.0 |
| @types/bcrypt | ^5.0.2 | ^6.0.0 |
| cache-manager | ^6.4.0 | ^6.4.3 |
| class-validator | ^0.14.1 | ^0.15.1 |
| joi | ^17.13.3 | ^18.2.9 |
| mailparser | ^3.7.2 | ^3.9.28 |
| @types/mailparser | ^3.4.5 | ^3.4.6 |
| mongodb | ^6.13.1 | ^6.21.0 |
| mongoose | ^8.10.1 | ^8.24.4 |
| nanoid | ^3.3.8 | ^3.3.19 |
| react, react-dom | ^19.0.0 | ^19.3.0 |
| @types/react, @types/react-dom | ^19.0.x | ^19.3.0 |
| @types/node | 22.13.5 | ~22.20.3 |
| @types/express | ^5.0.0 | ^5.0.6 |
| @types/cookie-parser | ^1.4.8 | ^1.4.10 |
| @types/supertest | ^6.0.2 | ^7.2.1 |
| supertest | ^7.0.0 | ^7.2.2 |
| ts-jest | ^29.2.6 | ^29.4.12 |
| ts-loader | ^9.5.2 | ^9.6.2 |
| eslint | ^9.21.0 | ^9.39.5 |
| typescript-eslint | ^8.25.0 | ^8.70.0 |
| typescript | ^5.7.3 | ^5.9.3 |

## Rationale for the major upgrades

**eslint-config-prettier 8 to 10.** Version 9 removes the individual plugin config exports and leaves the default config used by this repository unchanged. Version 10 switches to flat-config-friendly exports but stays backwards compatible with `extends: ["plugin:prettier/recommended"]`. A further consideration: releases 8.10.1, 9.1.1 and 10.1.6 were compromised npm packages in July 2025 (CVE-2025-54313, Shai-Hulud campaign). The repository sat in that range with `^8.10.0`. 10.1.8 is clean.

**@typescript-eslint 6 to 8.** Version 7 raises the minimum requirements (Node 18, TypeScript 4.7 to 5.4), version 8 extends TypeScript support to 5.6+ and tightens several rules. The concrete fallout in this repository is described under "Code and configuration changes". Without this upgrade, TypeScript 5.9 would not have been supported.

**@swc/cli 0.6 to 0.8.** 0.7 drops Node 14/16 and moves `@swc/core` to a peer dependency, 0.8 modernises CLI argument handling. The engine build only uses `swc src -d lib`, so behaviour is unchanged.

**peggy 3 to 5.** Version 4 requires Node 18 and changes the documented grammar file extension, not the grammar syntax. Version 5 requires Node 20 and removes a few deprecated API options. The parser grammar uses none of the removed options and the generated output is functionally identical.

**@vitejs/plugin-react-swc 3 to 4.** Version 4 requires Vite 6 or 7. The repository is already on Vite 6, so the upgrade is uncritical.

**joi 17 to 18.** Version 18 raises the Node minimum to 20 and removes some country-specific TLD lists from email validation. The schemas used here cover configuration values only and are unaffected. See the `Dockerfile.api` note below.

**bcrypt 5 to 6.** Version 6 requires Node 18 and ships prebuilds via `node-gyp-build` instead of `node-pre-gyp`. The API is unchanged. `@types/bcrypt` was raised to 6 accordingly.

**class-validator 0.14 to 0.15.** The validation decorators are unchanged; internal types and the minimum `libphonenumber-js` version moved. NestJS 11 is compatible.

**async-mutex 0.4 to 0.5.** Pure ESM/CJS export refactoring, API unchanged.

**@types/supertest 6 to 7.** Follows the `supertest` 7 major line already in use here, so the 6.x types were outdated regardless.

## Code and configuration changes

**`packages/libraries/engine/.eslintrc`** gained a `rules` block. After the jump to @typescript-eslint 8, engine linting reported 181 errors instead of 5. Two rules account for that:

`@typescript-eslint/no-unused-expressions` is stricter in version 8 and flagged 111 occurrences of the intentional feature-flag pattern `__FUNCTIONS.matrixInverse && fragment.addFunction(...)`. That pattern is the basis for dead-code elimination via `swc.config.js` and must not be rewritten, so the rule is now configured with `allowShortCircuit: true`.

`@typescript-eslint/no-unused-vars` reports unused `catch` parameters since version 8, which affected six places. It is configured with `caughtErrors: "none"`, matching the pre-upgrade behaviour.

**Two disable comments were renamed.** The rule `@typescript-eslint/no-loss-of-precision` was removed in version 8 because the ESLint base rule `no-loss-of-precision` fully covers the case. The stale comments therefore no longer applied and produced 46 errors. Affected files:

- `packages/libraries/engine/src/plugins/statistics/utils/quantile-standard-normal.ts`, line 7
- `packages/libraries/engine/src/plugins/physics/fragments/physical-constants.ts`, line 111

**Five files were reformatted by Prettier 3.9.8** (`eslint --fix`, whitespace and line breaks only, no semantic change):

- `src/utils/pipe.ts` (indentation of nested ternaries)
- `src/types/nodes.types.ts` (union collapsed onto one line)
- `src/plugins/algebra/fragments/lsolve.ts` (line break inside a template literal)
- `src/node-operations/normalize-node/nodes/normalize-plus.ts` and `normalize-times.ts` (formatting of `if (!(`)

**`Dockerfile.api`:** the production image was on `node:18-alpine3.17` while the builder already used `node:22`. NestJS 11 (`@nestjs/core` engines: `>= 20`) and joi 18 (`>= 20`) do not run on Node 18, so the production image was raised to `node:22-alpine`. This change could not be built because Docker was unavailable in the validation environment. It should be confirmed with a real image build before merging, in particular because `bcrypt` 6 may compile from source on Alpine (musl).

## Validation

Validation ran on Node 22 against the baseline captured before the update. Docker was not available.

| Check | Baseline | after update |
| --- | --- | --- |
| `npm run test -w engine` | 20 suites, 752 tests green | 20 suites, 752 tests green |
| `npm run test -w api` | 1 suite, 1 test green | 1 suite, 1 test green |
| `nx run-many -t test` | green | green, 8 projects |
| `nx run-many -t lint` | green | green, 8 projects |
| Build engine, calculator, documentation, blog, backoffice | green | green |
| `npm run build:offline -w calculator` | green | green |
| `npm run build -w api` (nest build) | green | green |

The Tauri installer build was not executed because the Rust toolchain is missing in the validation environment.

`npm audit` now reports 42 vulnerabilities (3 low, 19 moderate, 19 high, 1 critical), down from 106 (11 low, 51 moderate, 40 high, 4 critical). The remaining findings come almost entirely from transitive build and tooling dependencies, chiefly `nx`, `@xhmikosr/decompress` via the Tauri chain, `@babel/*` via `eslint-config-react-app`, plus `brace-expansion`, `minimatch`, `picomatch`, `js-yaml` and `tmp`. They can only be cleared through the major upgrades excluded above. The only runtime dependency in the list is `multer` via `@nestjs/platform-express`, where NestJS 11 currently ships no higher version.

## Deliberately not updated

The following majors were reviewed and postponed because they would require migration work or changes to tests:

Tailwind CSS 4 (new CSS-first configuration, replaces `tailwind.config.js`), Vite 7 and 8 (Node and Rollup jump, affects all four frontends), TypeScript 7 (native compiler, not yet cleared by all plugins), ESLint 10 (enforces flat config in every workspace, while the frontends still use `eslintConfig` in `package.json`), React Router 7 (framework mode and changed data router API), Redux Toolkit 2, i18next 26, NestJS 12, Nx 23, Tauri 2 (complete rewrite of the configuration and the Rust side), Mongoose 9, Jest 30, zod 4 together with @hookform/resolvers 5 (only migratable as a pair), nanoid 6 (ESM only, breaks the CommonJS build of the API), @react-pdf/renderer 4, @headlessui/react 2, react-hotkeys-hook 5, better-react-mathjax 3, cache-manager 7 and prettier-plugin-tailwindcss 0.8.

## Note on the working copy

`package-lock.json` was regenerated. To get a working tree, run

```
npm install
```

once in the project root. The build instructions in `README.md` are unchanged.
