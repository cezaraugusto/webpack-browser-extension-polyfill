/* global describe, test, expect */
const path = require('path')

const webpack = require('webpack')

const {config, manifestPath} = require('./tests/fixtures/webpack.config')

describe('WebpackBrowserExtensionPolyfill', () => {
  test(
    'copy the polyfill file in the same level as the extension manifest',
    (cb) => {
      webpack(config, (error, stats) => {
        if (error) console.error(error)
        if (stats.hasErrors()) console.log(stats.toString())

        const pathToManifest = path.resolve(manifestPath)
        const manifest = require(pathToManifest)

        expect(Array.isArray(manifest.background.scripts)).toBe(true)
        expect(manifest.background.scripts[0]).toBe('background.js')
        cb()
      })
    }
  )
  test.todo('add a polyfill to manifest content scripts field if needed')
  test.todo('does not add a polyfill to manifest content scripts field if not needed')
  test.todo('add a polyfill to manifest background scripts field if needed')
  test.todo('does not add a polyfill to manifest background scripts field if not needed')
  test.todo('add a script tag to the backgroud page if needed')
  test.todo('does not add a script tag to the backgroud page if not needed')
  test.todo('add a script tag to the bookmarks page if needed')
  test.todo('does not add a script tag to the bookmarks page if not needed')
  test.todo('add a script tag to the devtools page if needed')
  test.todo('does not add a script tag to the devtools page if not needed')
  test.todo('add a script tag to the history page if needed')
  test.todo('does not add a script tag to the history page if not needed')
  test.todo('add a script tag to the newtab page if needed')
  test.todo('does not add a script tag to the newtab page if not needed')
  test.todo('add a script tag to the options page if needed')
  test.todo('does not add a script tag to the options page if not needed')
  test.todo('add a script tag to the popup page if needed')
  test.todo('does not add a script tag to the popup page if not needed')
})
