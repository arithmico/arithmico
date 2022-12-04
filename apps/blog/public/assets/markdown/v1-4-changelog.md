# [v1.4] Changelog

## Neue Funktionen

- Untersützung von Methodenaufrufen
- Neue Methode `<vector>.length()`
- Unterstützung von weiteren Latex-Befehlen
  - `\log(...)` (Basis 10)
  - `\log_{...}(...)` (Abweichende Basis)
  - `\ln(...)` (Basis `e`)

## Fehlerbehebungen

- Parsing Probleme bei gemischenten binären Operationen mit Latex und Nicht-Latex Operanden

## Weitere Optimierungen

- `addMethod` zu `PluginBuilder` und `PluginFragment` hinzugefügt
- `getNullableParameter` zur Plugin Builder API hinzugefügt
- Plugin Reorganisation abgeschlossen
- migration von Arithmico Blog und Arithmico Docs zu tailwindcss
- zusätzlich Buildskripte: `retest:engine` und `rebuild:engine`
