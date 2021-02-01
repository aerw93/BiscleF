function ibg(){

let ibg=document.querySelectorAll(".ibg");
for (var i = 0; i < ibg.length; i++) {
if(ibg[i].querySelector('img')){
ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
}
}
}

ibg();
// Меню бургер
(function () {
   var click = document.getElementById('menu-active');
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
 // Function logo-img src=change
 function logoChange () {
   const logoImg = document.getElementById('logo-change');
   if (window.scrollY > 0) {
      logoImg.src = "img/Logo/Logo_KTN_4_2.png";
   } else {
      logoImg.src = "img/Logo/Logo_KTN_4_3.png";
   }
 };
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

// Function hide-nav_menu on click over menu
const btnBurger = document.querySelector('.toggle-menu');
const menuBurger = document.querySelector('.menu__body');

 document.addEventListener('click', function(e) {
    const target = e.target;
    const its_menu = target == menuBurger || menuBurger.contains(target);
    const its_btnMenu = target == btnBurger;
    const menu_is_active = menuBurger.classList.contains('active');

    if (!its_menu && !its_btnMenu && menu_is_active) {
      menuBurger.classList.remove('active');
  }
 });