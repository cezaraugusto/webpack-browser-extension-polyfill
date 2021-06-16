const path = require('path')

const resolveManifest = require('../../resolvers/resolveManifest')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.browser_action ||
    !manifest.browser_action.default_popup
  ) return []

  const filePath = path.resolve(
    path.dirname(manifestPath),
    manifest.browser_action.default_popup
  )

  return filePath
}
