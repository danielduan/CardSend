Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

jQuery(function($) {
  $('#payment-submit').click(function(event) {
    event.preventDefault();
    var $form = $("#payment-form");

    // Disable the submit button to prevent repeated clicks
    //$form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);
    $("#response").text("Submitting payment...");
  });


  var stripeResponseHandler = function(status, response) {
    var $form = $('#payment-form'); 
    if (response.error) {
      // Show the errors on the form
      $("#response").text(response.error.message);
      //$form.find('button').prop('disabled', false);
    } else {
      $("#response").text("Processing payment...");
      console.log(response);
      // token contains id, last4, and card type
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      //$form.get(0).submit();
      $.ajax({
        type: 'POST',
        url: "/paas/recharge",
        data: {
          apikey: $('#orderid').val();
          token: token,
          amount: $("#selection").attr("cost");
        },
        jsonp: "json",
        dataType: 'json', // Pay attention to the dataType/contentType
        success: function (data) {
          $("#response").text(data);
        }
      });
    }
  }
});

