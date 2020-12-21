(function () {
  var button = document.getElementById('navburg__header');
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('nav-header');
    menu.classList.toggle('is-open');
  });
})();