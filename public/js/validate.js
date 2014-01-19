function validatePayment () {

	if ($("#selection").attr("cost") == null) {
		return "Please select a package.";
	}
	
	var validemail = true;
	var check = ['@', '.'];
	var j = 0;
	var email = $("#email").val();
	for (var i = 1; i < email.length; i++) {
		if (email[i] == check[j]) {
			j++;
		}
	}
	if (j != 2) {
		validemail = false;
	}

	if (!validemail) {
		return "Invalid e-mail.";
	}
	var cardnumber = $("#cardnumber").val();
	if (cardnumber.length < 12 || cardnumber.length > 16) {
		return "Invalid credit card number.";
	}
	if ($("#cvc").val().length != 3 && $("#cvc").val().length != 4) {
		return "Invalid CVC.";
	}
	if (parseInt($("#expirationmonth").val()) < 1 || parseInt($("#expirationmonth").val()) > 12) {
		return "Invalid month.";
	}
	var d = new Date();
	if (parseInt($("#expirationyear").val()) < d.getFullYear()) {
		return "Credit card expired.";
	}

	return "Valid";
}