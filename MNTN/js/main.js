const translate = document.querySelectorAll('.translate');
const hero_section = document.querySelector('.hero-body');
const header = document.querySelector('.hero-body');

let header_height = header.offsetHeight;

console.log(header_height);

window.addEventListener('scroll', () => {
   let scroll = window.pageYOffset;
   
   translate.forEach(element => {
      let speed = element.dataset.speed;
      element.style.transform = `translateY(${scroll * speed}px)`;
   })

   hero_section.style.opacity = - scroll / (header_height / 2.4) + 3.5;
})
