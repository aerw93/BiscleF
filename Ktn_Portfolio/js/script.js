
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
   header.classList.toggle('sticky', window.scrollY > 0 );
});
 