// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// WebComponents dependencies check and loading.
if ('registerElement' in document
		&& 'createShadowRoot' in HTMLElement.prototype
		&& 'import' in document.createElement ('link')
		&& 'content' in document.createElement ('template')) {
} else {
	let tag = document.createElement ('script');
	
	tag.src = 'https://cdn.jsdelivr.net/npm/webcomponents.js@0.7/webcomponents.min.js';
	tag.integrity = 'sha384-Pkxw+Kt6B2OP3f3FOK4E5XSzc/wddqwkGOYiW7U9x9ZqZ6UNOESQfMUmGVcR5Iwy';
	tag.crossOrigin = 'anonymous';
	document.head.appendChild (tag);
}
