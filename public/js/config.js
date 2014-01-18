/*
	Miniport 2.5 by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

window._skel_config = {
	preset: 'standard',
	prefix: 'css/style',
	resetCSS: true,
	breakpoints: {
		'desktop': {
			grid: {
				gutters: 50
			}
		}
	}
};

$(function() {
	$("#confirm-dialog").hide();
	$("#purchase-button1").click(function() {
		$("#selection").text("1 card for $5");
		$("#selection").attr("cost", 5);
		$("#confirm-dialog").show();
	});

	$("#purchase-button2").click(function() {
		$("#selection").text("2 cards for $8");
		$("#selection").attr("cost", 8);
		// var output = '';
		// for (var i = 0; i < 2; i++) {
		// 	output += '<span class="fa fa-envelope-o"></span>';
		// }
		// $("#checkout-envelop").text(output);
		$("#confirm-dialog").show();
	});

	$("#purchase-button3").click(function() {
		$("#selection").text("5 cards for $16");
		$("#selection").attr("cost", 16);
		$("#confirm-dialog").show();
	});

	$("#purchase-button4").click(function() {
		var quantity = parseInt($("#subject").val());
		if (isNaN(quantity) || quantity <= 5) {
			quantity = 6;
		}
		quantity = Math.ceil(quantity);
		$("#subject").val(quantity);
		var output = quantity + " cards for $" + 3*quantity;
		$("#selection").text(output);
		$("#selecion").attr("cost", 3*quantity);
		$("#confirm-dialog").show();
	});	
});

jQuery(function() {

	jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
	jQuery.browser={};(function(){jQuery.browser.msie=false;jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

	var	_bh = jQuery('body, html'),
		_window = jQuery(window),
		_nav = jQuery('#nav');

	// Forms
		if (jQuery.browser.msie && jQuery.browser.version <= 9)
			jQuery('form').n33_formerize();

		$('#send-card-button').click(function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
			  	url: "http://localhost:5000/api/v1/card/send?key=_APIKEY_",
			  	data: {
			  		to_name: $("#to_name").val(),
			  		to_address1: $("#to_address1").val(),
			  		to_address2: $("#to_address2").val(),
			  		to_city: $("#to_city").val(),
			  		to_state: $("#to_state").val(),
			  		to_country: $("#to_country").val(),
			  		to_zip: $("#to_zip").val(),

			  		from_name: $("#from_name").val(),
			  		from_address1: $("#from_address1").val(),
			  		from_address2: $("#from_address2").val(),
			  		from_city: $("#from_city").val(),
			  		from_state: $("#from_state").val(),
			  		from_country: $("#from_country").val(),
			  		from_zip: $("#from_zip").val(),

			  		message: $("#message").val()
			  	},
			  	success: function(data) {
						$("#response").text(data);
			  	}
			});
			jQuery(this).closest('form').submit();
		});
		jQuery('form .form-button-reset').click(function(e) { e.preventDefault(); jQuery(this).closest('form')[0].reset();
	});
	
	// Links
		jQuery('a').click(function(e) {
			var t = jQuery(this), h = t.attr('href'), article;

			if (h.charAt(0) == '#' && h.length > 1 && (article = jQuery('article#' + h.substring(1))).length > 0)
			{
				var pos = Math.max(article.parent().offset().top - _nav.height() + 15, 0);
				e.preventDefault();
				_bh.animate({ scrollTop: pos }, 'slow', 'swing');
			}
		});

});