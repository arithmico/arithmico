# Arithmico Project
This repository contains the source code of for the Arithmico Engine and the following web applications
- Arithmico Calc
- Arithmico Docs
- Arithmico Config
- Arithmico Blog

# Deployments

## Production Deployments
- [Arithmico Calc](https://arithmico.com)
- [Arithmico Docs](https://docs.arithmico.com)

## Development Deployments
- [Arithmico Calc (dev)](https://dev-calc.arithmico.com)
- [Arithmico Docs (dev)](https://dev-docs.arithmico.com)
- [Arithmico Blog (dev)](https://dev-blog.arithmico.com/)
- [Arithmico Config (dev)](https://dev-config.arithmico.com/)

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
  - `npm run build:calc`
  - `npm run build:docs`
  - `npm run build:blog`
  - `npm run build:config`

4. Serve the files under `<project-root>/apps/<app-name>/dist/*` on a web server