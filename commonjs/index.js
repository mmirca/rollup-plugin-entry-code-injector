'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function entryCodeInjector (options) {
  const pluginConfig = options instanceof Object ? options : {};
  return {
    name: 'entry-code-injector',
    transform(code, module) {
      if (this.getModuleInfo(module).isEntry) {
        const { transformer } = pluginConfig;
        return `
          ${String(pluginConfig.prepend)}
          ${transformer instanceof Function ? transformer(code) : code}
          ${String(pluginConfig.append)}
        `;
      }
    }
  }
}

exports.entryCodeInjector = entryCodeInjector;
