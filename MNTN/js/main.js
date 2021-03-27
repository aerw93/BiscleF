const translate = document.querySelectorAll('.translate');
const hero_section = document.querySelector('.hero-body');
const header = document.querySelector('.hero-body');

let header_height = header.offsetHeight;

window.addEventListener('scroll', () => {
	let scroll = window.pageYOffset;

	translate.forEach(element => {
		let speed = element.dataset.speed;
		element.style.transform = `translate3d(0, ${scroll * speed / 2.8}%, 0)`;
	})

	hero_section.style.opacity = - scroll / ((header_height + 750) / 2) + 1.2;
});


(function () {
	//"use strict";

	var section = document.querySelectorAll(".section");
	var sections = {};
	var i = 0;

	Array.prototype.forEach.call(section, function (e) {
		sections[e.id] = e.offsetTop;
	});

	window.onscroll = function () {
		var scrollPosition =
			document.documentElement.scrollTop || document.body.scrollTop;

		for (i in sections) {
			if (sections[i] <= scrollPosition) {
				document.querySelector(".active").setAttribute("class", " ");
				document
					.querySelector("a[href*=" + i + "]")
					.setAttribute("class", "active");
			}
		}
	};
})();
// Navigation scroll-bar
window.addEventListener('scroll', () => {
	let scrollCurrent = window.scrollY;
	let anchorBlock = document.querySelectorAll('.scroll-js');
	let heightBlock = [];
	let links = document.querySelectorAll('.page__slider a');
	let mainMargin = document.querySelector('main');
	let style = Math.abs(parseInt(getComputedStyle(mainMargin).marginTop));

	heightBlock[0] = anchorBlock[0].offsetHeight - (style + 50);



	for (let i = 1; i < anchorBlock.length; i++) {
		heightBlock[i] = anchorBlock[i].offsetHeight;
	}
	if (scrollCurrent > heightBlock[0]) {
		links[0].classList.remove('active');
		links[1].classList.add('active');
	}
	if (scrollCurrent > heightBlock[0] + heightBlock[1]) {
		links[1].classList.remove('active');
		links[2].classList.add('active');
	}
	if (scrollCurrent > heightBlock[0] + heightBlock[1] + heightBlock[1]) {
		links[2].classList.remove('active');
		links[3].classList.add('active');
	}
})