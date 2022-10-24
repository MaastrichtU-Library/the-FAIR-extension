// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an Apache 2.0-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

// Original version of bundle.js

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function fair(id){
 // posts evaluation using the doi and the FAIR api
 var url = "https://api.fair-enough.semanticscience.org/evaluations";
 var url2 = "https://doi.org/" + id ; 
 var xhr = new XMLHttpRequest();
 xhr.open("POST", url);
 xhr.setRequestHeader("accept", "application/json");
 xhr.setRequestHeader("Content-Type", "application/json");

 xhr.onreadystatechange = function () {
  //If response is successful
    if (xhr.readyState === 4) {
       var data=xhr.responseText;
       var jsonResponse = JSON.parse(data);
       //Add evaluation score
       document.getElementById("evaluation").innerHTML = "<br>🎓️ Evaluation score: <br><br>"+jsonResponse["score"]+"/22";
       //Add score percentage
       document.getElementById("score").ariaValueNow = jsonResponse["score_percent"].toString()+"=";
       //Turn into rounded percentage as style only takes integers
       let percent = Math.round(jsonResponse["score_percent"]).toString();
       document.getElementById("score").style = "--value:"+percent;

       //Add successful results
       var url =  "https://w3id.org/fair-enough/metrics/tests/";
       var testurl = "http://semanticscience.org/resource/SIO_000300";


       var find = ["f1-data-identifier-persistent","f1-metadata-identifier-persistent","f1-metadata-identifier-unique","f2-grounded-metadata" ,"f2-structured-metadata" , "f3-data-identifier-in-metadata" ,"f3-metadata-identifier-in-metadata","f4-searchable" ] 
       var findStatement = ["F1 - Data identifier is persistent", "F1 - Resource identifier is persistent", "F1 - Resource metadata identifier is unique", "F2 - Metadata is grounded and machine-readable" , "F2 - Metadata is structured" , "F3 - Data identifier explicitly in metadata", "F3 - Metadata identifier explicitly in metadata", "F4 - The resource is indexed in a searchable resource"];
       

       var access  = ["a1-metadata-protocol","a1-data-protocol","a1-data-authorization","a1-metadata-authorization","a2-metadata-persistent"]

       var accessState  = ["A1.1 - Metadata uses an open free protocol for metadata retrieval", "A1.1 - Uses an open free protocol for data retrieval", "A1.2 - Data authentication and authorization" , "A1.2 - Metadata authentication and authorization", "A2 - Metadata is persistent"]

       var inter =  ["i1-data-knowledge-representation-semantic", "i1-data-knowledge-representation-structured" , "i1-metadata-knowledge-representation-semantic", "i1-metadata-knowledge-representation-structured","i2-fair-vocabularies-known","i2-fair-vocabularies-resolve","i3-metadata-contains-outward-links"]

       var interState = ["I1 - Data uses a formal semantic knowledge representation language", "I1 - Data uses a formal structured knowledge representation language", "I1 - Metadata uses a formal semantic knowledge representation language", "I1 - Metadata uses a formal structured knowledge representation language", "I2 - Metadata uses FAIR Vocabularies registered in known repositories", "I2 - Metadata uses resolvable FAIR Vocabularies", "I3 - Metadata contains outward references"]
       var reuse =  ["r1-includes-license","r1-includes-standard-license"]

       var reuseState = ["R2 - Metadata include a License","R1 - Metadata includes a standard License"]

  
       
       
       
       
       
       //Findable
       for(let i=0;i<find.length;i++){
        if(jsonResponse["contains"][url+find[i]][0][testurl][0]["@value"]==1){
          document.getElementById("find").innerHTML += "<div  class=\"boxed3 center3\" style=\"background-color:white\">&nbsp ✅ &nbsp" + findStatement[i]+"</div>" 
      
        }
       }
       //accessible
       for(let i=0;i<access.length;i++){
        if(jsonResponse["contains"][url+access[i]][0][testurl][0]["@value"]==1){
          document.getElementById("access").innerHTML += "<div  class=\"boxed3 center3\" style=\"background-color:white\">&nbsp ✅ &nbsp" + accessState[i]+"</div>" 
      
        }
       }
       //inetroperable
       for(let i=0;i<inter.length;i++){
        if(jsonResponse["contains"][url+inter[i]][0][testurl][0]["@value"]==1){
          document.getElementById("inter").innerHTML += "<div  class=\"boxed3 center3\" style=\"background-color:white\">&nbsp ✅ &nbsp" + interState[i]+"</div>" 
      
        }
       }
       //Reusable 
       for(let i=0;i<reuse.length;i++){
        if(jsonResponse["contains"][url+reuse[i]][0][testurl][0]["@value"]==1){
          document.getElementById("reuse").innerHTML += "<div  class=\"boxed3 center3\" style=\"background-color:white\">&nbsp ✅ &nbsp" + reuseState[i]+"</div>" 
      
        }
       }
       //Clear storage when done to avoid wrong results in different pages
       chrome.storage.local.clear() 
       return [0,1];


    }};
 // data used to post request
 var data = `{
   "subject": "` + url2+`",
   "collection": "fair-enough-data"
 }`;
 
 xhr.send(data);

}






function getDoi() {
  // Retreive the DOI indicated by the user from chrome storage
      chrome.storage.local.get(['key'], async function(result) {
      //Check if there are any DOI's in the storage
      if(result.key != null){ 
      //Let the user know evaluation is under process        
      document.getElementById("evaluation").innerText = "🎓️Evaluation under process";
      //Start the evaluation
      const results = await fair(result.key);
      
      }

      
  
      
  
    });
  
  }


// initiates popup functions
getDoi();