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
var VanillaTilt = (function () {
   'use strict';
     
   class VanillaTilt {
     constructor(element, settings = {}) {
       if (!(element instanceof Node)) {
         throw ("Can't initialize VanillaTilt because " + element + " is not a Node.");
       }
   
       this.width = null;
       this.height = null;
       this.clientWidth = null;
       this.clientHeight = null;
       this.left = null;
       this.top = null;
   
       // for Gyroscope sampling
       this.gammazero = null;
       this.betazero = null;
       this.lastgammazero = null;
       this.lastbetazero = null;
   
       this.transitionTimeout = null;
       this.updateCall = null;
       this.event = null;
   
       this.updateBind = this.update.bind(this);
       this.resetBind = this.reset.bind(this);
   
       this.element = element;
       this.settings = this.extendSettings(settings);
   
       this.reverse = this.settings.reverse ? -1 : 1;
       this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
       this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
       this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
       this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
       this.gyroscopeSamples = this.settings.gyroscopeSamples;
   
       this.elementListener = this.getElementListener();
   
       if (this.glare) {
         this.prepareGlare();
       }
   
       if (this.fullPageListening) {
         this.updateClientSize();
       }
   
       this.addEventListeners();
       this.updateInitialPosition();
     }
   
     static isSettingTrue(setting) {
       return setting === "" || setting === true || setting === 1;
     }
   
     /**
      * Method returns element what will be listen mouse events
      * @return {Node}
      */
     getElementListener() {
       if (this.fullPageListening) {
         return window.document;
       }
   
       if (typeof this.settings["mouse-event-element"] === "string") {
         const mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);
   
         if (mouseEventElement) {
           return mouseEventElement;
         }
       }
   
       if (this.settings["mouse-event-element"] instanceof Node) {
         return this.settings["mouse-event-element"];
       }
   
       return this.element;
     }
   
     /**
      * Method set listen methods for this.elementListener
      * @return {Node}
      */
     addEventListeners() {
       this.onMouseEnterBind = this.onMouseEnter.bind(this);
       this.onMouseMoveBind = this.onMouseMove.bind(this);
       this.onMouseLeaveBind = this.onMouseLeave.bind(this);
       this.onWindowResizeBind = this.onWindowResize.bind(this);
       this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
   
       this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
       this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
       this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);
   
       if (this.glare || this.fullPageListening) {
         window.addEventListener("resize", this.onWindowResizeBind);
       }
   
       if (this.gyroscope) {
         window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
       }
     }
   
     /**
      * Method remove event listeners from current this.elementListener
      */
     removeEventListeners() {
       this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
       this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
       this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);
   
       if (this.gyroscope) {
         window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
       }
   
       if (this.glare || this.fullPageListening) {
         window.removeEventListener("resize", this.onWindowResizeBind);
       }
     }
   
     destroy() {
       clearTimeout(this.transitionTimeout);
       if (this.updateCall !== null) {
         cancelAnimationFrame(this.updateCall);
       }
   
       this.reset();
   
       this.removeEventListeners();
       this.element.vanillaTilt = null;
       delete this.element.vanillaTilt;
   
       this.element = null;
     }
   
     onDeviceOrientation(event) {
       if (event.gamma === null || event.beta === null) {
         return;
       }
   
       this.updateElementPosition();
   
       if (this.gyroscopeSamples > 0) {
         this.lastgammazero = this.gammazero;
         this.lastbetazero = this.betazero;
   
         if (this.gammazero === null) {
           this.gammazero = event.gamma;
           this.betazero = event.beta;
         } else {
           this.gammazero = (event.gamma + this.lastgammazero) / 2;
           this.betazero = (event.beta + this.lastbetazero) / 2;
         }
   
         this.gyroscopeSamples -= 1;
       }
   
       const totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
       const totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
   
       const degreesPerPixelX = totalAngleX / this.width;
       const degreesPerPixelY = totalAngleY / this.height;
   
       const angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
       const angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
   
       const posX = angleX / degreesPerPixelX;
       const posY = angleY / degreesPerPixelY;
   
       if (this.updateCall !== null) {
         cancelAnimationFrame(this.updateCall);
       }
   
       this.event = {
         clientX: posX + this.left,
         clientY: posY + this.top,
       };
   
       this.updateCall = requestAnimationFrame(this.updateBind);
     }
   
     onMouseEnter() {
       this.updateElementPosition();
       this.element.style.willChange = "transform";
       this.setTransition();
     }
   
     onMouseMove(event) {
       if (this.updateCall !== null) {
         cancelAnimationFrame(this.updateCall);
       }
   
       this.event = event;
       this.updateCall = requestAnimationFrame(this.updateBind);
     }
   
     onMouseLeave() {
       this.setTransition();
   
       if (this.settings.reset) {
         requestAnimationFrame(this.resetBind);
       }
     }
   
     reset() {
       this.event = {
         clientX: this.left + this.width / 2,
         clientY: this.top + this.height / 2
       };
   
       if (this.element && this.element.style) {
         this.element.style.transform = `perspective(${this.settings.perspective}px) ` +
           `rotateX(0deg) ` +
           `rotateY(0deg) ` +
           `scale3d(1, 1, 1)`;
       }
   
       this.resetGlare();
     }
   
     resetGlare() {
       if (this.glare) {
         this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
         this.glareElement.style.opacity = "0";
       }
     }
   
     updateInitialPosition() {
       if (this.settings.startX === 0 && this.settings.startY === 0) {
         return;
       }
   
       this.onMouseEnter();
   
       if (this.fullPageListening) {
         this.event = {
           clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
           clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
         };
       } else {
         this.event = {
           clientX: this.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width),
           clientY: this.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height)
         };
       }
   
   
       let backupScale = this.settings.scale;
       this.settings.scale = 1;
       this.update();
       this.settings.scale = backupScale;
       this.resetGlare();
     }
   
     getValues() {
       let x, y;
   
       if (this.fullPageListening) {
         x = this.event.clientX / this.clientWidth;
         y = this.event.clientY / this.clientHeight;
       } else {
         x = (this.event.clientX - this.left) / this.width;
         y = (this.event.clientY - this.top) / this.height;
       }
   
       x = Math.min(Math.max(x, 0), 1);
       y = Math.min(Math.max(y, 0), 1);
   
       let tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
       let tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
       let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);
   
       return {
         tiltX: tiltX,
         tiltY: tiltY,
         percentageX: x * 100,
         percentageY: y * 100,
         angle: angle
       };
     }
   
     updateElementPosition() {
       let rect = this.element.getBoundingClientRect();
   
       this.width = this.element.offsetWidth;
       this.height = this.element.offsetHeight;
       this.left = rect.left;
       this.top = rect.top;
     }
   
     update() {
       let values = this.getValues();
   
       this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
         "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
         "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
         "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";
   
       if (this.glare) {
         this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
         this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
       }
   
       this.element.dispatchEvent(new CustomEvent("tiltChange", {
         "detail": values
       }));
   
       this.updateCall = null;
     }
   
     /**
      * Appends the glare element (if glarePrerender equals false)
      * and sets the default style
      */
     prepareGlare() {
       // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
       if (!this.glarePrerender) {
         // Create glare element
         const jsTiltGlare = document.createElement("div");
         jsTiltGlare.classList.add("js-tilt-glare");
   
         const jsTiltGlareInner = document.createElement("div");
         jsTiltGlareInner.classList.add("js-tilt-glare-inner");
   
         jsTiltGlare.appendChild(jsTiltGlareInner);
         this.element.appendChild(jsTiltGlare);
       }
   
       this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
       this.glareElement = this.element.querySelector(".js-tilt-glare-inner");
   
       if (this.glarePrerender) {
         return;
       }
   
       Object.assign(this.glareElementWrapper.style, {
         "position": "absolute",
         "top": "0",
         "left": "0",
         "width": "100%",
         "height": "100%",
         "overflow": "hidden",
         "pointer-events": "none"
       });
   
       Object.assign(this.glareElement.style, {
         "position": "absolute",
         "top": "50%",
         "left": "50%",
         "pointer-events": "none",
         "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
         "width": `${this.element.offsetWidth * 2}px`,
         "height": `${this.element.offsetWidth * 2}px`,
         "transform": "rotate(180deg) translate(-50%, -50%)",
         "transform-origin": "0% 0%",
         "opacity": "0",
       });
     }
   
     updateGlareSize() {
       if (this.glare) {
         Object.assign(this.glareElement.style, {
           "width": `${this.element.offsetWidth * 2}`,
           "height": `${this.element.offsetWidth * 2}`,
         });
       }
     }
   
     updateClientSize() {
       this.clientWidth = window.innerWidth
         || document.documentElement.clientWidth
         || document.body.clientWidth;
   
       this.clientHeight = window.innerHeight
         || document.documentElement.clientHeight
         || document.body.clientHeight;
     }
   
     onWindowResize() {
       this.updateGlareSize();
       this.updateClientSize();
     }
   
     setTransition() {
       clearTimeout(this.transitionTimeout);
       this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
       if (this.glare) this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
   
       this.transitionTimeout = setTimeout(() => {
         this.element.style.transition = "";
         if (this.glare) {
           this.glareElement.style.transition = "";
         }
       }, this.settings.speed);
   
     }
   
     /**
      * Method return patched settings of instance
      * @param {boolean} settings.reverse - reverse the tilt direction
      * @param {number} settings.max - max tilt rotation (degrees)
      * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
      * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
      * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
      * @param {string} settings.easing - Easing on enter/exit
      * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
      * @param {number} settings.speed - Speed of the enter/exit transition
      * @param {boolean} settings.transition - Set a transition on enter/exit
      * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
      * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
      * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
      * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
      * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
      * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
      * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
      * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
      * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
      * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
      */
     extendSettings(settings) {
       let defaultSettings = {
         reverse: false,
         max: 15,
         startX: 0,
         startY: 0,
         perspective: 1000,
         easing: "cubic-bezier(.03,.98,.52,.99)",
         scale: 1,
         speed: 300,
         transition: true,
         axis: null,
         glare: false,
         "max-glare": 1,
         "glare-prerender": false,
         "full-page-listening": false,
         "mouse-event-element": null,
         reset: true,
         gyroscope: true,
         gyroscopeMinAngleX: -45,
         gyroscopeMaxAngleX: 45,
         gyroscopeMinAngleY: -45,
         gyroscopeMaxAngleY: 45,
         gyroscopeSamples: 10
       };
   
       let newSettings = {};
       for (var property in defaultSettings) {
         if (property in settings) {
           newSettings[property] = settings[property];
         } else if (this.element.hasAttribute("data-tilt-" + property)) {
           let attribute = this.element.getAttribute("data-tilt-" + property);
           try {
             newSettings[property] = JSON.parse(attribute);
           } catch (e) {
             newSettings[property] = attribute;
           }
   
         } else {
           newSettings[property] = defaultSettings[property];
         }
       }
   
       return newSettings;
     }
   
     static init(elements, settings) {
       if (elements instanceof Node) {
         elements = [elements];
       }
   
       if (elements instanceof NodeList) {
         elements = [].slice.call(elements);
       }
   
       if (!(elements instanceof Array)) {
         return;
       }
   
       elements.forEach((element) => {
         if (!("vanillaTilt" in element)) {
           element.vanillaTilt = new VanillaTilt(element, settings);
         }
       });
     }
   }
   
   if (typeof document !== "undefined") {
     /* expose the class to window */
     window.VanillaTilt = VanillaTilt;
   
     /**
      * Auto load
      */
   
   //   VanillaTilt.init(document.querySelectorAll('.card-items'));
   VanillaTilt.init(document.querySelectorAll('.card-items'), {
		max: 25,
      speed: 300,
      glare: true,
      "max-glare": 1,
	});
}
   
   return VanillaTilt;
   
   }());;
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.popup__close, .popup__close1');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActiv = document.querySelector('.popup.open');
		if (popupActiv) {
			popupClose(popupActiv, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content, .popup__content-buy')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActiv, doUnlock = true) {
	if (unlock) {
		popupActiv.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.conteiner').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
;
/*!
	hey, [be]Lazy.js - v1.8.2 - 2016.10.25
	A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
	(c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) { "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m() })(this, function () { function q(b) { var c = b._util; c.elements = E(b.options); c.count = c.elements.length; c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function (a) { n(a, "scroll", c.validateT) }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT)); m(b) } function m(b) { for (var c = b._util, a = 0; a < c.count; a++) { var d = c.elements[a], e; a: { var g = d; e = b.options; var p = g.getBoundingClientRect(); if (e.container && y && (g = g.closest(e.containerClass))) { g = g.getBoundingClientRect(); e = r(g, f) ? r(p, { top: g.top - e.offset, right: g.right + e.offset, bottom: g.bottom + e.offset, left: g.left - e.offset }) : !1; break a } e = r(p, f) } if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count--, a-- } 0 === c.count && b.destroy() } function r(b, c) { return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom } function z(b, c, a) { if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight)) if (c = b.getAttribute(u) || b.getAttribute(a.src)) { c = c.split(a.separator); var d = c[A && 1 < c.length ? 1 : 0], e = b.getAttribute(a.srcset), g = "img" === b.nodeName.toLowerCase(), p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase(); if (g || void 0 === b.src) { var h = new Image, w = function () { a.error && a.error(b, "invalid"); v(b, a.errorClass); k(h, "error", w); k(h, "load", f) }, f = function () { g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")'; x(b, a); k(h, "load", f); k(h, "error", w) }; p && (h = b, l(c.getElementsByTagName("source"), function (b) { var c = a.srcset, e = b.getAttribute(c); e && (b.setAttribute("srcset", e), b.removeAttribute(c)) })); n(h, "error", w); n(h, "load", f); B(h, d, e) } else b.src = d, x(b, a) } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function (b) { var c = a.src, e = b.getAttribute(c); e && (b.setAttribute("src", e), b.removeAttribute(c)) }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass)) } function x(b, c) { v(b, c.successClass); c.success && c.success(b); b.removeAttribute(c.src); b.removeAttribute(c.srcset); l(c.breakpoints, function (a) { b.removeAttribute(a.src) }) } function B(b, c, a) { a && b.setAttribute("srcset", a); b.src = c } function t(b, c) { return -1 !== (" " + b.className + " ").indexOf(" " + c + " ") } function v(b, c) { t(b, c) || (b.className += " " + c) } function E(b) { var c = []; b = b.root.querySelectorAll(b.selector); for (var a = b.length; a--; c.unshift(b[a])); return c } function C(b) { f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b; f.right = (window.innerWidth || document.documentElement.clientWidth) + b } function n(b, c, a) { b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, { capture: !1, passive: !0 }) } function k(b, c, a) { b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, { capture: !1, passive: !0 }) } function l(b, c) { if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++); } function D(b, c, a) { var d = 0; return function () { var e = +new Date; e - d < c || (d = e, b.apply(a, arguments)) } } var u, f, A, y; return function (b) { if (!document.querySelectorAll) { var c = document.createStyleSheet(); document.querySelectorAll = function (a, b, d, h, f) { f = document.all; b = []; a = a.replace(/\[for\b/gi, "[htmlFor").split(","); for (d = a.length; d--;) { c.addRule(a[d], "k:v"); for (h = f.length; h--;)f[h].currentStyle.k && b.push(f[h]); c.removeRule(0) } return b } } var a = this, d = a._util = {}; d.elements = []; d.destroyed = !0; a.options = b || {}; a.options.error = a.options.error || !1; a.options.offset = a.options.offset || 100; a.options.root = a.options.root || document; a.options.success = a.options.success || !1; a.options.selector = a.options.selector || ".b-lazy"; a.options.separator = a.options.separator || "|"; a.options.containerClass = a.options.container; a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1; a.options.errorClass = a.options.errorClass || "b-error"; a.options.breakpoints = a.options.breakpoints || !1; a.options.loadInvisible = a.options.loadInvisible || !1; a.options.successClass = a.options.successClass || "b-loaded"; a.options.validateDelay = a.options.validateDelay || 25; a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50; a.options.srcset = a.options.srcset || "data-srcset"; a.options.src = u = a.options.src || "data-src"; y = Element.prototype.closest; A = 1 < window.devicePixelRatio; f = {}; f.top = 0 - a.options.offset; f.left = 0 - a.options.offset; a.revalidate = function () { q(a) }; a.load = function (a, b) { var c = this.options; void 0 === a.length ? z(a, b, c) : l(a, function (a) { z(a, b, c) }) }; a.destroy = function () { var a = this._util; this.options.container && l(this.options.container, function (b) { k(b, "scroll", a.validateT) }); k(window, "scroll", a.validateT); k(window, "resize", a.validateT); k(window, "resize", a.saveViewportOffsetT); a.count = 0; a.elements.length = 0; a.destroyed = !0 }; d.validateT = D(function () { m(a) }, a.options.validateDelay, a); d.saveViewportOffsetT = D(function () { C(a.options.offset) }, a.options.saveViewportOffsetDelay, a); C(a.options.offset); l(a.options.breakpoints, function (a) { if (a.width >= window.screen.width) return u = a.src, !1 }); setTimeout(function () { q(a) }) } });
function findVideos() {
	let videos = document.querySelectorAll('.third__screen');

	for (let i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	let link = video.querySelector('.video__link');
	let media = video.querySelector('.video__media');
	let button = video.querySelector('.video__button');
	let id = parseMediaURL(media);

	video.addEventListener('click', () => {
		let iframe = createIframe(id);

		link.remove();
		button.remove();
		video.appendChild(iframe);
		video.style.backgroundImage = 'none';


	}, { once: 1 });

	link.removeAttribute('href');
	video.classList.add('video--enabled');

}

function parseMediaURL(media) {
	let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
	let url = media.src;
	let match = url.match(regexp);

	return match[1];
}

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('title', 'my Fend');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURL(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';


	return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
;

const body1 = document.querySelector('body');
(function () {
	var button = document.getElementById('navburg__header');
	button.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('nav-header');
		menu.classList.toggle('is-open');
		body1.classList.toggle('lock');
		var closeLi = document.getElementById('nav__link');
		closeLi.addEventListener('click', function (e) {
			menu.classList.remove('is-open');
			body1.classList.remove('lock');
		})
		var closeLi1 = document.getElementById('nav__link2');
		closeLi1.addEventListener('click', function (e) {
			menu.classList.remove('is-open');
			body1.classList.remove('lock');
		})
		var closeLi2 = document.getElementById('nav__link3');
		closeLi2.addEventListener('click', function (e) {
			menu.classList.remove('is-open');
			body1.classList.remove('lock');
		})
		var closeLi3 = document.getElementById('nav__link4');
		closeLi3.addEventListener('click', function (e) {
			menu.classList.remove('is-open');
			body1.classList.remove('lock');
		})
		var closeLi4 = document.getElementById('nav__link5');
		closeLi4.addEventListener('click', function (e) {
			menu.classList.remove('is-open');
			body1.classList.remove('lock');
		})
	});
})();

// Кнопки с выпадаюшим окном
(function () {
	var click = document.getElementById('img-click1');
	click.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('img-span1');
		menu.classList.toggle('active');
	});
})();
(function () {
	var click = document.getElementById('img-click2');
	click.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('img-span2');
		menu.classList.toggle('active');
	});
})();
(function () {
	var click = document.getElementById('img-click3');
	click.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('img-span3');
		menu.classList.toggle('active');
	});
})();



//input-change

let color = document.querySelectorAll('#radio1, #radio2, #radio3');
let img = document.querySelectorAll('.img_change');

for (let index = 0; index < color.length; index++) {
	color[index].addEventListener('click', function () {
		if (index == 0) {
			img[0].classList.add('open')
			img[1].classList.remove('open');
			img[2].classList.remove('open');
		} else if (index == 1) {
			img[1].classList.add('open');
			img[0].classList.remove('open')
			img[2].classList.remove('open');
		} else if (index == 2) {
			img[2].classList.add('open');
			img[0].classList.remove('open')
			img[1].classList.remove('open');
		}
	})

}

//Header scroll
window.addEventListener('scroll', function () {
	let header = document.querySelector('header');
	header.classList.toggle('sticky', window.scrollY > 0);
});

// smooth-scroll	
document.querySelectorAll('.scroll-to').forEach(link => {

	link.addEventListener('click', function (e) {
		e.preventDefault();

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header').offsetHeight;
		// const topOffset = 0; // если не нужен отступ сверху 
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;
		console.log(elementPosition)
		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});

(function () {
	// Initialize
	var bLazy = new Blazy();
})();