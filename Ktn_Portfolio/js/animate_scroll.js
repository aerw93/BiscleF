let animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemsHeight = animItems.offsetHeight;
         const animItemsOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemsHeight / animStart;

         if (animItemsHeight > window.innerHeight) { 
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemsOffset - animItemPoint) && pageYOffset < (animItemsOffset + animItemsHeight)) {
            animItem.classList.add('_active');
         } else {
            animItem.classList.remove('_active')
         }

      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }
}