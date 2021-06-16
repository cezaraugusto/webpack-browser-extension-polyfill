const path = require('path')

const resolveManifest = require('../../resolvers/resolveManifest')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.page
  ) return []

  const filePath = path.resolve(
    path.dirname(manifestPath),
    manifest.background.page
  )

  return filePath
}
