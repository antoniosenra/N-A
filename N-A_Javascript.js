console.log("testing console log");

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var url =  "https://haveibeenpwned.com/api/v2/breachedaccount/";
  if (document.getElementById("checkEmail").value == "") {
  var email = "${user.emailAddress}";
  }
  else {
    var email = document.getElementById("checkEmail").value;
  }
  var checkUserURL = url + email;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      writeData(xhttp.responseText);
    }
    else if (xhttp.readyState == 4 && xhttp.status == 404){
    document.getElementById("breachInfo").innerHTML = "<h4><p>404 - No data returned for  <span class=\"attention\">\"" + email + ".\"</span> This is a good thing! It appears you have no known associated breaches with this account.</p></h4>";
    }
  };
  xhttp.open("GET", checkUserURL, true);
  xhttp.send();
}
function writeData(response) {
var arr = JSON.parse(response);
var i;
var email = document.getElementById("checkEmail").value;
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
