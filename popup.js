// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

// Original version of bundle.js

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//function that gets id of the button (DOI) and posts an evaluation of the DOI
function fair(id){
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

function viewScore(id){
  chrome.tabs.create({active: true, url: id});
}
function fair2(id){
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
       //chrome.tabs.create({active: true, url: jsonResponse["@id"]});
       document.getElementById("node"+id).innerHTML = '<a DOI:  href="' + "https://doi.org/" + id+  '">' + id + '<br/><br/> </a>';
       document.getElementById("node"+id).innerHTML += "<a> Score: " + jsonResponse["score"] +'/20 </a>';
       let btn = document.createElement("button"); 
       btn.appendChild(document.createTextNode("View score"))
       btn.id = id;
       document.getElementById("node"+id).appendChild(btn);
       document.getElementById(id).onclick = function () { viewScore(jsonResponse["@id"]); };
  
       return [0,1];


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
  chrome.storage.local.get(['key'], async function(result) {
    const dois = result.key;
    const results = await fair2(dois[0]);
    // add score for first element
    if(dois.length>=1){
      var node = document.createElement('li');
      node.innerHTML = '<a> Please wait for the evaluation </a>';
      node.id = "node" + dois[0];
      // creates button that allows user to check Fair evaluations
      document.querySelector('ul').appendChild(node);

    }

    // Add DOI's to the extension's popup
    for (let i = 1; i < dois.length; i++) {
      var node = document.createElement('li');
      node.innerHTML = '<a href="' + "https://doi.org/" + dois[i]+  '">' + dois[i] + '</a>';
      // creates button that allows user to check Fair evaluations
      let btn = document.createElement("button"); 
      btn.appendChild(document.createTextNode("Fair?"))
      btn.id = dois[i];
      node.appendChild(btn);
      document.querySelector('ul').appendChild(node);
      document.getElementById(dois[i]).onclick = function () { fair(dois[i]); };
    }

  });

}
// initiates popup functions
getDois();