
const copyPolyfillToProject = require('./steps/copyPolyfillToProject')
const writePolyfillToScripts = require('./steps/writePolyfillToManifestScripts')
const writeScriptTagToPage = require('./steps/writeScriptTagToPage')
const manifestPages = require('./fileReaders/manifestPages')
class BrowserExtensionPolyfill {
  constructor ({extensionPath}) {
    // User-defined options
    this.extensionPath = extensionPath
  }

  apply (compiler) {
    if (!this.extensionPath) throw new Error('An extension path is required.')

    compiler.hooks.done.tapAsync(
      'webpack-browser-extension-polyfill',
      async (_, done) => {
        // During compilation, write to disk the polyfill and set it
        // into background and content scripts accordingly.
        copyPolyfillToProject(this.extensionPath)
        writePolyfillToScripts(this.extensionPath)

        const pagesDeclared = manifestPages(this.extensionPath)

        // For each page declared in the manifest file,
        // we want to have a script tag pointing to the polyfill
        for (const pathToPageDeclared of pagesDeclared) {
          writeScriptTagToPage(this.extensionPath, pathToPageDeclared)
        }
        done()
      }
    )
  }
}

module.exports = BrowserExtensionPolyfill
