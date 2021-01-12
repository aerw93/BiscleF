// Меню бургер
const body1 = document.querySelector('body');
(function () {
  var button = document.getElementById('navburg__header');
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('nav-header');
    menu.classList.toggle('is-open');
    body1.classList.toggle('lock');
    var closeLi = document.getElementById('nav__link');
      closeLi.addEventListener('click', function (e) {
      menu.classList.remove('is-open');
      body1.classList.remove('lock');
    })
    var closeLi1 = document.getElementById('nav__link2');
      closeLi1.addEventListener('click', function (e) {
      menu.classList.remove('is-open');
      body1.classList.remove('lock');
    })
    var closeLi2 = document.getElementById('nav__link3');
      closeLi2.addEventListener('click', function (e) {
      menu.classList.remove('is-open');
      body1.classList.remove('lock');
    })
    var closeLi3 = document.getElementById('nav__link4');
      closeLi3.addEventListener('click', function (e) {
      menu.classList.remove('is-open');
      body1.classList.remove('lock');
    })
   });
})();

// Кнопки с выпадаюшим окном
(function () {
  var click = document.getElementById('img-click1');
  click.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('img-span1');
    menu.classList.toggle('active');
  });
})();
(function () {
  var click = document.getElementById('img-click2');
  click.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('img-span2');
    menu.classList.toggle('active');
  });
})();
(function () {
  var click = document.getElementById('img-click3');
  click.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('img-span3');
    menu.classList.toggle('active');
  });
})();



// Смена Картинки при выборе цвета Шлема
var pics = {
   "1": "./img/helmet-black.png",
   "2": "./img/helm_yellow.png",
   "3": "./img/Fend_white.png"    
 }
function check_value(event){
  document.getElementById("imagetest").src = pics[event.target.value] ;
}
//Header scroll
window.addEventListener('scroll', function() {
   let header = document.querySelector('header');
   header.classList.toggle('sticky', window.scrollY > 0 );
});
// Отступ для Header при переходе на ссылку-якорь

(function(document, history, location) {
   var HISTORY_SUPPORT = !!(history && history.pushState);
 
   var anchorScrolls = {
     ANCHOR_REGEX: /^#[^ ]+$/,
     OFFSET_HEIGHT_PX: 80,
 
     /**
      * Establish events, and fix initial scroll position if a hash is provided.
      */
     init: function() {
       this.scrollToCurrent();
       window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
       document.body.addEventListener('click', this.delegateAnchors.bind(this));
     },
 
     /**
      * Return the offset amount to deduct from the normal scroll position.
      * Modify as appropriate to allow for dynamic calculations
      */
     getFixedOffset: function() {
       return this.OFFSET_HEIGHT_PX;
     },
 
     /**
      * If the provided href is an anchor which resolves to an element on the
      * page, scroll to it.
      * @param  {String} href
      * @return {Boolean} - Was the href an anchor.
      */
     scrollIfAnchor: function(href, pushToHistory) {
       var match, rect, anchorOffset;
 
       if(!this.ANCHOR_REGEX.test(href)) {
         return false;
       }
 
       match = document.getElementById(href.slice(1));
 
       if(match) {
         rect = match.getBoundingClientRect();
         anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
         window.scrollTo(window.pageXOffset, anchorOffset);
 
         // Add the state to history as-per normal anchor links
         if(HISTORY_SUPPORT && pushToHistory) {
           history.pushState({}, document.title, location.pathname + href);
         }
       }
 
       return !!match;
     },
     /**
      * Attempt to scroll to the current location's hash.
      */
     scrollToCurrent: function() {
       this.scrollIfAnchor(window.location.hash);
     },
 
     /**
      * If the click event's target was an anchor, fix the scroll position.
      */
     delegateAnchors: function(e) {
       var elem = e.target;
 
       if(
         elem.nodeName === 'A' &&
         this.scrollIfAnchor(elem.getAttribute('href'), true)
       ) {
         e.preventDefault();
       }
     }
   };
 
   window.addEventListener(
     'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
   );
 })(window.document, window.history, window.location);

