// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an Apache 2.0-style
// license that can be found in the LICENSE file or at
// https://github.com/MaastrichtU-Library/the-FAIR-extension/blob/main/LICENSE

async function highlightSearchTerms()
{
  try {

    //Use html to find DOI's using regular expression
    var bodyText = document.body.innerHTML; 
    var searchTerm = "doi";
    var end = "</p>";
    //HTML code used to highlight DOI's
    var highlightStartTag = "<font style= \"color: white; background-color:#ea512a;\">";
    var highlightEndTag = "</font>";
   
    //Find dois in HTML code and add to array 
    const dois = [];
    var index = 0;
    var newText = "";
    var i = -1;
    var lcSearchTerm = searchTerm.toLowerCase();
    var lcBodyText = bodyText.toLowerCase();
    var check = searchTerm.length;
    while (bodyText.length > 0) {
      i = lcBodyText.indexOf(lcSearchTerm, i+1);
      if (i < 0) {
        newText += bodyText;
        bodyText = "";
      } else {
        // skip anything inside an HTML tag
        if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
          // skip anything inside a <script> block
          if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
            while(bodyText.substr(i,check).includes("<") == false){
              check += 1 ; 
            }
            var text = bodyText.substr(i,check);
            // regular expression for DOI's
            var info = text.match(/\b10\.(\d+\.*)+[\/](([^\s\.])+\.*)+\b/);
            // highlight DOI's if any are found
            if(info != null){
              console.log(info[0])
              var id = bodyText.substr(i+info.index, info[0].length )
              // Adds two buttons next to DOI, for redirection to DOI and for FAIR evaluation
              var DOI = "<button  id=\"d"+ id+"\" style= \" background-color: #ea512a; border: none; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 8px; margin: 4px 2px; cursor: pointer; font-family: Open Sans;\"> DOI</button>"
              var eval = "<button id=\""+ id+"\" style= \" background-color: #20a5db; border: none; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 8px; margin: 4px 0px; cursor: pointer; font-family: Open Sans;\"> Evaluate</button>"
              // adds the highlight tags in addition to the buttons
              newText += bodyText.substr(0, i+info.index) + highlightStartTag +  bodyText.substr(i+info.index, info[0].length )+highlightEndTag + DOI + eval  ;
              dois[index] = bodyText.substr(i+info.index, info[0].length );
              index++;
            }
            else{
              //if no DOI is found, the text is left as it is
              newText += bodyText.substr(0, check-1);
            }
            bodyText = bodyText.substr(i + check-1);
            lcBodyText = bodyText.toLowerCase();
            i = -1;
            check = searchTerm.length;

          }
        }
      }
    }
    // set the new highlighted text as the new document's HTML
    document.body.innerHTML = newText;
    // assign onclick function for list of DOI's
    for (let i = 0; i < dois.length; i++) {
      document.getElementById("d"+dois[i]).onclick = function () { dir_url(dois[i]); };
      document.getElementById(dois[i]).onclick = function () { sendCurrent(dois[i]); };

    }

    
  }


  

    
    
 catch (error) {
    throw error;
}
  
 
}
//Redirect user to the DOI
function dir_url(id){
  chrome.runtime.sendMessage({redirect:"https://doi.org/" + id  });
}
//Send
function sendCurrent(id){
  chrome.runtime.sendMessage({
    data: id // send data to background
  });
  document.getElementById(id).innerText ="Open the extension for results";
}
// initiates functions when a website is visited
highlightSearchTerms();




