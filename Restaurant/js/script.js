/*!
	hey, [be]Lazy.js - v1.8.2 - 2016.10.25
	A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
	(c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) { "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m() })(this, function () { function q(b) { var c = b._util; c.elements = E(b.options); c.count = c.elements.length; c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function (a) { n(a, "scroll", c.validateT) }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT)); m(b) } function m(b) { for (var c = b._util, a = 0; a < c.count; a++) { var d = c.elements[a], e; a: { var g = d; e = b.options; var p = g.getBoundingClientRect(); if (e.container && y && (g = g.closest(e.containerClass))) { g = g.getBoundingClientRect(); e = r(g, f) ? r(p, { top: g.top - e.offset, right: g.right + e.offset, bottom: g.bottom + e.offset, left: g.left - e.offset }) : !1; break a } e = r(p, f) } if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count--, a-- } 0 === c.count && b.destroy() } function r(b, c) { return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom } function z(b, c, a) { if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight)) if (c = b.getAttribute(u) || b.getAttribute(a.src)) { c = c.split(a.separator); var d = c[A && 1 < c.length ? 1 : 0], e = b.getAttribute(a.srcset), g = "img" === b.nodeName.toLowerCase(), p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase(); if (g || void 0 === b.src) { var h = new Image, w = function () { a.error && a.error(b, "invalid"); v(b, a.errorClass); k(h, "error", w); k(h, "load", f) }, f = function () { g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")'; x(b, a); k(h, "load", f); k(h, "error", w) }; p && (h = b, l(c.getElementsByTagName("source"), function (b) { var c = a.srcset, e = b.getAttribute(c); e && (b.setAttribute("srcset", e), b.removeAttribute(c)) })); n(h, "error", w); n(h, "load", f); B(h, d, e) } else b.src = d, x(b, a) } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function (b) { var c = a.src, e = b.getAttribute(c); e && (b.setAttribute("src", e), b.removeAttribute(c)) }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass)) } function x(b, c) { v(b, c.successClass); c.success && c.success(b); b.removeAttribute(c.src); b.removeAttribute(c.srcset); l(c.breakpoints, function (a) { b.removeAttribute(a.src) }) } function B(b, c, a) { a && b.setAttribute("srcset", a); b.src = c } function t(b, c) { return -1 !== (" " + b.className + " ").indexOf(" " + c + " ") } function v(b, c) { t(b, c) || (b.className += " " + c) } function E(b) { var c = []; b = b.root.querySelectorAll(b.selector); for (var a = b.length; a--; c.unshift(b[a])); return c } function C(b) { f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b; f.right = (window.innerWidth || document.documentElement.clientWidth) + b } function n(b, c, a) { b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, { capture: !1, passive: !0 }) } function k(b, c, a) { b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, { capture: !1, passive: !0 }) } function l(b, c) { if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++); } function D(b, c, a) { var d = 0; return function () { var e = +new Date; e - d < c || (d = e, b.apply(a, arguments)) } } var u, f, A, y; return function (b) { if (!document.querySelectorAll) { var c = document.createStyleSheet(); document.querySelectorAll = function (a, b, d, h, f) { f = document.all; b = []; a = a.replace(/\[for\b/gi, "[htmlFor").split(","); for (d = a.length; d--;) { c.addRule(a[d], "k:v"); for (h = f.length; h--;)f[h].currentStyle.k && b.push(f[h]); c.removeRule(0) } return b } } var a = this, d = a._util = {}; d.elements = []; d.destroyed = !0; a.options = b || {}; a.options.error = a.options.error || !1; a.options.offset = a.options.offset || 100; a.options.root = a.options.root || document; a.options.success = a.options.success || !1; a.options.selector = a.options.selector || ".b-lazy"; a.options.separator = a.options.separator || "|"; a.options.containerClass = a.options.container; a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1; a.options.errorClass = a.options.errorClass || "b-error"; a.options.breakpoints = a.options.breakpoints || !1; a.options.loadInvisible = a.options.loadInvisible || !1; a.options.successClass = a.options.successClass || "b-loaded"; a.options.validateDelay = a.options.validateDelay || 25; a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50; a.options.srcset = a.options.srcset || "data-srcset"; a.options.src = u = a.options.src || "data-src"; y = Element.prototype.closest; A = 1 < window.devicePixelRatio; f = {}; f.top = 0 - a.options.offset; f.left = 0 - a.options.offset; a.revalidate = function () { q(a) }; a.load = function (a, b) { var c = this.options; void 0 === a.length ? z(a, b, c) : l(a, function (a) { z(a, b, c) }) }; a.destroy = function () { var a = this._util; this.options.container && l(this.options.container, function (b) { k(b, "scroll", a.validateT) }); k(window, "scroll", a.validateT); k(window, "resize", a.validateT); k(window, "resize", a.saveViewportOffsetT); a.count = 0; a.elements.length = 0; a.destroyed = !0 }; d.validateT = D(function () { m(a) }, a.options.validateDelay, a); d.saveViewportOffsetT = D(function () { C(a.options.offset) }, a.options.saveViewportOffsetDelay, a); C(a.options.offset); l(a.options.breakpoints, function (a) { if (a.width >= window.screen.width) return u = a.src, !1 }); setTimeout(function () { q(a) }) } });;
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src').endsWith("png")) {

				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector("img").getAttribute('src').replace("png",
					"webp") + ')';
			} else {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector("img").getAttribute('src').replace("jpg",
					"webp") + ')';
			}
		}
	} else {
		document.querySelector('body').classList.add('no-webp');
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
});;
window.onload = function () {
	let tabItems = document.querySelectorAll('.tabs__item')
	let tabBlocks = document.querySelectorAll('.tabs__block')

	for (let i = 0; i < tabItems.length; i++) {
		tabItems[i].addEventListener('click', function (e) {
			e.preventDefault();
			tabBlocks.forEach(element => {
				element.classList.remove('open')
			});
			tabBlocks[i].classList.add('open')

		})
	}
}
//Menu_burger
let btn = document.querySelector('.svg-Vector-dims');
let navLink = document.querySelectorAll('.nav-link');


btn.addEventListener('click', function () {

	let menu = document.querySelector('.menu__body');
	if (window.innerWidth < 769) {
		menu.classList.toggle('open');
		btn.closest("div").classList.toggle('rotate');
		document.body.classList.toggle('lock');
		for (i = 0; i < navLink.length; i++) {
			navLink[i].addEventListener('click', function () {
				let menu = document.querySelector('.menu__body');
				menu.classList.remove('open');
				document.body.classList.remove('lock');
				btn.closest("div").classList.remove('rotate');
			});
		}
	}
})
// ------Swiper
const swiper = new Swiper('.swiper-container', {
	// Optional parameters
	loop: true,
	speed: 1200,
	spaceBetween: 10,

	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,

	},

});

// Tabs click
// document.getElementById("defaultOpen").click();

// scroll-top
let scrollBtn = document.querySelector('.scroll__top');
let heightTop = document.querySelector('.hero__body', '.about').offsetHeight;
let mainTop = document.querySelector('main').offsetHeight;

// window.onscroll = function () { scrollFunction() };
window.addEventListener("scroll", function () {
	scrollFunction()
})

function scrollFunction() {
	if (document.documentElement.scrollTop > (heightTop + 120) && document.documentElement.scrollTop < mainTop) {
		scrollBtn.style.display = "block";
	}
	else {
		scrollBtn.style.display = "none";
	}
}

// --------------------------------hide-menu
var lastScrollTop = 0;
window.addEventListener("scroll", function () {
	if (window.innerWidth < 769) {
		let st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop) {
			document.getElementById("circle").style.transform = "translateY(-100px)";
		} else {
			document.getElementById("circle").style.transform = "translateY(0)";
		}
		lastScrollTop = st;
	}
}, false);
//----------------------drop-down-form
let select = function () {
	let selectHeader = document.querySelectorAll('.select__header');
	let selectItem = document.querySelectorAll('.select__item');

	selectHeader.forEach(item => {
		item.addEventListener('click', selectToggle)
	})

	selectItem.forEach(item => {
		item.addEventListener('click', selectChoose)
	})
	function selectToggle() {
		this.parentElement.classList.toggle('is-active');
	}
	function selectChoose() {
		let text = this.innerText,
			select = this.closest('.select'),
			currentText = select.querySelector('.select__current');
		currentText.innerText = text;
		select.classList.remove('is-active');

	}

};
select();

//100vh(mobile)
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});
// Lazy
(function () {
	// Initialize
	var bLazy = new Blazy({
		loadInvisible: true
	});
})();;

