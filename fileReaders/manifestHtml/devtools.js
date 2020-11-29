const fs = require('fs')
const path = require('path')
const readline = require('readline')

const webextensionPolyfill = require
  .resolve('webextension-polyfill/dist/browser-polyfill.min')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return []

  const devtools = path.resolve(
    path.dirname(manifestPath),
    manifest.devtools_page
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(devtools)
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

  const resolvedDevtools = patternsArray
    .map(script => path
      .resolve(path.dirname(devtools), script))

  return [
    webextensionPolyfill,
    resolvedDevtools
  ]
}
