'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @typedef Transformer
 * @type {Function}
 * @param {string} code - Entry file's code.
 * @returns {string} - Transformed code to be written to the entry file.
 */

/**
 * @typedef Options
 * @type {Object}
 * @property {string} prepend - Code to be be injected before the entry code.
 * @property {string} append - Code to be be injected after the entry code.
 * @property {Transformer} transformer - Transformer method.
 */

/**
 * Returns a configuration object to be used in a Rollup project as plugin
 * @param {Options} options - Plugin configuration object
 * @returns {Object} - Rollup plugin configuration object
 */
function entryCodeInjector (options) {
  const pluginConfig = options instanceof Object ? options : {};
  return {
    name: 'entry-code-injector',
    transform(code, module) {
      if (this.getModuleInfo(module).isEntry) {
        const { transformer, prepend, append } = pluginConfig;
        let processedCode = '';
        const isFunction = transformer instanceof Function;
        processedCode = isFunction ? transformer(code) : code;
        processedCode = prepend ? String(prepend) + processedCode : processedCode;
        processedCode = append ? processedCode + String(append) : processedCode;
        return processedCode;
      }
    }
  }
}

exports.entryCodeInjector = entryCodeInjector;
