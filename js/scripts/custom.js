'use strict';

var $j = jQuery.noConflict();

$j(function () {
  var panel = document.querySelector('.header');
  var menu = panel.querySelector('.menu');
  var menuItem = menu.querySelector('.menu-item');
  var button = panel.querySelector('.header__burger');
  var contacts = panel.querySelector('.header__contacts');
  var form = document.querySelector('.feedback__form');

  if (form) {
    var inputs = document.querySelectorAll('.feedback__input');
    var message = document.querySelector('.feedback__textarea');

    var onFocusInput = function (evt) {
      var block = evt.target.parentElement.parentElement;
      block.children[2].classList.add('feedback__label--focus');
    };

    var onBlurInput = function (evt) {
      var block = evt.target.parentElement.parentElement;
      if (evt.target.value === '') {
        block.children[2].classList.remove('feedback__label--focus');
      }
    };

    [].forEach.call(inputs, function (element) {
      element.addEventListener('focus', onFocusInput);
    });

    message.addEventListener('focus', onFocusInput);

    [].forEach.call(inputs, function (element) {
      element.addEventListener('blur', onBlurInput);
    });

    message.addEventListener('blur', onBlurInput);

  }


  // Name of the attached file
  $j('.feedback__file-upload input[type=file]').change(function(){
      var filename = $j(this).val().replace(/.*\\/, "");
      $j("#filename").val(filename);
  });

  // Closing menu in case of JS operates
  menu.classList.remove('menu--nojs');
  menuItem.classList.add('menu-item--active');

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

});
