// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an Apache 2.0-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

// Identify DOIs on a webpage
const doiRegex = /\b10\.\d+\.\d+\/\d+\b/g;
let bodyText = document.body.innerHTML;

let match;
while ((match = doiRegex.exec(bodyText)) !== null) {
    const doi = match[0];
    const highlightedDOI = `
        <span style='color: white; background-color:#ea512a;'>
            ${doi}
        </span>
        <button id='d${doi}' class='doiButton' style='background-color: #ea512a;'>
            DOI
        </button>
        <button id='${doi}' class='evaluateButton' style='background-color: #20a5db;'>
            Evaluate
        </button>
    `;
    bodyText = bodyText.replace(doi, highlightedDOI);
}

document.body.innerHTML = bodyText;

// Add event listeners to buttons
const doiButtons = document.getElementsByClassName('doiButton');
Array.from(doiButtons).forEach(button => {
    button.onclick = function() { window.location.href = `https://doi.org/${button.id.slice(1)}`; };
});

const evaluateButtons = document.getElementsByClassName('evaluateButton');
Array.from(evaluateButtons).forEach(button => {
    button.onclick = function() { 
        chrome.runtime.sendMessage({doi: button.id}, function(response) {
            document.getElementById("evaluation").innerHTML = `<br>🎓️ Evaluation score: <br><br>${response.data["score"]}/22`;
        });
    };
});
