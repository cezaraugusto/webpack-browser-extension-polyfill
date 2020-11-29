const fs = require('fs')
const path = require('path')
const readline = require('readline')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.chrome_url_overrides ||
    !manifest.chrome_url_overrides.history
  ) return []

  const historyOverride = path.resolve(
    path.dirname(manifestPath),
    manifest.chrome_url_overrides.history
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(historyOverride)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of lines) {
    // Ensure line is a valid script element w/ a resource
    const input = line
      .match(/<script.*?\s+src=(?:'|")([^'">]+)(?:'|")/)

    if (input) {
      const [, source] = input

      patternsArray.push(source)
    }
  }

  // Do nothing for empty results
  if (patternsArray.length === 0) return []

  const resolvedHistoryOverride = patternsArray
    .map(script => path
      .resolve(path.dirname(historyOverride), script))

  return [
    webextensionPolyfill,
    resolvedHistoryOverride
  ]
}
