[action-image]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-browser-extension-polyfill/actions
[npm-image]: https://img.shields.io/npm/v/webpack-browser-extension-polyfill.svg
[npm-url]: https://npmjs.org/package/webpack-browser-extension-polyfill

# webpack-browser-extension-polyfill [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> webpack plugin to develop cross-browser extensions and Mozilla Add-Ons.

If you use webpack and want your extension to run on both Firefox and all Chromium-based browsers, use this plugin.

Forget manually polyfilling every extension page you want to develop. Supports Mozilla's [WebExtension browser API Polyfill](https://github.com/mozilla/webextension-polyfill) on every file declared in your manifest file. **Including in background and content scripts**. Zero-config for that 👀 👀 👀

The polyfill allows extensions that use the Promise-based WebExtension/BrowserExt API being standardized by the W3 Browser Extensions group to run on Google Chrome with minimal or no changes. [See the polyfill docs](https://github.com/mozilla/webextension-polyfill/#webextension-browser-api-polyfill) for specific info.

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

Injects the polyfill file at the same level as your manifest. Suppose you have background or content scripts declared in your manifest file. In that case, a link to the polyfill will also be provided by adding it to the manifest.
## API

### new BrowserExtensionPolyfill(manifestFilePath)

#### manifestFilePath

Type: `string`

Path to your browser extension manifest file.

## License

MIT (c) Cezar Augusto.
