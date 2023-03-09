[Run the app in your browser](https://excelator.raphaelvolz.de)

# Excelator Project
An extension to the great Arithmico Engine with a plugin enabling excel function names.
This repository hosts and contains the source code of the plugin enabling excel functions as far as possible for the Arithmico Engine and the following web applications
- Excelator Calc

# Deployments

## Production Deployments
- [Excelator Calc](https://excelator.raphaelvolz.de)
- [Arithmico Calc - The original ](https://arithmico.com)
- [Arithmico Docs](https://docs.arithmico.com)
- [Arithmico Config](https://config.arithmico.com)

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

4. Serve the files under `<project-root>/apps/<app-name>/dist/*` on a web server, here on github copied to docs folder.
5. For local testing you can use `npn run start:calc` or create the offline-version with `npm run build:offline -w apps/calc/`
