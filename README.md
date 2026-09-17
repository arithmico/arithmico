# Arithmico Project

This repository contains the source code for the Arithmico Engine and the following web applications

- Arithmico Calc
- Arithmico Docs
- Arithmico Blog

# Deployments

## Production Deployments

- [Arithmico Calc](https://arithmico.com)
- [Arithmico Docs](https://docs.arithmico.com)
- [Arithmico Blog](https://blog.arithmico.com)

## Development Deployments

- [Arithmico Calc](https://calc.dev.arithmico.com)
- [Arithmico Docs](https://docs.dev.arithmico.com)
- [Arithmico Blog](https://blog.dev.arithmico.com/)

# Build Instructions

The repository is an npm workspace. There are no build scripts in the root `package.json`; every build runs in a workspace, selected with `-w <workspace-name>`. The workspace names are `engine`, `calculator`, `documentation`, `blog`, `backoffice` and `api`.

1. Install the dependencies from the project root

```
npm install
```

2. Build the Arithmico Engine with all features by running

```
npm run build:full-features -w engine
```

3. Build one a web application by running one of the following commands

- Arithmico Calc

```
npm run build -w calculator
```

- Arithmico Docs

```
npm run build -w documentation
```

- Arithmico Blog

```
npm run build -w blog
```

- Arithmico Backoffice

```
npm run build -w backoffice
```

4. Serve the files from `packages/applications/<app-name>/dist/` on a web server. The application directories are `calculator`, `documentation`, `blog` and `backoffice`.

5. For local development, start a Vite dev server instead, for example

```
npm run start -w calculator
```

## Build the offline version locally 
**HINT** This part is not validated for all plattforms.

The offline frontend can be built locally from the repository root after installing the dependencies and building the engine:

```
export ARITHMICO_FEATURES=$(cat ./packages/libraries/engine/features.json) 
npm ci
npm run build:offline -w calculator
```

This creates the static offline frontend in `packages/applications/calculator/dist/`.
**Important:** the engine is compiled with the feature set from the environment variable `ARITHMICO_FEATURES`. `npm ci` triggers an engine build through the engine's `install` script, but without that variable, which produces an engine with every type, operator, function, method and constant disabled. Always run the command above (or the one below) before building an application.

To build a reduced feature set, pass your own subset of `packages/libraries/engine/features.json`:

```
ARITHMICO_FEATURES="$(cat ./my-features.json)" npm run build -w engine
```

To create the native Tauri installer instead, Rust and the platform-specific Tauri build dependencies must also be installed. Run additional:

```
VITE_OFFLINE_MODE=true NODE_ENV=production npm run tauri build -w calculator
```

The generated installer is placed below `packages/applications/calculator/src-tauri/target/release/bundle/`. Depending on the operating system, the configured bundle targets are `.deb` on Linux, `.dmg` on macOS, and `.exe` on Windows. The exact native dependencies are platform-specific; the GitHub Actions workflow documents the additional Ubuntu packages and Rust targets used by CI in `.github/workflows/build-offline-version.yml`.
