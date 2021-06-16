[action-image]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/actions
[npm-image]: https://img.shields.io/npm/v/webpack-browser-extension-polyfill.svg
[npm-url]: https://npmjs.org/package/webpack-browser-extension-polyfill

# webpack-browser-extension-polyfill [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> webpack plugin to develop cross-browser extensions and Mozilla Add-Ons.

If you use webpack and want your extension to run on both Firefox and all Chromium-based browsers, use this plugin.

Via Mozilla's [WebExtension browser API Polyfill](https://github.com/mozilla/webextension-polyfill), this webpack plugin allows extensions that use the Promise-based WebExtension/BrowserExt API, being standardized by the W3 Browser Extensions group to run on Chromium-based browsers with minimal or no changes. [See the polyfill docs](https://github.com/mozilla/webextension-polyfill/#webextension-browser-api-polyfill) for specific info.

Forget manual _polyfilling_. This plugin goal is to add full polyfill support to every file declared in your manifest file. **Including in background and content scripts**. Zero-config for that.

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
    new BrowserExtensionPolyfill(/* <path-to-manifest-file> */)
  ]
}

```

## How does it work?

Injects the polyfill file at the same folder path level as your manifest file. For background and content scripts declared in your manifest file, a link to the polyfill will also be added to the manifest file at [compile](https://webpack.js.org/api/compiler-hooks/#compile) time.

## API

### new BrowserExtensionPolyfill(manifestFilePath)

#### manifestFilePath

Type: `string`

Path to your browser extension manifest file.

## License

MIT (c) Cezar Augusto.
