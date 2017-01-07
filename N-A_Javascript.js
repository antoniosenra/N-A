console.log("testing console log");

$.ajax({cache: false, url: "https://haveibeenpwned.com/api/v2/breachedaccount/antoniopsenra@yahoo.com", success: function(data) {
        console.log(data);
}});
