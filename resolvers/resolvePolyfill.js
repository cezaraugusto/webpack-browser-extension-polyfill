const path = require('path')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

function resolvePolyfillPath (manifestPath) {
  // Returns the path relative to the extension
  return path.resolve(
    path.dirname(manifestPath),
    path.basename(webextensionPolyfill)
  )
}

function resolvePolyfillPathRelative (manifestPath) {
  const polyfillPath = resolvePolyfillPath(manifestPath)

  // Returns the path relative to the extension
  return path.relative(path.dirname(manifestPath), polyfillPath)
}

function resolvePolyfillPathRelativeToFile (manifestPath, filePath) {
  console.log('AJHGHU23G23UY2U32Y32U32UY23672376236723762376', {manifestPath, filePath})
  return path.relative(
    path.dirname(filePath),
    resolvePolyfillPath(manifestPath)
  )
}

module.exports = {
  resolvePolyfillPath,
  resolvePolyfillPathRelative,
  resolvePolyfillPathRelativeToFile
}
