const fs = require('fs')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

const {resolvePolyfillPath} = require('../resolvers/resolvePolyfill')

module.exports = function (manifestPath) {
  const scriptPathWithPolyfill = resolvePolyfillPath(manifestPath)

  console.log('fired1', scriptPathWithPolyfill)
  // If there is a polyfill already, don't try to add a new one
  if (fs.existsSync(scriptPathWithPolyfill)) return
  console.log('fired2')
  fs.copyFileSync(
    webextensionPolyfill,
    scriptPathWithPolyfill,
    // Ensure a new copy fails if destination already exists
    fs.constants.COPYFILE_EXCL
  )
}
