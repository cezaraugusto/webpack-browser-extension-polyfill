const path = require('path')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

function resolvePolyfillPath (manifestPath) {
  // Returns the path relative to the extension
  return path.resolve(
    manifestPath,
    path.basename(webextensionPolyfill)
  )
}

function resolvePolyfillPathRelative (manifestPath) {
  const polyfillPath = path.resolve(
    path.dirname(manifestPath),
    path.basename(webextensionPolyfill)
  )

  // Returns the path relative to the extension
  return path.relative(path.dirname(manifestPath), polyfillPath)
}

module.exports = {
  resolvePolyfillPath,
  resolvePolyfillPathRelative
}
