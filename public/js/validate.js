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

function validateAddress() {

	if ($("#selection").attr("card-type") == null) {
		return "Please select a design.";
	}

	if ($("#orderid").val().length != 16) {
		return "Invalid Order ID.";
	}
	if ($("#to_name").val() == "") {
		return "Please enter a sender.";
	}
	if ($("#from_name").val() == "") {
		return "Please enter a recipient.";
	}

	if ($("#to_address1").val() == "") {
		return "Please enter recipient's address.";
	}

	if ($("#from_address1").val() == "") {
		return "Please enter sender's address.";
	}

	if ($("#to_city").val() == "") {
		return "Please enter recipient's city.";
	}
	if ($("#from_city").val() == "") {
		return "Please enter sender's city.";
	}

	if ($("#to_state").val() == "") {
		return "Please enter recipient's state.";
	}
	if ($("#from_state").val() == "") {
		return "Please enter sender's state.";
	}
	if ($("#to_zip").val() == "") {
		return "Please enter recipient's zip code.";
	}
	if ($("#from_zip").val() == "") {
		return "Please enter sender's zip code.";
	}
	if ($("#to_country").val() == "") {
		return "Please enter recipient's country.";
	}
	if ($("#from_country").val() == "") {
		return "Please enter sender's country.";
	}

	if ($("#message").val() > 300) {
		return "Message is too long.";
	}

	return "Valid";
}