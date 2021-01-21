const translate = document.querySelectorAll('.translate');
const hero_section = document.querySelector('.hero-body');
const header = document.querySelector('.hero-body');

let header_height = header.offsetHeight;

window.addEventListener('scroll', () => {
   let scroll = window.pageYOffset;
   
   translate.forEach(element => {
      let speed = element.dataset.speed;
      element.style.transform = `translateY(${scroll * speed}px)`;
   })

   hero_section.style.opacity = - scroll / (header_height / 1) + 1.8;
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