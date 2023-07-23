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

1. Go to the project folder and run

```
npm install
```

2. Build the Arithmico Engine by running

```
npm run build:engine
```

3. Build one a web application by running one of the following commands

- Build Arithmico Calc

```
npm run build:calc
```

- Build Arithmico Docs

```
npm run build:docs
```

- Build Arithmico Blog

```
npm run build:blog
```

- Build Arithmico Config

```
npm run build:config
```

4. Serve the files under `<project-root>/packages/<app-name>/dist/*` on a web server
5. For local testing you can use `npm run start:calc` or create the offline-version with `npm run build:offline -w packages/calc/`
