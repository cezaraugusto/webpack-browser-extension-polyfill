const {resolvePolyfillPathRelative} = require('../../resolvers/resolvePolyfill')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.scripts
  ) return []

  const polyfillPath = resolvePolyfillPathRelative(manifestPath)
  const background = manifest.background

  // Don't try to add a new polyfill if user has one already
  if (
    background.scripts.includes(polyfillPath) ||
    background.scripts.some(script => script.startsWith('browser-polyfill'))
  ) return []

  return {
    background: {
      ...background,
      scripts: [
        resolvePolyfillPathRelative(manifestPath),
        ...background.scripts
      ]
    }
  }
}
