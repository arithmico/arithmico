# Migration prompt: better-react-mathjax 2 → 3

## Context to give the assistant

You are working in the `packages/applications/calculator` workspace of the `arithmico` monorepo. It currently depends on `better-react-mathjax` `^2.3.0`, used to render mathematical expressions from the Arithmico Engine as MathJax output in the UI.

## Task

Upgrade `better-react-mathjax` from 2 to 3.

1. Read the `better-react-mathjax` v3 changelog and migration notes. Focus on: changes to the `MathJaxContext` provider's configuration object (MathJax input/output processor options), changes to the `MathJax` rendering component's props (e.g. `inline`, `dynamic`, `hideUntilTypeset`), and whether the underlying bundled MathJax version changed in a way that affects rendered output (font, spacing, or supported LaTeX macros).
2. Search `packages/applications/calculator/src` for every usage of `MathJaxContext` and the `MathJax` component, and update the configuration and props to the new API.
3. Since this component renders engine output directly to users, manually compare rendered formulas before and after the upgrade for a representative set of expressions (fractions, matrices, integrals, Greek letters) to catch visual regressions the changelog does not explicitly call out.
4. Do not modify test files; if any test snapshot-tests rendered MathJax output, expect the snapshot to need regeneration and treat that as a reviewable diff, not as forbidden test-content editing.

## Validation checklist

- `npm run build -w calculator` succeeds.
- Manually verify rendering of a representative set of formulas in the running application looks correct (no missing glyphs, correct fraction/matrix layout).
- If snapshot tests exist for rendered output, regenerate and review the diff.
