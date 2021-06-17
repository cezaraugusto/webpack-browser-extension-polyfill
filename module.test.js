/* global jest, describe, test, beforeAll, expect */

const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

const config = require('./tests/fixtures/webpack.config')

const manifestPath = path.resolve(__dirname, 'tests/fixtures/manifest.json')
const manifest = require(manifestPath)
const polyfill = 'browser-polyfill.min.js'

// Mock Chrome so we don't need to have it open for each run
jest.mock('webpack-run-chrome-extension')

describe('WebpackBrowserExtensionPolyfill', () => {
  describe('actionable scenarios', () => {
    beforeAll(() => {
      webpack(config)
    })

    test('copy the polyfill file in the same level as the extension manifest', () => {
      const polyfillPath = path.resolve(path.dirname(manifestPath), polyfill)

      expect(fs.existsSync(polyfillPath)).toBe(true)
    })

    test('add a polyfill to manifest content scripts field if needed', () => {
      expect(Array.isArray(manifest.content_scripts)).toBe(true)
      expect(manifest.content_scripts[0].js[0]).toBe(polyfill)
    })

    test('add a polyfill to manifest background scripts field if needed', () => {
      expect(Array.isArray(manifest.background.scripts)).toBe(true)
      expect(manifest.background.scripts[0]).toBe(polyfill)
    })

    test.todo('add a script tag to the backgroud page if needed')
    test.todo('add a script tag to the bookmarks page if needed')
    test.todo('add a script tag to the devtools page if needed')
    test.todo('add a script tag to the history page if needed')
    test.todo('add a script tag to the newtab page if needed')
    test.todo('add a script tag to the options page if needed')
    test.todo('add a script tag to the popup page if needed')
  })

  describe('non-actionable scenarios', () => {
    test.todo('does not add a polyfill to manifest content scripts field if not needed')
    test.todo('does not add a polyfill to manifest background scripts field if not needed')
    test.todo('does not add a script tag to the backgroud page if not needed')
    test.todo('does not add a script tag to the bookmarks page if not needed')
    test.todo('does not add a script tag to the devtools page if not needed')
    test.todo('does not add a script tag to the history page if not needed')
    test.todo('does not add a script tag to the newtab page if not needed')
    test.todo('does not add a script tag to the options page if not needed')
    test.todo('does not add a script tag to the popup page if not needed')
  })
})
