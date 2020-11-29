const {resolvePolyfillPathRelative} = require('../../resolvers/resolvePolyfill')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.content_scripts ||
    !manifest.content_scripts[0].js
  ) return []

  const polyfillPath = resolvePolyfillPathRelative(manifestPath)
  const contentScripts = manifest.content_scripts[0]

  // Don't try to add a new polyfill if user has one already
  if (
    contentScripts.js.includes(polyfillPath) ||
    contentScripts.js.some(script => script.startsWith('browser-polyfill'))
  ) return []

  return {
    content_scripts: [
      {
        ...contentScripts,
        js: [
          resolvePolyfillPathRelative(manifestPath),
          ...contentScripts.js
        ]
      }
    ]
  }
}
