const path = require('path')

const OpenChromeExtension = require('webpack-run-chrome-extension')

const BrowserExtensionPolyfill = require('../module')

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
