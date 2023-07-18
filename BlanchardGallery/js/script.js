window.addEventListener('DOMContentLoaded', function () {

  const onclickReset = document.querySelectorAll('.onclick__reset')

  onclickReset.forEach(function (el) {
    el.onclick = function () {
      return false;
    };
  });

  const menu = document.querySelector('.header__burger'),
    burger = document.querySelector('.header-top__burger'),
    closed = document.querySelector('.burger__close');

  burger.addEventListener('click', () => {
    menu.classList.add('open');
  });

  closed.addEventListener('click', () => {

    menu.classList.remove('open');
  });

  const search = document.querySelector('.header__search'),
    searchActive = document.querySelector('.header-search__open');

  searchActive.addEventListener('click', () => {
    search.classList.add('header-search__active');
    searchActive.classList.add('header-search__open_clear');
  });

  
  let categoryLink = document.querySelectorAll('.header-bottom__btn');

  for (i = 0; i < categoryLink.length; i++) {
    let subMenu = categoryLink[i].nextElementSibling;
    let thisArrow = categoryLink[i];

    categoryLink[i].addEventListener('click', function (e) {

      document.querySelectorAll('.header-bottom__list_dropdown').forEach(function (Content) {
        Content.classList.remove('open')
      });

      document.querySelectorAll('.header-bottom__btn').forEach(function (dellActiv) {
        dellActiv.classList.remove('active')
      });

      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
    });
  }

  window.addEventListener('click', function (e) {
    if (!e.target.classList.contains('header-bottom__btn')) {
      document.querySelectorAll('.header-bottom__list_dropdown').forEach(function (dellActiv) {
        dellActiv.classList.remove('open')
      });
    }
  });

  window.addEventListener('click', function (e) {
    if (!e.target.classList.contains('header-bottom__btn')) {
      document.querySelectorAll('.header-bottom__btn').forEach(function (dellActiv) {
        dellActiv.classList.remove('active')
      });
    }
  });

  const heroSwiper = new Swiper('.hero__swiper', {
    loop: true,
  });

  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
  });

  const gallerySwiper = new Swiper('.gallery__swiper', {

    breakpoints: {

      375: {
        slidesPerView: 1,
        spaceBetween: 0
      },

      376: {
        grid: {
          rows: 2,
          fill: 'row',
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32
      },

      1366: {
        grid: {
          rows: 2,
          fill: 'row',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 34

      },

      1920: {
        grid: {
          rows: 2,
          fill: 'row',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 45
      },

    },

    pagination: {
      el: '.pag-2',
      type: 'fraction',
      clickable: true,
    },

    navigation: {
      nextEl: '.button-next-2',
      prevEl: '.button-prev-2',
    },

  });

  //Табы по странам
  const countries = document.querySelectorAll('.tab__btn')
  countries.forEach(function (tabBtn) {
    tabBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.catalog__tab-wrapper-2').forEach(function (tabBox) {
        tabBox.classList.remove('catalog__tab-wrapper-2_activ')

        countries.forEach(function (active) {
          active.classList.remove('tab__btn_active')
        });

        tabBtn.classList.add('tab__btn_active')
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('catalog__tab-wrapper-2_activ')
    });
  });

  //Аккордион  по векам
  const handleClickFr = function (e) {
    const accordions = document.querySelectorAll('.catalog__tab-wrapper-2_activ .accordion__item');
    const self = e.currentTarget.parentElement;

    if (self.classList.contains('open')) {
      self.classList.remove('open');
    }
    else {
      accordions.forEach(function (el) {
        el.classList.remove('open');
      });
      self.classList.add('open')
    }
  }

  document.querySelectorAll('.accordion__control').forEach(function (item) {
    item.addEventListener("click", handleClickFr)
  });

  //Табы художника
  const accordiondesc = document.querySelectorAll('.accordion-desc__btn')
  accordiondesc.forEach(function (accordionBtn) {
    accordionBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.catalog__tab-wrapper-2_activ .tab-box__col_1').forEach(function (tabBox) {
        tabBox.classList.remove('accordionTabActive')
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('accordionTabActive')

      document.querySelectorAll('.catalog__tab-wrapper-2_activ .accordion-desc__btn').forEach(function (active) {
        active.classList.remove('accordion-desc__btn_active')
      });

      accordionBtn.classList.add('accordion-desc__btn_active')

      const accordionItemActive = document.querySelectorAll('.accordion__item')
      accordionItemActive.forEach(function () {

        document.querySelectorAll('.catalog__tab-wrapper-2_activ .accordion__item').forEach(function (e) {
          e.classList.remove('is-active')
        });

        document.querySelectorAll('.catalog__tab-wrapper-2_activ .open').forEach(function (el) {
          el.classList.add('is-active')
        });
      });
    });
  });

  //Пустой Бланк
  const accordionBlank = document.querySelectorAll('.accordion__control_blank')
  accordionBlank.forEach(function (accordionBtn) {
    accordionBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.catalog__tab-wrapper-2_activ .tab-box__col_1').forEach(function (tabBox) {
        tabBox.classList.remove('accordionTabActive')
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('accordionTabActive')

      const accordionItemActive = document.querySelectorAll('.accordion__item')
      accordionItemActive.forEach(function () {

        document.querySelectorAll('.catalog__tab-wrapper-2_activ .accordion__item').forEach(function (e) {
          e.classList.remove('is-active')
        });

        document.querySelectorAll('.catalog__tab-wrapper-2_activ .open').forEach(function (el) {
          el.classList.add('is-active')
        });
      });
    });
  });

  const allEvents = document.querySelector('.event__btn')

  allEvents.addEventListener('click', (el) => {

    document.querySelectorAll('.events__item').forEach((e) => {
      e.classList.add('is-visible')

      allEvents.classList.add('hide')
    });

  });

  const eventsSwiper = new Swiper('.events__swiper', {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 15,

    pagination: {
      el: '.swiper-pag',
      clickable: true,
    },

  });

  const editionSwiper = new Swiper('.edition__swiper', {
    grid: {
      fill: 'row',
    },

    breakpoints: {

      375: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50
      },

      1150: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      },

      1920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      },

    },

    pagination: {
      el: '.pag-3',
      type: 'fraction',
      clickable: true,
    },

    navigation: {
      nextEl: '.button-next-3',
      prevEl: '.button-prev-3',
    },

  });

  const spoylerClick = function (e) {
    const self = e.currentTarget.parentElement;

    if (self.classList.contains('open')) {
      self.classList.remove('open');
    }
    else {
      self.classList.add('open')
    }
  }

  document.querySelectorAll('.edition-spoyler__btn').forEach(function (item) {
    item.addEventListener("click", spoylerClick)
  });

  const checkActive = function (e) {
    const self = e.currentTarget.parentElement;

    if (self.classList.contains('is-active')) {
      self.classList.remove('is-active');
    }
    else {
      self.classList.toggle('is-active')
    }
  }

  document.querySelectorAll('.edition-spoyler__check').forEach(function (item) {
    item.addEventListener("click", checkActive)
  });

  const projectSwiper = new Swiper('.project__swiper', {
    loop: true,
    grid: {
      fill: 'row',
    },

    breakpoints: {

      375: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20
      },

      660: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50
      },

      1366: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      },

      1920: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      },

    },

    navigation: {
      nextEl: '.button-next-4',
      prevEl: '.button-prev-4',
    },

  });

  ymaps.ready(init);

  function init() {
    myMap = new ymaps.Map('map', {
      center: [55.760, 37.645],
      zoom: 14,
      controls: []
    });

    var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/contacts/markers.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-18, 4]
    });

    myMap.geoObjects.add(myPlacemark);

    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'small',
        float: 'none',
        position: {
          top: 265,
          right: 10
        }
      }
    });

    myMap.controls.add(zoomControl);

    myMap.controls.add('geolocationControl', {
      float: 'none',
      position: {
        top: 360,
        right: 10
      }
    });

  }

  ymaps.ready(init2);

  function init2() {
    myMap = new ymaps.Map('map320', {
      center: [55.75932, 37.610253],
      zoom: 14,
      controls: []
    });

    var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/contacts/markers.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-18, -10]
    });

    myMap.geoObjects.add(myPlacemark);

  }

  var selector = document.querySelector("input[type='tel']");
  var im = Inputmask("+7 (999) 999-99-99");

  im.mask(selector);


  new JustValidate('.js-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
        strength: {
          custom: '^[A-Za-zА-Яа-я]+$'
        },
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        }
      },
    }
  });

});