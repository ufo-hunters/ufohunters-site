document.write("<style>.msgcookie{display:block;position:fixed;bottom:0;background: none repeat scroll 0 0 #959c16;;color:#fff;font-size:11px;font-family:sans-serif;z-index: 1;width: 100%;}.msgcookie p{margin:5px;background:url(/assets/cookie.png) 0 0 no-repeat;padding:10px 20px 10px 30px}.msgcookie p a:link,.msgcookie p a:active,.msgcookie p a:visited,.msgcookie p a:hover{color:#fff}.msgcookie a.close {background: url(/assets/cookie.png) no-repeat scroll 0 -54px rgba(0, 0, 0, 0);display: block;height: 50px;opacity: 0.5;overflow: hidden;position: absolute;right: 0;text-indent: -800px;top: 12px;right: 16px;width: 16px;}a.close:hover{opacity:1} .msgcookie2{display:block;padding:15px;position:fixed;bottom:20%;background: none repeat scroll 0 0 #959c16;;color:#fff;font-size:11px;font-family:sans-serif;z-index: 1;} .msgcookie2 p{margin:5px;}.msgcookie2 p a:link,.msgcookie2 p a:active,.msgcookie2 p a:visited,.msgcookie2 p a:hover{color:#fff}.msgcookie2 a.close2 {background: url(/assets/cookie.png) no-repeat scroll 0 -54px rgba(0, 0, 0, 0);display: block;height: 50px;opacity: 0.5;overflow: hidden;position: absolute;right: 0;text-indent: -800px;top: 8px;right: 8px;width: 16px;}a.close2:hover{opacity:1}</style>");



/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=/' : '; path=/',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));




$(document).ready(function()
{
	if (!$.cookie("msgcookie"))
	{
		$("body").prepend("<div class='row'><div class='span12 msgcookie'><p><a href='#' class='close'>close message</a>This site uses cookies and third-party cookies to provide you with a better experience and service. When navigating or using our services, you agree to our use of them. You can change your cookie settings at any time. <a href='#'>More information</a></p></div></div><div class='row'><div class='span12'><div class='msgcookie2' id='sec_box' style='display: none;'><p><a href='#' class='close2'>close message</a><strong>PRIVACY POLICY:</strong><br><br> We are committed to protecting your privacy. We will only use the information that we collect about you lawfully (in accordance with the Data Protection Act 1998 and the EU Privacy and Communications Directive).<br/><br/>This webpage displays Google Adsense Ads which follows the following:<br/>- Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website.<br/>- Google's use of the DoubleClick cookie enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.<br/>- You may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Ads Settings (<a href='http://www.google.com/ads/preferences/' target='_blank'>http://www.google.com/ads/preferences/</a>)<br/><br/>You can find more about Google Adsense ads using this link (<a href='http://www.google.com/adsense' target='_blank'>http://www.google.com/adsense</a>).<br/>You can also visit <a href='http://www.aboutads.info' target='_blank'>http://www.aboutads.info</a> and <a href='http://www.allaboutcookies.org/cookies/' target='_blank'>http://www.allaboutcookies.org/cookies/</a> to find out more.<br/>If you have any questions/comments about privacy, you should email us ufohunterscom@gmail.com<br/></p></div></div></div>");

		$("body").on("click", ".close", function(e) {
			e.preventDefault();
			$.cookie('msgcookie', 'accepted');
			$(".msgcookie").fadeOut();
		});

		$("body").on("click", ".close2", function(e) {
			$(".msgcookie2").fadeOut();
		});

		$("body").on("click", ".msgcookie p a:not(.close)", function(e) {
			e.preventDefault();
			//alert("Este enlace debe ir a tu pol\u00EDtica de privacidad");
			 $('#sec_box').show();
		});
	}
});
