'use strict';

(function () {
  var menu = document.querySelector('.menu');
  var button = document.querySelector('.header__burger');
  var contacts = document.querySelector('.header__contacts');

  // Закрываем меню, если JS работает
  menu.classList.remove('menu--nojs');

  var toggleMenu = function (evt) {
    evt.preventDefault();
    menu.classList.toggle('menu--opened');
    button.classList.toggle('header__burger--opened');
    contacts.classList.toggle('header__contacts--opened');
  }

  var setMenuListener = function () {
    if (window.innerWidth < 768) {
      button.addEventListener('click', toggleMenu);
    }
  };

  var setListeners = function () {
    setMenuListener();
    if (window.innerWidth > 767) {
      menu.classList.remove('menu--opened');
    }
  }

  setListeners();
  window.onresize = setListeners;

})();
