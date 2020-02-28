[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# rollup-plugin-entry-code-injector

🍣 A Rollup plugin which injects code into the entry modules at build time. Useful for adding polyfills to a legacy bundle, adding an environment configuration, etc.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install rollup-plugin-entry-code-injector --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import { entryCodeInjector } from 'rollup-plugin-entry-code-injector';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [entryCodeInjector()]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `prepend`

Type: `String`<br>
Default: `null`

Code to be injected at the beginning of the entry module. It will be transformed by the rest of plugins provided in the rollup configurations as well.

```
// rollup.config.js
import { entryCodeInjector } from 'rollup-plugin-entry-code-injector';

export default {
  input: 'main.js',
  output: {
    file: 'legacy.bundle.js',
    format: 'cjs'
  },
  plugins: [
    entryCodeInjector({
      prepend: `
        import 'regenerator-runtime/runtime';
      `
    })
  ]
}
```

### `append`

Type: `String`<br>
Default: `null`

Code to be injected at the end of the entry module. It will be transformed by the rest of plugins provided in the rollup configurations as well.

```
// rollup.config.js
import { entryCodeInjector } from 'rollup-plugin-entry-code-injector';

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    entryCodeInjector({
      append: `
        /**
         * Write some amazing things to be appended here...
         */
      `
    })
  ]
}
```

### `transformer`

Type: `Function`<br>
Default: `null`

Method to be used to transform the entry module code. This method will receive all the entry code as the first argument and should return a string to be written to the entry module file.

The generated code will be transformed by the rest of plugins provided in the rollup configurations as well.

```
// rollup.config.js
import { entryCodeInjector } from 'rollup-plugin-entry-code-injector';

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    entryCodeInjector({
      transformer: function(code) {
        /**
         * Do some code processing here...
         */
        return code;
      }
    })
  ]
}
```

## Meta

[CONTRIBUTING](/.github/CONTRIBUTING.md)

[LICENSE (MIT)](/LICENSE)