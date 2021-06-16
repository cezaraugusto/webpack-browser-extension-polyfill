const fs = require('fs')
const path = require('path')
const {parse} = require('node-html-parser');

const resolveManifest = require('../resolvers/resolveManifest')
const {resolvePolyfillPathRelativeToFile} = require('../resolvers/resolvePolyfill')

module.exports = function (extensionPath, filePath) {
  // Do nothing if there's nothing to do ;P
  if (Array.isArray(filePath)) return

  const manifestPath = resolveManifest(extensionPath)
  const polyfillPath = resolvePolyfillPathRelativeToFile(manifestPath, filePath)

  const polyfillPathRelativeToFile = path.relative(
    path.dirname(filePath),
    polyfillPath
  )

  const polyfillTag = `<script src="${polyfillPathRelativeToFile}"></script>`

  fs.readFile(filePath, 'utf8', (err, html)=>{
    if(err) throw new Error(err)

    const root = parse(html, {comment: true});

    const body = root.querySelector('body');
    const firstScript = root.querySelectorAll('script')[0];

    // Nothing to do if file has no way to inject scripts as we want
    if (!firstScript || !body) return

    // If file has any scripts declared, ensure the polyfill
    // is added before them.
    if (firstScript) {
      const scriptSource = firstScript.getAttribute('src')

      // Sometimes users forget to close the tag and we don't
      // want to break because of it. Throw an error instead.
      if (!scriptSource) throw new Error(`Invalid script tag found in ${filePath}`)

      // Do not try to add the polyfill if one exists already
      if (scriptSource === polyfillPathRelativeToFile) return

      // Do not try to add the polyfill if project has done it differently
      if (scriptSource.includes('browser-polyfill')) return

      // Actually inject the tag into the project's file
      firstScript.insertAdjacentHTML('beforebegin', polyfillTag + '\n');
    }

    // If file has no scripts we just add it before the ending body tag.
    if (!firstScript) {
      body.insertAdjacentHTML('beforeend', polyfillTag + '\n');
    }

    // Override user's file
    fs.writeFile(filePath, root, 'utf8', (error) => {
      if (error) return console.log(error);
    });
  });
}
