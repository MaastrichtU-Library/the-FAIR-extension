// Copyright 2023 Maastricht University Library

// Use of this source code is governed by an Apache 2.0-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

// Allows communication between .js files

//listener that recieves messages from contnet script
chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.redirect) {
    // Redirects to a specified URL
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
  } else if (request.data) {
    // Stores the list of DOI's in chrome storage with key: "key"
    chrome.storage.local.set({key: request.data});
  }
});