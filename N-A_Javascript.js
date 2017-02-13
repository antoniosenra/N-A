console.log("testing console log");

//We started by testing the console log, to make sure we could test each individual step we added to our code.

function loadDoc() {

//The loadDoc function is the function that calls the API.

  var xhttp = new XMLHttpRequest();

//The reaason we are using an XMLHttpRequest is that it allows us to (1) update a web page without reloading the page, (2) request data from a server after the page has loaded,
//(3) receive data from a server after the page has loaded, (4) send data to a server in the background. These combine to allow a user to get quicker results when they search,
//and without having to see the page completely refresh. See http://www.w3schools.com/xml/dom_httprequest.asp.

  var url =  "https://haveibeenpwned.com/api/v2/breachedaccount/";

//The url variable will be used later on to call the API.

  if (document.getElementById("checkEmail").value == "") {
    var email = "{empty}";

//By giving "email" the value "empty," if the user doesn't input anything into the search box, then later in the code we can produce a more appropriate error message
//if the user clicks "search" before they've entered anything in. See line 48 below.

  }
  else {

//This is the code that will run if there is content in the search box. Understand the components of "document.getElementById("checkEmail").value"

    var email = document.getElementById("checkEmail").value;

//document.getElementById("checkEmail").value is equal to whatever text the user input into the search box. If they input nothing, then the value is blank.

  }
  var checkUserURL = url + email;

//Below is the core code needed to run an XMLHttpRequest.

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

//If the readyState is 4 and the xhttp.status is 200, then we have a response from the API, and that response is "ready"

      writeData(xhttp.responseText);

//We created the writeData function later in our code, because we thought our code would be easier to read if we kept the block of code related to the writeData outisde of the block of code related to the XMLHttpRequest.

    }
    else if (xhttp.readyState == 4 && xhttp.status == 404){

//This section describes the error message that's produced if the API returns no results.

      if (email == "{empty}") {
          document.getElementById("breachInfo").innerHTML = "<h4>Please enter an email address and search again.</h4>"
      } else {
        console.log("The ready state test produced a 404.")
        document.getElementById("breachInfo").innerHTML = "<h4>Good news! \"" + email + "\" hasn't been compromised on any data breach we have information on.</h4>";
      }

//If the xhttp.status is anything other than 200 or 404, we aren't sure what exactly that could mean. For that reason, we have made it so that nothing happens. To the user,
//this means that clicking the "search" button won't change the page in any way.

    }
  };

  xhttp.open("GET", checkUserURL, true);
  xhttp.send();

//This finishes sending the XMLHttpRequest. See http://www.w3schools.com/xml/dom_httprequest.asp.

}

function writeData(response) {

//Is the writeData variable defined after it's used?? Also, what does JSON.parse do?

  var arr = JSON.parse(response);

//This JSON.parse turns the API output into a Javascript object. That allows us to select and modify particular sections of the API output.
//That's important because then we can deliver a more clear message to the user that explains the details of their compromised account. See below.

  console.log("This is the result of console logging the array:");
  console.log(arr);
  console.log("This is the length of the array:" + arr.length);

//I added these console logs so we could get an understanding of what the API returns.

//There is a variable just called "i" that isn't defined? What is the purpose of this? We should figure out how this works.

//It appears to be a variable created for counting purposes. It appears necessary to run the for/while loop that exists below.

  var email = document.getElementById("checkEmail").value;
  var out = "<h4>Unfortunately, \"" + email + "\" has been breached. Please see the details below.</h4>" + "<div class=\"breachEntries\">";
  for(i = 0; i < arr.length; i++) {
    out += "<div class=\"breachEntry\" id=\"breachEntry" + i + "\"><div class=\"breachDomain\"><strong>Domain of Breach:&nbsp;</strong>" + arr[i].Name +
    " (<a href=\"http://" + arr[i].Domain + "\" target=\"_blank\"><strong>http://" + arr[i].Domain + "</a></strong>)" +
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

//This for loop makes it so that for every object in the array, the variable "out" (which contains the output text we display to the user) is
//lengthened to reflect key information provided to us by HaveIBeenPwned. But because this only happens within the "writeData" function, it
//only happens if the API has something to output for the user. See line xx above.

  for(j = 0; j < arr.length; j++) {
      if (arr[j].Domain.includes("dropbox")) {
        console.log("Conditional is true " + arr[j].Domain)
        document.getElementById("breachLegalRecs").innerHTML = "The API output includes Dropbox."
      } else {
        console.log("Conditional is false " + arr[j].Domain);
      };
      if (arr[j].Domain.includes("linkedin")) {
        console.log("Conditional is true " + arr[j].Domain)
        document.getElementById("breachLegalRecs").innerHTML += " The API output includes LinkedIn."
      } else {
        console.log("Conditional is false " + arr[j].Domain);
      };
  };

//This for loop checks every object in the array to see if a particular breach is involved (Dropbox and LinkedIn). We don't have legal recommendations for ALL breaches,
//so it's important for us to determine whether a particular breach is involved. If it is, this for loop also provides the appropriate legal recommendations to the user.

}
function reloadMe() {
window.location = window.location.pathname;
}

//This function allows our "Clear results" button to function.
