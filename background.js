// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

// Allows communication between background.js and bundle.js

//listener that recieves messages from contnet script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        //Stores the list of DOI's in chrome storage with key: "key"
        chrome.storage.local.set({key: request.data}, function() {
          });
    }
);