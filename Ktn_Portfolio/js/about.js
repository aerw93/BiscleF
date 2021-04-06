// Анимация при скроле 
//==================================================================================================
//==================================================================================================

// Function logo-img src=change
//==================================================================================================
//==================================================================================================

// Function ibg-img
//==================================================================================================
//==================================================================================================
// Меню бургер
//==================================================================================================
//==================================================================================================

//  Шапка скролл
//-------------------------------------------------------------------
window.addEventListener('scroll', function () {
	let header = document.querySelector('.header');
	header.classList.toggle('sticky', window.scrollY > 0);
	logoChange();
});
// Contacts toogleMenu 
//------------------------------------------------------------------------
(function () {
	var click = document.getElementById('toggle-contacts');
	click.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('contacts');
		menu.classList.toggle('open');
	});
})();
//-------------------------------------------------------------------------
// Function hide- showeds Contacts_items on click over
const btnContacts = document.querySelector('.icon-email');
const menuContacts = document.querySelector('.follow__content');

document.addEventListener('click', function (e) {
	const target = e.target;
	const its_menu = target == menuContacts || menuContacts.contains(target);
	const its_btnMenu = target == btnContacts;
	const menu_is_active = menuContacts.classList.contains('open');
	const links = document.querySelectorAll('.content-icon');


	if (!its_menu && !its_btnMenu && menu_is_active) {
		menuContacts.classList.remove('open');
	}
	for (i = 0; i < links.length; i++) {
		links[i].addEventListener('click', function () {
			menuContacts.classList.remove('open');
		})
	}
});
//---------------------------preventDefault-img-------------------
let imgLink = document.querySelectorAll('img');
for (i = 1; i < imgLink.length; i++) {
	imgLink[i].oncontextmenu = (function (e) {
		e.preventDefault();
	})
};
//-------------------------drag.drop------------
document.ondragstart = noselect;
function noselect() { return false; }

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
          for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 5;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) { 
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
               animItem.classList.add('_active');
            } else {
               if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
             }
            }
         }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }
   setTimeout(() => {
      animOnScroll();
   }, 300);
}
function logoChange () {
   const logoImg = document.getElementById('logo-change');
   if (window.scrollY > 0) {
      logoImg.src = "../img/Logo/Logo_KTN_4_2.png";
   } else {
      logoImg.src = "../img/Logo/Logo_KTN_4_3.png";
   }
 };
function ibg(){

   let ibg=document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
   if(ibg[i].querySelector('img')){
   ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
   }
   }
   }
   ibg();
(function () {
	let click = document.getElementById('menu-active');
	let btnBurger = document.querySelector('.toggle-menu');
	let menuBurg = document.querySelector('.menu__body');
	let linksContact = document.querySelectorAll('.content-icon');
	let linksPage = document.querySelectorAll('.list__items, .content-icon');

	click.addEventListener('click', function (event) {
		event.preventDefault();
		var menu = document.getElementById('menu__body');
		menu.classList.toggle('active');
		document.body.classList.toggle('_lock');

		window.addEventListener('click', function (e) {
			const target = e.target;
			if (!target.closest('.menu__body') && !target.closest('.toggle-menu')) {
				menuBurg.classList.remove('active')
				document.body.classList.remove('_lock');
			}
		});
		for (i = 0; i < linksPage.length; i++) {
			linksPage[i].addEventListener('click', function () {
				menuBurg.classList.remove('active')
				document.body.classList.remove('_lock');
			})
		}
	});
})();
