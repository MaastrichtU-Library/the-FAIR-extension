// Allows communication between background.js and bundle.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        //Stores the list of DOI's in chrome storage with key: "key"
        chrome.storage.local.set({key: request.data}, function() {
          });
    }
);