const path = require('path')

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
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, '../fixtures')
    })
  ]
}
