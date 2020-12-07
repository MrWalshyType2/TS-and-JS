# Issues

## Webpack dev server
https://github.com/webpack/webpack-dev-server/issues/2759

webpack v5 is incompatible with webpack-cli v4 'webpack-dev-server' command. Opt for 'webpack serve'.

# TypeScript
- Is a typed superset of the JavaScript language.
- Supports static type checking

# Filenames
Filenames end in '.ts'. The compiler will, by default, return valid JS conforming to ES3; this can be overridden in the 'tsconfig.json' file.

# Why TypeScript?
To make type-save JS apps.

Valid JS in TS produces valid JS when compiled.

Compilation & ide errors are only visible to the developer.

# TS Toolset
Node, NPM, TS & WebPack.

Most projects are managed by npm with Node.js.

TS compiler converts .ts files to plain JS.

WebPack bundles compiled JS modules into a single, distributable file. It can also provide a live dev environment via its dev server.

## Installing TS
NPM:

```
npm install -g typescript
```

## Compiling TS files into JS files
COMMAND LINE:

```
tsc file.ts
```

## Setting up a TS project with Webpack
COMMAND LINE:

```
# Initialise default node project
npm init -y

# TS and TS loader for Webpack
npm i --save-dev typescript ts-loader

# Webpack, Webpack-CLI & Webpack-Dev-Server
npm i --save-dev webpack webpack-cli webpack-dev-server
```

### package.json
```
"scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
    "start": "webpack-dev-server --mode development --open", // hotload with dev server
    "check-types": "tsc",
}
```

### webpack.config
- entry
    - looks for 'index.ts' at the specified directory
    - entry point to the application
- resolve
    - resolves and compiles files within the src directory with the '.ts' and '.js' file types.
- module
    - the rules shown look for file types of '.ts' and use the 'ts-loader' to bundle them

```
module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    }
};
```

### tsconfig.json
- target
    - allows changing the default compiler target of ES3 standards conformity to ES5.

```
{
    "compilerOptions": {
        "target": "ES5"
    }
}
```

### index.ts
This is the entrypoint for the ts-loader.

### index.html
This is the home page of the HTML documents. Contains a script tag to a 'main.js' file that is bundled by webpack.

### Some npm commands

#### Build Production Version
Creates a 'dist' folder if one does not exist, then creates or replaces the contents with a bundled JS file for deployment.

```
npm run build
```

Creates a 'dist' folder if one does not exist, then creates or replaces the contents with a bundled JS file ideal for testing.

```
npm run dev
```

#### Type Check modules
Produces a compiled JS file for each TS file - shows compilation errors.

```
npm run check-types
```

#### Run app on dev server
Creates a 'main.js' file on the server, then serves 'index.html'. If the '--open' flag is specified, a new browser tab is opened each time the command is run.

```
npm start
```

# Modules
- Uses ES2015+ module syntax for importing and exporting

Pre TS 1.5, internal modules refer to 'namespaces' and external modules refer to 'modules'. The change to 'namespaces' and 'modules' follows the ECMAScript2015 module support.

## Exporting from Modules
- Modules run in their own scope, which avoids polluting the global scope
- Only what is exported is exposed externally
- Only what is imported is usable internally
- Any declaration can be exported using the 'export' keyword

Exports can use either the current name, or an alias.

```
// vehicles.ts
export interface Vehicle {
    wheels: number,
    make: string,
    model: string,
    accelerate(t: number): number
}

export class Car implements Vehicle {
    wheels = 4;

    constructor(public make: string, public model: string) {}

    accelerate(time: number) {...}
}

// Without the 'export' keyword specified above
export { Vehicle };
export { Car as BaseCar }; // Alias
```

### Default Exports
Files can only have 1 default export.

```
// vehicles.ts
export default interface Vehicle {
    wheels: number,
    make: string,
    model: string,
    accelerate(t: number): number
}

// OR
export { Vehicle as default };
```

## Importing from modules
- The import keyword is used
- Imports can be renamed
- The whole file can be imported
- Importing the default is the simplest form

```
import { Vehicle, Car } from './vehicles';
let myCar = new Car();

import { Car as BasicCar } from './vehicles';
let myCar = new BasicCar();

import * as vehicles from './vehicles';
let myCar = new vehicles.car();

import Car from './vehicles';
let myCar = new Car();
```

## Creating & Bundling Modules
A module loader is required to make code ready for deployment, the TS compiler is not a module loader although it will compile code to whatever module format specified.
- Webpack is a module loader