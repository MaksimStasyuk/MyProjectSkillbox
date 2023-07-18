window.addEventListener('DOMContentLoaded', function () {
    function init() {
        var arr = [
            "Москва, SitDownPls на Солянке м. Китай-город, ул. Солянка, д.24",
            "Москва, SitDownPls на Покровке м. Курская, ул. Покровка, д.44"
        ];

        find = function (arr, find) {
            return arr.filter(function (value) {
                return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
            });
        };

        var provider = {
            suggest: function (request, options) {
                var res = find(arr, request),
                    arrayResult = [],
                    results = Math.min(options.results, res.length);
                for (var i = 0; i < results; i++) {
                    arrayResult.push({ displayName: res[i], value: res[i] })
                }
                return ymaps.vow.resolve(arrayResult);
            }
        };

        var suggestView = new ymaps.SuggestView('suggest', { provider: provider, results: 2 });

        var myMap = new ymaps.Map('map', {
            center: [55.7541, 37.62909],
            zoom: 15,
        })

        const myPlacemark1 = new ymaps.Placemark([55.751615568993275, 37.641999999995], {
            balloonContent: `
                      <div class="contacts__balloon balloon">
                                             <h2 class="balloon__title">SitDownPls на Солянке </h2>
                        <address class="balloon__address">м. Китай-город, ул. Солянка, д.24</address>
                        <a href="tel:+74958854547" class="balloon__link">
                            +7 (495) 885-45-47
                        </a>
                      
                     
                        <p class="balloon__clockwork"><span>Часы работы:</span> с 10:00 до 21:00</p>
                      
                      
                        <p class="balloon__descr">
                          <span>Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
                        </p>
                     
                    </div>
                `
        }, {
            iconLayout: "default#image",
            iconImageHref: "../img/elephant2.svg",
            iconImageSize: [32, 23],
            iconImageOffset: [0, 0],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, 0],
        }
        );

        const myPlacemark2 = new ymaps.Placemark([55.7598, 37.6506], {
            balloonContent: `
                                    <div class="contacts__balloon balloon">
                                    <div class="balloon__top">
                                      <h2 class="balloon__title">SitDownPls на Покровке </h2>
                                      <address class="balloon__address">м. Курская, ул. Покровка, д.44</address>
                                      <a href="tel:+74958854547" class="balloon__link">
                                        +7 (495) 885-45-47
                                      </a>
                                    </div>
                                    <div class="balloon__center">
                                      <p class="balloon__clockwork"><span>Часы работы:</span> с 10:00 до 21:00</p>
                                    </div>
                                    <div class="balloon__bottom">
                                      <p class="balloon__descr">
                                        <span class="balloon__span">Что здесь:</span> шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
                                      </p>
                                    </div>
                                  </div>
                              `
        }, {
            iconLayout: "default#image",
            iconImageHref: "../img/elephant2.svg",
            iconImageSize: [32, 23],
            iconImageOffset: [0, 0],
            balloonOffset: [0, 0],
            hideIconOnBalloonOpen: false,
        },
        );

        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('zoomControl');
        myMap.controls.remove('rulerControl');

        myMap.geoObjects.add(myPlacemark1);
        myMap.geoObjects.add(myPlacemark2);
        myPlacemark1.balloon.open();
    }
    ymaps.ready(init);
});
