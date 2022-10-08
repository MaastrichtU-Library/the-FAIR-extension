// Copyright 2022 Maastricht University Library

// Use of this source code is governed by an MIT-style
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
    var highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
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
            // regular expression
            var info = text.match(/\b10\.(\d+\.*)+[\/](([^\s\.])+\.*)+\b/);
            // highlight DOI's if any are found
            if(info != null){
              console.log(info[0])
              newText += bodyText.substr(0, i+info.index) + highlightStartTag +  bodyText.substr(i+info.index, info[0].length ) + highlightEndTag  ;
              dois[index] = bodyText.substr(i+info.index, info[0].length );
              index++;
            }
            else{
              newText += bodyText.substr(0, i) + bodyText.substr(i, check-1) ;
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
    // Send DOI's to Background json as a message
    chrome.runtime.sendMessage({
      data: dois // send data to background
    });

    return dois;
  }


  

    
    
 catch (error) {
    throw error;
}
  
 
}


// initiates functions when a website is visited
highlightSearchTerms();




