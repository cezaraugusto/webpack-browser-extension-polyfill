const path = require('path')

const resolveManifest = require('../../resolvers/resolveManifest')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.chrome_url_overrides ||
    !manifest.chrome_url_overrides.newtab
  ) return []

  const filePath = path.resolve(
    path.dirname(manifestPath),
    manifest.chrome_url_overrides.newtab
  )

  return filePath
}
