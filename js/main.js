(function () {
  var button = document.getElementById('navburg__header');
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('nav-header');
    menu.classList.toggle('is-open');
  });
})();
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

// (function () {
//   var click = document.getElementById('img-click');
//   click.addEventListener('click', function (event) {
//     event.preventDefault();
//     var menu = document.getElementById('img-span');
//     menu.classList.toggle('active');
//   });
// })();
// const buttons = document.querySelectorAll('button');
// buttons.forEach(btn => {
//   btn.addEventListener('click', function(e) {

//     let x = e.clientX - e.target.offsetLeft;
//     let y = e.clientY - e.target.offsetTop;

//     let ripples = document.createElement('span')
//     ripples.style.left = x + 'px';
//     ripples.style.top = y + 'px';
//     this.appendChild(ripples);

//     setTimeout(() =>{
//       ripples.remove()
//     },1000);
//   })
// })

// console.log(document.getElementById('img-click'));
// console.log(document.querySelectorAll('.main-btn  '))

