import entryCodeInjector from './entry-code-injector';

describe("entryCodeInjector(options)", function() {
  test('should return a Rollup configuration object with "entry-code-injector" name when called', function() {
    const result = entryCodeInjector();
    expect(result.name).toBe('entry-code-injector');
  });
  test('should return an object with a "transform" method when called', function() {
    const result = entryCodeInjector();
    expect(result.transform instanceof Function).toBe(true);
  });
  describe("entryCodeInjector(options).transform(code, module)", function() {
    test("should return undefined when called on a non entry module", function() {
      const context = {
        getModuleInfo: () => ({ isEntry: false })
      };
      const pluginConfig = entryCodeInjector();
      const { transform } = pluginConfig;
      const result = transform.apply(context);
      expect(result).toBeUndefined();
    });
    test("should return the code as is when called with undefined options on an entry module", function() {
      const context = {
        getModuleInfo: () => ({ isEntry: true })
      };
      const pluginConfig = entryCodeInjector();
      const { transform } = pluginConfig;
      const code = 'expect unmodified code';
      const result = transform.apply(context, [code]);
      expect(result).toBe(code);
    });
    test("should prepend the specified code when called with a defined preprend option on an entry module", function() {
      const context = {
        getModuleInfo: () => ({ isEntry: true })
      };
      const prepend = 'prepend code';
      const pluginConfig = entryCodeInjector({ prepend });
      const { transform } = pluginConfig;
      const code = 'main code';
      const result = transform.apply(context, [code]);
      expect(result).toBe(prepend + code);
    });
    test("should append the specified code when called with a defined append option on an entry module", function() {
      const context = {
        getModuleInfo: () => ({ isEntry: true })
      };
      const append = 'append code';
      const pluginConfig = entryCodeInjector({ append });
      const { transform } = pluginConfig;
      const code = 'main code';
      const result = transform.apply(context, [code]);
      expect(result).toBe(code + append);
    });
    test("should apply the specified transform method on the code when called with a defined transformer option on an entry module", function() {
      const context = {
        getModuleInfo: () => ({ isEntry: true })
      };
      const transformer = () => 'transformed code';
      const pluginConfig = entryCodeInjector({ transformer });
      const { transform } = pluginConfig;
      const code = 'main code';
      const result = transform.apply(context, [code]);
      expect(result).toBe('transformed code');
    });
  });
});
