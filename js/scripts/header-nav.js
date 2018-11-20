'use strict';

(function () {
  var panel = document.querySelector('.header');
  var menu = panel.querySelector('.menu');
  var button = panel.querySelector('.header__burger');
  var contacts = panel.querySelector('.header__contacts');

  // Закрываем меню, если JS работает
  menu.classList.remove('menu--nojs');

  var toggleMenu = function (evt) {
    evt.preventDefault();
    panel.classList.toggle('header--opened');
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
      panel.classList.remove('header--opened');
      menu.classList.remove('menu--opened');
    }
  }

  setListeners();
  window.onresize = setListeners;

})();
