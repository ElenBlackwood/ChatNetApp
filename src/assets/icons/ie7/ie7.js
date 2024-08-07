/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-arrowUp': '&#xe900;',
		'icon-ban': '&#xe901;',
		'icon-download': '&#xe902;',
		'icon-edit': '&#xe903;',
		'icon-emoji': '&#xe904;',
		'icon-info': '&#xe905;',
		'icon-mic': '&#xe906;',
		'icon-minus': '&#xe907;',
		'icon-more': '&#xe908;',
		'icon-phone': '&#xe909;',
		'icon-plus': '&#xe90a;',
		'icon-search': '&#xe90b;',
		'icon-theme': '&#xe90c;',
		'icon-trash': '&#xe90d;',
		'icon-video': '&#xe90e;',
		'icon-arrowDown': '&#xe90f;',
		'icon-attach': '&#xe910;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
