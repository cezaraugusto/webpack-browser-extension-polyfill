const path = require('path')

const BrowserExtensionPolyfill = require('webpack-browser-extension-polyfill')
const OpenChromeExtension = require('webpack-run-chrome-extension')

module.exports = {
  cache: false,
  mode: 'development',
  watch: true,
  entry: {
    custom: [
      path.resolve(__dirname, '../fixtures/src/custom.js')
    ]
  },
  plugins: [
    new BrowserExtensionPolyfill({
      manifestPath: path.resolve(__dirname, '../fixtures/manifest.json')
    }),
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, '../fixtures')
    })
  ]
}
