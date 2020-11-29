const copyPolyfillToProject = require('./steps/copyPolyfillToProject')
const writePolyfillToScripts = require('./steps/writePolyfillToScripts')
// Const writeScriptTagToPages = require('./steps/writeScriptTagToPages')

class BrowserExtensionPolyfill {
  constructor (extensionPath) {
    // User-defined options
    this.extensionPath = extensionPath
  }

  apply (compiler) {
    if (!this.extensionPath) throw new Error('An extension path is required.')

    // During compilation, write to disk the polyfill and set it
    // into background and content scripts accordingly.
    compiler.hooks.compilation.tap(
      'webpack-browser-extension-polyfill',
      (_) => {
        copyPolyfillToProject(this.extensionPath)
        writePolyfillToScripts(this.extensionPath)
        // WriteScriptTagToPages(this.extensionPath)
      }
    )
  }
}

module.exports = BrowserExtensionPolyfill
