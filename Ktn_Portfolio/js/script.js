
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
 // Шапка скролл
 window.addEventListener('scroll', function() {
   let header = document.querySelector('.header');
   header.classList.toggle('sticky', window.scrollY > 0 );
});
// 
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
   
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
      if (lockPadding > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         e.style.paddingRight = '0px';
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