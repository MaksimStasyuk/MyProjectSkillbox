window.addEventListener('DOMContentLoaded', function () {

    const cardBlockSwiper = new Swiper('.card-slider__block', {
        slidesPerView: 1
    });

    const sliderNavItems = document.querySelectorAll('.card-slider__nav');

    sliderNavItems.forEach((el, index) => {
        el.setAttribute('data-index', index);

        el.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            cardBlockSwiper.slideTo(index);
        });
    });

    const cardNavSwiper = new Swiper('.card-slider__nav', {
        slidesPerView: 'auto',
        spaceBetween: 4,
        breakpoints: {
            501: {
                slidesPerView: 4,
                direction: 'vertical'
            },

            1000: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                direction: 'horizontal'
            },

            1366: {
                slidesPerView: 4,
                spaceBetween: 32
            }
        }
    });

    const similarProductsSwiper = new Swiper('.similar-products__swiper', {
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,

        breakpoints: {
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
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 32
            }
        },

        navigation: {
            nextEl: '.similar-products__swiper-button-next',
            prevEl: '.similar-products__swiper-button-prev',
        },
    });

    const cardModalBtns = document.querySelectorAll('.modal-btn');
    const cardModalOverlay = document.querySelector('.modal__overlay');
    const cardModalsContent = document.querySelectorAll('.modal__content');
    const cardModalClose = document.querySelectorAll('.modal__close');
    const body = document.body;

    cardModalBtns.forEach((el) => {
        el.addEventListener('click', (e) => {

            cardModalsContent.forEach((el) => {
                el.classList.remove('modal__content_visible')
            })

            body.classList.add('stop-scroll');
            let path = e.currentTarget.getAttribute('data-path');


            document.querySelector(`[data-target="${path}"]`).classList.add('modal__content_visible');
            cardModalOverlay.classList.add('modal__overlay_visible');
        });
    });

    cardModalClose.forEach((el) => {
        el.addEventListener('click', () => {
            cardModalOverlay.classList.remove('modal__overlay_visible');
            body.classList.remove('stop-scroll');
        });
    });

    cardModalOverlay.addEventListener('click', (e) => {
        if (e.target == cardModalOverlay) {
            cardModalOverlay.classList.remove('modal__overlay_visible');
            body.classList.remove('stop-scroll');

        }
    });

    const modalSwiper = new Swiper('.modal-3__slider-block', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
    });


    const modalNavSwiper = new Swiper('.modal-3__slider-nav', {
        slidesPerView: 1,
        spaceBetween: 0,

        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 0
            },

            769: {
                slidesPerView: 3,
                spaceBetween: 25
            },

            1366: {
                slidesPerView: 4,
                spaceBetween: 25
            }

        },
        navigation: {
            nextEl: 'modal-3-preview__swiper-button-next',
            prevEl: 'modal-3-preview__swiper-button-prev',
        }
    });

    const modalNavItems = document.querySelectorAll('.nav-modal-3__item');

    modalNavItems.forEach((el, index) => {
        el.setAttribute('data-index', index);

        el.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            modalSwiper.slideTo(index + 1);
        });
    });


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
        },
        messages: {
            name: {
                required: 'Введите имя',
                minLength: 'Недопустимый формат',
                strength: 'Недопустимый формат'
            },
        }
    });
});