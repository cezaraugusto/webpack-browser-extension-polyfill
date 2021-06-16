const fs = require('fs')

const resolveManifest = require('../resolvers/resolveManifest')
const resolveContentScripts = require('../fileReaders/manifestScripts/content')
const resolveBackgroundScripts = require('../fileReaders/manifestScripts/background')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifestJson = require(manifestPath)

  // Guarantee that the polyfill is well defined in the
  // manifest background scripts and content scripts fields.
  // Otherwise it won't work as it's not recognized as a valid script.
  const json = {
    ...manifestJson,
    ...resolveContentScripts(manifestPath),
    ...resolveBackgroundScripts(manifestPath)
  }

  // Write the manifest the paths needed for the polyfill to work.
  fs.writeFileSync(manifestPath, JSON.stringify(json, null, 2))
}
