import webpack, {type Compiler} from 'webpack'

interface PolyfillPluginInterface {
  manifestPath: string
  browser?: string
}

/**
 * PolyfillPlugin is responsible for providing the `browser`
 * global variable to the extension's codebase.
 */
export default class BrowserExtensionPolyfill {
  public readonly manifestPath: string
  public readonly browser?: string

  constructor(options: PolyfillPluginInterface) {
    this.manifestPath = options.manifestPath
    this.browser = options.browser
  }

  apply(compiler: Compiler) {
    new webpack.ProvidePlugin({
      browser: require.resolve('webextension-polyfill')
    }).apply(compiler)
  }
}
