
async function highlightSearchTerms()
{
  try {
    //Use html to find DOI's using regular expression
    var bodyText = document.body.innerHTML; 
    var searchTerm = "doi";
    var end = "</p>";
    //HTML code to highlight DOI's
    var highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
    var highlightEndTag = "</font>";
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
    document.body.innerHTML = newText;
    chrome.runtime.sendMessage({
      data: dois // send data to background
    });

    return dois;
  }


  

    
    
 catch (error) {
    throw error;
}
  
 
}



highlightSearchTerms();




