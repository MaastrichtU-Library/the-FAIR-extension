
// Original version of bundle.js

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//function that gets id of the button (DOI) and posts an evaluation of the DOI
function test(id){
  // Adds loading sign when button is pressed
  document.getElementById(id).innerText ="Loading..";
  // posts evaluation using the doi
  var url = "https://api.fair-enough.semanticscience.org/evaluations";
  var url2 = "https://doi.org/" + id ; 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        // leads the user to the evaluation page by opening a new tab with the results
        var data=xhr.responseText;
        var jsonResponse = JSON.parse(data);
        chrome.tabs.create({active: true, url: jsonResponse["@id"]});


     }};
  // data used to post request
  var data = `{
    "subject": "` + url2+`",
    "collection": "fair-enough-data"
  }`;
  
  xhr.send(data);
  
}



function getDois() {
// Retreive list of DOI's from chrome storage
  chrome.storage.local.get(['key'], function(result) {
    const dois = result.key;
    // Add DOI's to the extension's popup
    for (let i = 0; i < dois.length; i++) {
      var node = document.createElement('li');
      node.innerHTML = '<a href="' + "https://doi.org/" + dois[i]+  '">' + dois[i] + '</a>';
      // creates button that allows user to check Fair evaluations
      let btn = document.createElement("button"); 
      btn.appendChild(document.createTextNode("Fair?"))
      btn.id = dois[i];
      node.appendChild(btn);
      document.querySelector('ul').appendChild(node);
      document.getElementById(dois[i]).onclick = function () { test(dois[i]); };
    }

  });

}
// initiates popup functions
getDois();