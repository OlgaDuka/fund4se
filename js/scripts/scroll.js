'use strict';

var $j = jQuery.noConflict();

$j(document).ready(function () {
  var limit = $j(window).height() / 3;
  var backToTop = $j('#footer__up-btn');

  // Appearing and disappearing of the 'up' button on the first screen
  $j(window).scroll(function () {
    if ($j(this).scrollTop() > limit) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });

   // Soft scroll to the top
  backToTop.click(function () {
    $j('body,html').animate({scrollTop: 0}, 100);
    return false;
  });
});
