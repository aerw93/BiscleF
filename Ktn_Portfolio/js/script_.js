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
(function () {
   var click = document.getElementById('menu-active');
   var btnBurger = document.querySelector('.toggle-menu');
   const menuBurger = document.querySelector('.menu__body');

   click.addEventListener('click', function (event) {
     event.preventDefault();
     var menu = document.getElementById('menu__body');
     menu.classList.toggle('active');
   });
 })();
//  Шапка скролл
 window.addEventListener('scroll', function() {
   let header = document.querySelector('.header');
   header.classList.toggle('sticky', window.scrollY > 0);
   logoChange();
});
// Contacts toogleMenu 
(function () {
   var click = document.getElementById('toggle-contacts');
   click.addEventListener('click', function (event) {
     event.preventDefault();
     var menu = document.getElementById('contacts');
     menu.classList.toggle('open');
   });
 })();
// Function hide- showeds Contacts_items on click over
const btnContacts = document.querySelector('.icon-email');
const menuContacts = document.querySelector('.follow__content');

 document.addEventListener('click', function(e) {
    const target = e.target;
    const its_menu = target == menuContacts || menuContacts.contains(target);
    const its_btnMenu = target == btnContacts;
    const menu_is_active = menuContacts.classList.contains('open');

    if (!its_menu && !its_btnMenu && menu_is_active) {
      menuContacts.classList.remove('open');
  }
 });

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
