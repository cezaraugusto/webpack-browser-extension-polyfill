const path = require('path')

const OpenChromeExtension = require('webpack-run-chrome-extension')

module.exports = {
  cache: false,
  mode: 'development',
  watch: true,
  entry: {
    custom: [
      path.resolve(__dirname, './demo-extension/custom/custom.js')
    ]
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './demo-extension')
    })
  ]
}
