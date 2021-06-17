/* global browser */
// Adapted from
// https://github.com/mdn/webextensions-examples/blob/master/bookmark-it
// Released under Mozilla Public License 2.0

let currentTab
let currentBookmark

/*
 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 */
function updateIcon () {
  browser.browserAction.setIcon({
    path: currentBookmark
      ? {
          19: '../public/star-filled-19.png',
          38: '../public/star-filled-38.png'
        }
      : {
          19: '../public/star-empty-19.png',
          38: '../public/star-empty-38.png'
        },
    tabId: currentTab.id
  })
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentBookmark ? 'Unbookmark it!' : 'Bookmark it!',
    tabId: currentTab.id
  })
}

/*
 * Add or remove the bookmark on the current page.
 */
function toggleBookmark () {
  if (currentBookmark) {
    browser.bookmarks.remove(currentBookmark.id)
  } else {
    browser.bookmarks.create({title: currentTab.title, url: currentTab.url})
  }
}

browser.browserAction.onClicked.addListener(toggleBookmark)

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateActiveTab () {
  function isSupportedProtocol (urlString) {
    const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:']
    const url = document.createElement('a')

    url.href = urlString

    return supportedProtocols.indexOf(url.protocol) !== -1
  }

  function updateTab (tabs) {
    if (tabs[0]) {
      currentTab = tabs[0]
      if (isSupportedProtocol(currentTab.url)) {
        const searching = browser.bookmarks.search({url: currentTab.url})

        searching.then((bookmarks) => {
          currentBookmark = bookmarks[0]
          updateIcon()
        })
      } else {
        console.log(`Bookmark it! does not support the '${currentTab.url}' URL.`)
      }
    }
  }

  const gettingActiveTab = browser.tabs
    .query({active: true, currentWindow: true})

  gettingActiveTab.then(updateTab)
}

// Listen for bookmarks being created
browser.bookmarks.onCreated.addListener(updateActiveTab)

// Listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(updateActiveTab)

// Listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab)

// Listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab)

// Listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab)

// Update when the extension loads initially
updateActiveTab()
