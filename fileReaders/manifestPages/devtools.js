const path = require('path')

const resolveManifest = require('../../resolvers/resolveManifest')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return []

  const filePath = path.resolve(
    path.dirname(manifestPath),
    manifest.devtools_page
  )

  return filePath
}
