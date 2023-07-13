
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.fair-enough.semanticscience.org/evaluations', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        sendResponse({data: jsonResponse});
      }
    };
    var data = JSON.stringify({
      'subject': 'https://doi.org/' + request.doi,
      'collection': 'fair-enough-data'
    });
    xhr.send(data);
    return true; // keeps the message channel open until sendResponse is called
  });
  