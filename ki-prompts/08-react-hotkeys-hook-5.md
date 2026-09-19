# Migration prompt: react-hotkeys-hook 4 → 5

## Context to give the assistant

You are working in the `packages/applications/calculator` workspace of the `arithmico` monorepo, a Vite + React frontend. It currently depends on `react-hotkeys-hook` `^4.6.2`, used to bind keyboard shortcuts inside the calculator UI.

## Task

Upgrade `react-hotkeys-hook` from 4 to 5.

1. Read the `react-hotkeys-hook` v5 changelog and migration notes. Focus on: changes to the `useHotkeys` hook signature (options object shape, scoping API), changes to how key combinations are parsed, and any change to the required React version (this workspace is on React 18 in the frontend, confirm compatibility).
2. Search `packages/applications/calculator/src` for every `useHotkeys` call and every import from `react-hotkeys-hook`, and update each call site to the new API shape.
3. If the library changed how it handles input-field focus (whether hotkeys fire while a text input has focus), verify the calculator's existing behavior is preserved, since this directly affects usability of a calculator UI with a formula input field.
4. Do not modify test files; if any test simulates a key press to exercise a hotkey, verify it still triggers the handler after the upgrade.

## Validation checklist

- `npm run build -w calculator` succeeds.
- `npm run test -w engine` and any calculator-specific tests still pass (the calculator workspace itself may have no dedicated Jest suite; check `package.json` for a `test` script before assuming).
- Manually verify (`npm run start -w calculator`) that every documented keyboard shortcut still triggers the correct action, including behavior while the formula input is focused.
