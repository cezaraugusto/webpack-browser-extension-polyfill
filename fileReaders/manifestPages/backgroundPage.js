const fs = require('fs')
const path = require('path')
const readline = require('readline')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.page
  ) return []

  const backgroundPageScript = path.resolve(
    path.dirname(manifestPath),
    manifest.background.page
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(backgroundPageScript)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of lines) {
    // Ensure polyfill is added for each file that needs it
    const input = line.match(/<\/head>/)

    if (input) {
      const [, source] = input

      patternsArray.push(source)
    }
  }

  // Do nothing for empty results
  if (patternsArray.length === 0) return []

  const resolvedBackgroundPageScript = patternsArray
    .map(script => path.resolve(path.dirname(backgroundPageScript), script))

  return [
    webextensionPolyfill,
    resolvedBackgroundPageScript
  ]
}
