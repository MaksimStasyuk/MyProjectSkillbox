window.addEventListener('DOMContentLoaded', function () {

    const onclickReset = document.querySelectorAll('.onclickReset')

    onclickReset.forEach(function (el) {
        el.onclick = function () {
            return false;
        };
    });

    const burger = document.querySelector('.burger');
    const slide = document.querySelector('.header-center__nav');
    const menu = document.querySelector('.header-center__menu');
    const slideItems = slide.querySelectorAll('a');
    const body = document.body;

    burger.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('burger_active');
        body.classList.toggle('stop-scroll');
        slide.classList.toggle('header-center__nav_active');
        menu.classList.toggle('header-center__menu_active');
    });

    slideItems.forEach(el => {
        el.addEventListener('click', () => {
            body.classList.remove('stop-scroll');
            slide.classList.remove('header-center__nav_active');
            menu.classList.remove('header-center__menu_active');
        });
    });

    const heroSwiper = new Swiper('.hero__swiper', {
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },


        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<svg class="fp-arc-loader" width="24" height="24" viewBox="0 0 24 24">' +
                    ' <circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" stroke-width="2.5px"/>' +
                    '<circle class="path" cx="12" cy="12" r="10" transform="rotate(-90 12 12)"' +
                    'stroke-width="2.5px" stroke="#ffffff" fill="transparent"></circle>' +
                    '</svg></span>';
            },
        },
    });

    const specialOffersSwiper = new Swiper('.special-offers__swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const highRatingAllEvents = document.querySelector('.high-rating__btn')

    highRatingAllEvents.addEventListener('click', () => {
        document.querySelectorAll('.high-rating__item').forEach((e) => {
            e.classList.add('high-rating__item_visible')

            highRatingAllEvents.classList.add('high-rating__btn_hide')
        });
    });

    const usefulSwiper = new Swiper('.useful__swiper', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        breakpoints: {

            320: {
                slidesPerView: 1,
                slidesPerGroup: 1
            },

            500: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 32
            },

            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 32
            },

            1920: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 32
            }
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var selector = document.querySelector("input[type='tel']");
    var im = Inputmask("+7 (999) 999-99-99");

    im.mask(selector);

    new JustValidate('.js-form', {
        colorWrong: '#F06666',
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
                    return Number(phone) && phone.length === 10
                }
            },

            email: {
                required: false,
                email: true
            },
        },
        messages: {
            name: {
                required: 'Введите имя',
                minLength: 'Недопустимый формат',
                strength: 'Недопустимый формат'
            },

            tel: {
                required: 'Введите номер телефона'
            },

            email: 'Недопустимый формат'
        }
    });

    const contactModalBtn = document.querySelector('.contacts__btn');
    const contactModalOverlay = document.querySelector('.contacts__modal-overlay');
    const contactModalContent = document.querySelector('.contacts__modal-content');
    const contactModalClose = document.querySelector('.contacts__modal-btn');

    contactModalBtn.addEventListener('click', (e) => {
        body.classList.add('stop-scroll');
        let path = e.currentTarget.getAttribute('data-path');
        document.querySelector(`[data-target="${path}"]`).classList.add('contacts__modal-content_visible');
        contactModalOverlay.classList.add('contacts__modal-overlay_visible');
    });

    contactModalClose.addEventListener('click', () => {
        contactModalOverlay.classList.remove('contacts__modal-overlay_visible');
        body.classList.remove('stop-scroll');
    });

    contactModalOverlay.addEventListener('click', (e) => {
        if (e.target == contactModalOverlay) {
            contactModalOverlay.classList.remove('contacts__modal-overlay_visible');
            contactModalContent.classList.remove('contacts__modal-overlay_visible');
            body.classList.remove('stop-scroll');
        }
    });
});