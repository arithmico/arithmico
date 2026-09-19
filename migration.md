# Migration Roadmap

This document lays out a recommended order for the major upgrades that were deliberately excluded from the 2026-09-18 dependency update (see `update.md`, section "Deliberately not updated"). Each migration has a corresponding ready-to-use AI prompt in the [`ki-prompts/`](ki-prompts/) folder, named with the same step number used here.

## Guiding principles

The order below follows four rules:

1. **Independent tracks run in parallel.** The `api` workspace (NestJS, MongoDB, Jest) shares no runtime code with the four frontend workspaces, so its migrations can happen on a separate branch and timeline without blocking frontend work.
2. **Small, isolated packages go first.** Libraries used in exactly one workspace with a narrow API surface (`nanoid`, `cache-manager`, `react-hotkeys-hook`, `better-react-mathjax`, `@react-pdf/renderer`) are low-risk and build confidence in the process before tackling framework-level changes.
3. **Paired or coupled packages move together.** `zod` and `@hookform/resolvers` only work together across a major boundary; `prettier-plugin-tailwindcss` must follow the Tailwind version it formats for. These are scheduled back-to-back.
4. **Shared build tooling comes last, in dependency order.** Vite, Tailwind CSS and React Router touch every frontend workspace at once and are easiest to reason about once the smaller, workspace-local migrations are already done. TypeScript 7 is scheduled last among the shared-tooling group because it depends on plugin and type-defintion compatibility across everything upgraded before it. Tauri 2 is fully isolated to the offline desktop build and can be scheduled independently of everything else, so it is listed last.

## Overview

| # | Migration | Workspace(s) | Track | Depends on |
| - | --- | --- | --- | --- |
| 1 | Nx 18 → 23 | root / all | Tooling | - |
| 2 | ESLint 8/9 → 10 (flat config) | engine, calculator, documentation, blog, backoffice | Tooling | - |
| 3 | nanoid 3 → 6 (ESM only) | api | Backend | - |
| 4 | cache-manager 6 → 7 | api | Backend | - |
| 5 | Mongoose 8 → 9 | api | Backend | - |
| 6 | Jest 29 → 30 | api, engine | Backend | 5 (test after data-layer changes settle) |
| 7 | NestJS 11 → 12 | api | Backend | 3, 4, 5 |
| 8 | react-hotkeys-hook 4 → 5 | calculator | Frontend, small | - |
| 9 | better-react-mathjax 2 → 3 | calculator | Frontend, small | - |
| 10 | @react-pdf/renderer 3 → 4 | calculator | Frontend, small | - |
| 11 | @headlessui/react 1 → 2 | documentation, calculator, backoffice, blog | Frontend, small | - |
| 12 | zod 3 → 4 with @hookform/resolvers 3 → 5 | backoffice | Frontend, paired | - |
| 13 | @reduxjs/toolkit 1 → 2 | calculator, backoffice | Frontend | - |
| 14 | i18next 22 → 26 with react-i18next | calculator | Frontend | - |
| 15 | Vite 6 → 7 → 8 | engine, calculator, documentation, blog, backoffice | Shared tooling | 8-14 |
| 16 | Tailwind CSS 3 → 4 | engine, calculator, documentation, blog, backoffice | Shared tooling | 15 |
| 17 | prettier-plugin-tailwindcss 0.4 → 0.8 | engine, calculator, documentation, blog, backoffice | Shared tooling | 16 |
| 18 | React Router 6 → 7 | calculator, documentation, blog, backoffice | Shared tooling | 15 |
| 19 | TypeScript 5 → 7 | root / all | Shared tooling | 1, 2, 15, 16, 18 |
| 20 | Tauri 1 → 2 | calculator (offline build) | Isolated | - |

## Recommended sequence

### Phase A — Tooling foundation (can start immediately)

Steps 1 and 2. Upgrading Nx first gives every later migration a current task runner and surfaces workspace-config issues on their own, without being mixed up with application code changes. The ESLint flat-config migration is next because every workspace currently mixes `.eslintrc` (engine) and `eslintConfig` in `package.json` (frontends); doing this early means every subsequent migration is linted with the final config format instead of twice.

### Phase B — Backend track (parallel to everything else)

Steps 3 through 7, in that order. `nanoid` and `cache-manager` are narrow, low-risk bumps that remove blockers for the NestJS major. Mongoose 9 is scheduled before the NestJS major because `@nestjs/mongoose` pins a Mongoose peer range and it is easier to validate the data layer in isolation first. Jest 30 follows so that a test-runner change is never mixed with a data-layer or framework change in the same validation run. NestJS 12 itself is last in this track since it is the largest single change and benefits from every other backend dependency already being current.

### Phase C — Small, isolated frontend libraries (parallel to Phase B)

Steps 8 through 11. These four packages are used in one or a few workspaces, have small APIs, and do not interact with each other. They can be done in any order or even in parallel by different people; the sequence given simply groups calculator-only changes before the one that spans four workspaces.

### Phase D — Coupled frontend packages

Steps 12 through 14. `zod` 4 and `@hookform/resolvers` 5 must be upgraded together, so they are scheduled as a single unit. `@reduxjs/toolkit` 2 follows since some backoffice forms combine Redux state with react-hook-form. `i18next` 26 is scheduled last in this phase because it is calculator-only and unrelated to the other two, so it will not block them if delayed.

### Phase E — Shared build tooling

Steps 15 through 19, strictly in this order because each step depends on the previous one:

- **Vite 7 then 8** first, since the Tailwind CSS 4 Vite plugin and current React plugin versions target Vite 6/7 and need a working Vite upgrade underneath them. Upgrade to 7 and validate before moving to 8, rather than jumping directly, since both are major Rollup/Node bumps.
- **Tailwind CSS 4** next, once the build pipeline it plugs into is current. This is a full configuration rewrite (CSS-first configuration replaces `tailwind.config.js`) and touches all five workspaces that use Tailwind.
- **prettier-plugin-tailwindcss 0.8** immediately after, since it parses the Tailwind config format and must match the Tailwind major in use.
- **React Router 7** after Vite, since the framework mode and new data router APIs are easiest to validate against an already-updated dev server and build.
- **TypeScript 7** last in this phase. The native compiler needs every build plugin, ESLint integration and type definition it interacts with to already declare support, so scheduling it after Nx, ESLint, Vite, Tailwind and React Router are done minimizes the number of moving parts when problems need to be isolated.

### Phase F — Isolated desktop build

Step 20, at any point convenient. Tauri 2 only affects the offline/desktop packaging of the calculator and is a complete rewrite of the Rust-side configuration. It has no dependency on, and is not depended on by, any other step in this document, so it can be scheduled whenever capacity allows, including in parallel with any other phase.

## How to use the prompts

Each file in [`ki-prompts/`](ki-prompts/) is a self-contained prompt for an AI coding assistant covering exactly one migration from the table above. Every prompt includes the affected workspaces, the current and target version, the specific breaking changes relevant to this codebase (based on the official changelogs), and a validation checklist. Run them one at a time, in the order above, and re-run the full test and lint suite between steps so that a regression can always be attributed to a single migration.
