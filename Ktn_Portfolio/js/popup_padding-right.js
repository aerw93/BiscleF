const lockPadding = document.querySelectorAll(".lock-padding");
const body = document.querySelector('.page');
//const gallery = document.querySelectorAll("fslightbox-open");
const timeout = 300;
let unlock = true;



function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('html').offsetWidth + 'px';

   if (lockPadding.length > 0) {
       for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = '17px';

      }
   }
   body.style.paddingRight =  '17px';
   body.classList.add('lock');

   ulock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
             }
         }
         body.style.paddingRight = '0px';
         body.classList.remove('lock');
      }, timeout);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
};

