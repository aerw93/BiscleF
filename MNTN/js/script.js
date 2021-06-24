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


//Parallax
let parSky = document.querySelector('.sky__back');
let mountBack = document.querySelector('.moun__back');
let mainMount = document.querySelector('.main__mount');
let heroSection = document.querySelector('.hero-body');

function setTranslate(xPos, yPos, el) {
	el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
window.addEventListener("DOMContentLoaded", scrollLoop, false);

let xScrollPosition;
let yScrollPosition;

function scrollLoop() {
	xScrollPosition = window.scrollX;
	yScrollPosition = window.scrollY;
	setTranslate(0, yScrollPosition * -0.2, parSky);
	setTranslate(0, yScrollPosition * -0.3, mountBack);
	setTranslate(0, yScrollPosition * -.4, mainMount);
	setTranslate(0, yScrollPosition * .7, heroSection);
	requestAnimationFrame(scrollLoop);
}
// Navigation scroll-bar

window.addEventListener('scroll', () => {
	let scrollCurrent = window.scrollY;
	let anchorBlock = document.querySelectorAll('.scroll-js');
	let heightBlock = [];
	let links = document.querySelectorAll('.page__slider a');
	let mainMargin = document.querySelector('main');
	let style = Math.abs(parseInt(getComputedStyle(mainMargin).marginTop));

	heightBlock[0] = anchorBlock[0].offsetHeight - (style + 100);

	for (let i = 1; i < anchorBlock.length; i++) {
		heightBlock[i] = anchorBlock[i].offsetHeight;
	}
	if (scrollCurrent >= 0) {
		links[2].classList.remove('active');
		links[1].classList.remove('active');
		links[0].classList.add('active');
	}
	if (scrollCurrent > heightBlock[0]) {
		links[0].classList.remove('active');
		links[2].classList.remove('active');
		links[1].classList.add('active');
	}
	if (scrollCurrent > heightBlock[0] + heightBlock[1]) {
		links[1].classList.remove('active');
		links[3].classList.remove('active');
		links[2].classList.add('active');

	}
	if (scrollCurrent > heightBlock[0] + heightBlock[1] + heightBlock[1]) {
		links[2].classList.remove('active');
		links[1].classList.remove('active')
		links[3].classList.add('active');
	}
})
// smooth - scroll
document.querySelectorAll('.scroll-to').forEach(link => {

	link.addEventListener('click', function (e) {
		e.preventDefault();

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const block = document.querySelector('.grid__items-1').offsetHeight;
		const client = window.innerHeight;

		// const topOffset = document.querySelector('.header').offsetHeight;
		// const topOffset = 70; // если не нужен отступ сверху 

		const topOffset = (client - block) / 2;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;
		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});

window.onload = function () {
	window.setTimeout(function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}, 1600);
};
//