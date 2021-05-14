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
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();;
window.onload = function () {
	document.querySelector('.tabs__block').style.display = "flex";
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
select();;

