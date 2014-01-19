Stripe.setPublishableKey('pk_test_kepNvExthwHXJBDoCimv67KA');

jQuery(function($) {
  $('#payment-submit').click(function(event) {
    event.preventDefault();

    if (validatePayment() != "Valid") {
      $("#response").text(validatePayment());
      $("#response").css("color", "red");
      return;
    }

    // Disable the submit button to prevent repeated clicks
    $('#payment-submit').attr("href", "javascript:;");

    var $form = $("#payment-form");

    Stripe.card.createToken($form, stripeResponseHandler);
    $("#response").text("Submitting payment...");
    $("#response").css("color", "green");
  });

  var stripeResponseHandler = function(status, response) {
    var $form = $('#payment-form'); 
    if (response.error) {
      // Show the errors on the form
      $("#response").css("color", "red");
      $("#response").text(response.error.message);
      //$form.find('button').prop('disabled', false);
    } else {
      $("#response").css("color", "green");
      $("#response").text("Processing payment...");
      // token contains id, last4, and card type
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $.ajax({
        type: 'POST',
        url: "/paas/recharge",
        data: {
          apikey: $('#orderid').val(),
          email: $('#email').val(),
          token: token,
          amount: $("#selection").attr("cost"),
        },
        jsonp: "json",
        dataType: 'json', // Pay attention to the dataType/contentType
        success: function (data) {
          $("#response").css("color", "green");
          $("#response").text(data);
          $('#payment-submit').attr("href", "");
        }
      });
    }
  }
});

