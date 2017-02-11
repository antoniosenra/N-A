//We started by testing the console log, to make sure we could test each individual step we added to our code.

console.log("testing console log");

//The loadDoc function is the function that calls the API.

function loadDoc() {
  var xhttp = new XMLHttpRequest();

//This link describes the value of an XMLHttpRequest: http://www.w3schools.com/xml/dom_httprequest.asp

  var url =  "https://haveibeenpwned.com/api/v2/breachedaccount/";
  if (document.getElementById("checkEmail").value == "") {

//By giving "email" the value "${user.emailAddress}" you guarantee that an error message will be produced. But we should alter this so a more appropriate error message appears if a user doesn't fill in the input box.

    var email = "${user.emailAddress}";

  }
  else {

//Understand the components of "document.getElementById("checkEmail").value"

    var email = document.getElementById("checkEmail").value;
  }
  var checkUserURL = url + email;

//We have to understand what's going on in the lines below. From "xhttp.onreadystatechange" to "xhttp.send();"

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

//This appears to be the crucial move that causes our app to output the proper resopnse. We should know how this function works. It appears to use a function that hasn't been created yet (writeData). Is that right?
//Yes. Even though this function (writeData) hasn't been created yet, it still works. Generally speaking a JS function doesn't need to be created before it can be used. As long as it's created in the same file where it's used, it will work.

      writeData(xhttp.responseText);
    }
    else if (xhttp.readyState == 4 && xhttp.status == 404){

//This section describes the error message that's produced if the API returns no results.

      console.log("The ready state test produced a 404.")

      document.getElementById("breachInfo").innerHTML = "<h4><p>Good news! <span class=\"attention\">\"" + email + "\"</span> hasn't been compromised on any data breach we have information on.</p></h4>";
    }
  };

//This finishes sending the XMLHttpRequest. See http://www.w3schools.com/xml/dom_httprequest.asp.

  xhttp.open("GET", checkUserURL, true);
  xhttp.send();

//There doesn't appear to be a final "else." It goes from "if" to "else if" to nothing.
//What is the 'response" referring to? Is "response" defined somewhere else in the code?

}
function writeData(response) {

//Is the writeData variable defined after it's used?? Also, what does JSON.parse do?

  var arr = JSON.parse(response);

//I added this console log so we can get an understanding of what the API is

  console.log("This is the result of console logging the array:");
  console.log(arr);
  console.log("This is the length of the array:" + arr.length);

//There is a variable just called "i" that isn't defined? What is the purpose of this? We should figure out how this works.

//It appears to be a variable created for counting purposes. It appears necessary to run the for/while loop that exists below.

  var email = document.getElementById("checkEmail").value;

//What does the line directly below mean? What value does the "span class" attribute add?

//With each for loop, the "out" variaable is lengthened.

  var out = "<h4><span class=\"attention\">Unfortunately, it looks like \"" + email + "\" has been breached. </span>Please see the details below:</h4>" + "<div class=\"breachEntries\">";
  for(i = 0; i < arr.length; i++) {
    out += "<div class=\"breachEntry\" id=\"breachEntry" + i + "\"><div class=\"breachDomain\"><strong>Domain of Breach:&nbsp;</strong>" + arr[i].Name +
    "&nbsp;(<a href=\"http://" + arr[i].Domain + "\" target=\"_blank\"><strong>http://" + arr[i].Domain + "</a></strong>):&nbsp;" +
    "</div><div class=\"breachDesc\">" +
    arr[i].Description +
    "</div><div class=\"breachItems\"><strong>Breached Items:&nbsp;</strong>" +
    arr[i].DataClasses +
    "</div><div class=\"breachDate\"><strong>Breach Date:&nbsp;</strong>" +
    arr[i].BreachDate +
    "</div></div><hr>";
    }
  out += "</div>";
document.getElementById("breachInfo").innerHTML = out;
}
function reloadMe() {
window.location = window.location.pathname;
}
