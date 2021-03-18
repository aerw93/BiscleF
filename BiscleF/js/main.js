// Меню бургер
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



// Смена Картинки при выборе цвета Шлема
var pics = {
	"1": "./img/helmet-black.png",
	"2": "./img/helm_yellow.png",
	"3": "./img/Fend_white.png"
}
function check_value(event) {
	document.getElementById("imagetest").src = pics[event.target.value];
}
//Header scroll
window.addEventListener('scroll', function () {
	let header = document.querySelector('header');
	header.classList.toggle('sticky', window.scrollY > 0);
});
