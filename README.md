[action-image]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/actions
[npm-image]: https://img.shields.io/npm/v/webpack-browser-extension-polyfill.svg
[npm-url]: https://npmjs.org/package/webpack-browser-extension-polyfill

# webpack-browser-extension-polyfill [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> If you use webpack and want your extension to run on both Firefox and all Chromium-based browsers, use this plugin.

Develop cross-browser extensions using either `chrome.*` or `browser.*` namespaces without worryig about setup. Zero-config support to every file declared in your manifest file. Including background and content scripts.

Via Mozilla's [WebExtension browser API Polyfill](https://github.com/mozilla/webextension-polyfill), this webpack plugin allows extensions that use the Promise-based WebExtension/BrowserExt API, being standardized by the W3 Browser Extensions group to run on Chromium-based browsers with minimal or no changes. [See the polyfill docs](https://github.com/mozilla/webextension-polyfill/#webextension-browser-api-polyfill) for specific info.

## Installation

```
npm install webpack-browser-extension-polyfill --save-dev
```

## Usage

See [webpack.config.js example](./fixtures/webpack.config.js).

```js
const BrowserExtensionPolyfill = require('webpack-browser-extension-polyfill')

module.exports {
  plugins: [
    new BrowserExtensionPolyfill({extensionPath: /* <path-to-manifest-file> */})
  ]
}

```

## How does it work?

The plugin links declared manifest fields (as long as they are relevant) to the polyfill file created by the plugin at the same folder path as the manifest file. The plugin works at [make](https://webpack.js.org/api/compiler-hooks/#make) time.

## API

### new BrowserExtensionPolyfill({manifestPath: /* <path-to-manifest-file> */})

#### manifestPath

Type: `string`

Path to your browser extension manifest file.

## License

MIT (c) Cezar Augusto.
