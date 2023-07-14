// Copyright 2023 Maastricht University Library

// Use of this source code is governed by an Apache 2.0-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

async function highlightSearchTerms() {
  try {
    let bodyText = document.body.innerHTML; 
    const searchTerm = "doi";
    const highlightStartTag = "<font style= \"color: white; background-color:#ea512a;\">";
    const highlightEndTag = "</font>";
    
    const dois = [];
    const doiRegex = /\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/gi;

    let match;
    while ((match = doiRegex.exec(bodyText)) !== null) {
      const id = match[0];
      dois.push(id);

      // Adds two buttons next to DOI, for redirection to DOI and for FAIR evaluation
      const DOI = `<button id="d${id}" style="background-color: #ea512a; border: none; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 8px; margin: 4px 2px; cursor: pointer; font-family: Open Sans;">DOI</button>`;
      const evalButton = `<button id="${id}" style="background-color: #20a5db; border: none; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 8px; margin: 4px 0px; cursor: pointer; font-family: Open Sans;">Evaluate</button>`;
      // highlights DOI and adds the buttons
      const replacement = `${highlightStartTag}${id}${highlightEndTag}${DOI}${evalButton}`;
      bodyText = bodyText.substring(0, match.index) + replacement + bodyText.substring(match.index + id.length);
      
      // adjust the last index of regex due to the addition of replacement string
      doiRegex.lastIndex += replacement.length - id.length;
    }
    
    document.body.innerHTML = bodyText;
    
    // assign onclick function for list of DOI's
    for (let i = 0; i < dois.length; i++) {
      document.getElementById("d"+dois[i]).onclick = function () { dir_url(dois[i]); };
      document.getElementById(dois[i]).onclick = function () { sendCurrent(dois[i]); };
    }
  } catch (error) {
    console.error(error);
  }
}

function dir_url(id){
  chrome.runtime.sendMessage({redirect:"https://doi.org/" + id  });
}

function sendCurrent(id){
  chrome.runtime.sendMessage({
    data: id // send data to background
  });
  document.getElementById(id).innerText = "Open the extension for results";
}

highlightSearchTerms();
