const path = require('path')

const copyPolyfillToProject = require('./steps/copyPolyfillToProject')
const writePolyfillToScripts = require('./steps/writePolyfillToManifestScripts')
const writeScriptTagToPage = require('./steps/writeScriptTagToPage')
const manifestPages = require('./fileReaders/manifestPages')

class BrowserExtensionPolyfill {
  constructor ({manifestPath}) {
    // User-defined options
    this.manifestPath = manifestPath
  }

  apply (compiler) {
    if (!this.manifestPath) throw new Error('An manifest path is required.')

    const extensionPath = path.dirname(this.manifestPath)

    compiler.hooks.thisCompilation.tap(
      'webpack-browser-extension-polyfill',
      () => {
        // During compilation, write to disk the polyfill and set it
        // into background and content scripts accordingly.
        copyPolyfillToProject(extensionPath)
        writePolyfillToScripts(extensionPath)

        const pagesDeclared = manifestPages(extensionPath)

        // For each page declared in the manifest file,
        // we want to have a script tag pointing to the polyfill
        for (const pathToPageDeclared of pagesDeclared) {
          writeScriptTagToPage(extensionPath, pathToPageDeclared)
        }
      }
    )
  }
}

module.exports = BrowserExtensionPolyfill
