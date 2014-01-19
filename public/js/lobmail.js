jQuery(function($) {
  $('#send-card-button').click(function(event) {
    event.preventDefault();
    $('#send-card-button').attr("href", " ");

    $.ajax({
      type: 'POST',
      url: "/api/v1/card/send",
      data: {
        apikey: $('#orderid').val(),
        to_name: $('#to_name').val(),
        to_address1: $('#to_address1').val(),
        to_address2: $('#to_address2').val(),
        to_city: $('#to_city').val(),
        to_state: $('#to_state').val(),
        to_zip: $('#to_zip').val(),
        to_country: $('#to_country').val(),
        from_name: $('#from_name').val(),
        from_address1: $('#from_address1').val(),
        from_address2: $('#from_address2').val(),
        from_city: $('#from_city').val(),
        from_state: $('#from_state').val(),
        from_zip: $('#from_zip').val(),
        from_country: $('#from_country').val(),
        message: $('#message').val(),
        card_design: $('#selection').attr("card-type")
      },
      jsonp: "json",
      dataType: 'json', // Pay attention to the dataType/contentType
      success: function (data) {
        $("#response").text(data);
        $('#send-card-button').attr("href", "");
      }
    });
  }
});

