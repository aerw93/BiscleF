const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}
function popupOpen(curentPopup) {
   if(curentPopup && unlock) {
      const popupActiv = document.querySelector('.popup.open');
      if (popupActiv) {
         popupClose(popupActiv, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActiv, doUnlock = true) {
   if (unlock) {
      popupActiv.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.conteiner').offsetWidth + 'px';
   
   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
   }
}
   body.style.paddingRight = '17px';
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

document.addEventListener('keydown', function (e) {
   if(e.which === 27) {
      const popupActiv = document.querySelector('.popup.open')
   }
});
(function () {
   if (!Element.prototype.closest){
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   if (!Element.prototype.matches){
      Element.prototype.matches = Element.prototype.matchesSelector || 
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
