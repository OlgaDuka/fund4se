'use strict';

(function () {
  // initMap() - функция инициализации карты
  function initMap() {
  	// Координаты центра на карте. Широта: 56.2928515, Долгота: 43.7866641
  	var centerLatLng = new google.maps.LatLng(1.286036, 103.847851);
  	// Обязательные опции с которыми будет проинициализированна карта
  	var mapOptions = {
  		center: centerLatLng, // Координаты центра мы берем из переменной centerLatLng
  		zoom: 14               // Зум по умолчанию. Возможные значения от 0 до 21
  	};
  	// Создаем карту внутри элемента #map
  	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
  // Ждем полной загрузки страницы, после этого запускаем initMap()
  google.maps.event.addDomListener(window, "load", initMap);
})();
