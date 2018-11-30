'use strict';
$(document).ready(function () {
  var limit = $(window).height() / 3;
  var $backToTop = $('#footer__up-btn');

  // Появление и исчезновение кнопки "наверх" на первом экране
  $(window).scroll(function () {
    if ($(this).scrollTop() > limit) {
      $backToTop.fadeIn();
    } else {
      $backToTop.fadeOut();
    }
  });

   // Мягкий скролл к началу сайта
  $backToTop.click(function () {
    $('body,html').animate({scrollTop: 0}, 1500);
    return false;
  });
});
