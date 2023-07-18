window.addEventListener('DOMContentLoaded', function () {

    const heroSwiper = new Swiper('.hero__swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    const rengeSlider = document.getElementById('renge-slider');

    if (rengeSlider) {
        noUiSlider.create(rengeSlider, {
            start: [2000, 150000],
            connect: true,
            range: {
                'min': 2000,
                'max': 150000
            }
        });

        const input0 = document.getElementById('input-0');
        const input1 = document.getElementById('input-1');
        const inputs = [input0, input1];

        rengeSlider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = Math.round(values[handle]);
        });

        const setRangeSlider = (i, value) => {
            let arr = [null, null];
            arr[i] = value;
            rengeSlider.noUiSlider.set(arr);
        };

        inputs.forEach((el, index) => {
            el.addEventListener('change', (e) => {
                setRangeSlider(index, e.currentTarget.value);
            });
        });

        const catalogSwiper = new Swiper('.catalog-products__swiper', {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 15,
            grid: {
                rows: 3,
                fill: 'row',
            },

            breakpoints: {
                601: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                    grid: {
                        rows: 3,
                        fill: 'row',
                    },
                },

                769: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 32,
                    grid: {
                        rows: 3,
                        fill: 'row',
                    },
                },
            },

            pagination: {
                el: '.swiper-pagination',
                clickable: true,

                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
        });

        const selectCategories = () => {
            const categories = document.querySelector('.filters-laptop__choices-сategories');
            const choices = new Choices(categories, {
                searchEnabled: false,
                itemSelectText: '',
                position: 'bottom',
                shouldSort: false,
            });
        }
        selectCategories()

        const selectPrice = () => {
            const price = document.querySelector('.filters-laptop__choices-price');
            const choices = new Choices(price, {
                searchEnabled: false,
                itemSelectText: '',
                position: 'bottom',
                shouldSort: false,
            });
        }
        selectPrice()

        const selectDiscount = () => {
            const discount = document.querySelector('.filters-laptop__choices-discount');
            const choices = new Choices(discount, {
                searchEnabled: false,
                itemSelectText: '',
                position: 'bottom',
                shouldSort: false,
            });
        }
        selectDiscount()

        const selectColor = () => {
            const color = document.querySelector('.filters-laptop__choices-color');
            const choices = new Choices(color, {
                searchEnabled: false,
                itemSelectText: '',
                position: 'bottom',
                shouldSort: false,
            });
        }
        selectColor()
    }

    const filterItems = document.querySelectorAll('.catalog-filter__item');
    const catalogChoice = document.querySelector('.catalog-choice');
    const createChoiceItem = (text) => {
        return (
            `
        <button class="catalog-choice__item" data-choice-text="${text}">
            ${text}
            <svg fill="none">
                <use xlink:href="./img/stack/sprite.svg#close"></use>
            </svg>
        </button>
    `
        );
    };

    filterItems.forEach(el => {
        el.querySelector('input').addEventListener('change', (e) => {
            let checked = el.querySelector('input').checked;

            if (checked) {
                el.querySelector('.custom-checkbox').classList.add('custom-checkbox_active');
                let text = el.querySelector('.custom-checkbox__text').textContent;
                catalogChoice.insertAdjacentHTML('afterbegin', createChoiceItem(text));

            } else {
                el.querySelector('.custom-checkbox').classList.remove('custom-checkbox_active')
                let text = el.querySelector('.custom-checkbox').dataset.text;
                document.querySelector(`[data-choice-text="${text}"]`).remove();
            }

            let activeCheckboxes = document.querySelectorAll('.custom-checkbox_active');

            if (activeCheckboxes.length > 0) {
                catalogChoice.style.display = 'block';
            } else {
                catalogChoice.style.display = 'none';
            }
        });


        catalogChoice.addEventListener('click', (e) => {
            if (e.target.classList.contains('catalog-choice__item')) {
                e.target.remove();

                let text = e.target.textContent.trimLeft().trimRight();

                document.querySelector(`[data-text="${text}"]`).querySelector('input').checked = false;
                document.querySelector(`[data-text="${text}"]`).classList.remove('custom-checkbox_active');
            }

            if (e.target.classList.contains('catalog-choice__clear')) {
                Array.from(e.currentTarget.children).forEach(el => {
                    if (!el.classList.contains('catalog-choice__clear')) {
                        el.remove();
                    }

                    filterItems.forEach(el => {
                        el.querySelector('input').checked = false;
                        el.querySelector('.custom-checkbox').classList.remove('custom-checkbox_active');
                    });
                });

                e.currentTarget.style.display = 'none';
            }

            if (e.currentTarget.children.length === 1) {
                e.currentTarget.style.display = 'none';
            }
        });
    });

    const maxItems = 9;
    const filterCategoriesItem = document.querySelectorAll('.filters-сategories__item');
    const filterCategoriesItems = document.querySelector('.filters-сategories__items');
    const hiddenItem = document.querySelectorAll(`.filters-сategories__item:nth-child(n+${maxItems + 1})`);

    filterCategoriesItem.forEach((el, index) => {
        el.setAttribute('data-index', index);
    });

    const showMoreCategories = () => {
        let childenLength = filterCategoriesItems.children.length;

        if (childenLength > maxItems) {
            filterCategoriesItems.insertAdjacentHTML('beforeend',
                `
                <div class="btn-alignment">   
                    <button class="modal-open">Ещё ${(childenLength) - maxItems}</button>
                </div>
                <div class="btn-close">   
                    <button class="modal-close">Свернуть</button>
                </div>

               `
            );

            const btnAlignment = document.querySelector('.btn-alignment');
            const btnClose = document.querySelector('.btn-close');

            hiddenItem.forEach(el => {
                el.classList.add('filters-сategories__item_hidden')
            });

            document.querySelector('.modal-open').addEventListener('click', (el) => {
                hiddenItem.forEach(el => {
                    el.classList.remove('filters-сategories__item_hidden')
                });

                btnAlignment.classList.add('btn-alignment_hidden');
                btnClose.classList.add('btn-close_is-active');

                document.querySelector('.modal-close').addEventListener('click', (e) => {
                    hiddenItem.forEach(el => {
                        el.classList.add('filters-сategories__item_hidden')

                        btnClose.classList.remove('btn-close_is-active');
                        btnAlignment.classList.remove('btn-alignment_hidden');
                    });
                });
            });
        }
    }
    showMoreCategories();

    const filtersDiscountItem = document.querySelectorAll('.filters-discount__item');
    const filtersDiscountItems = document.querySelector('.filters-discount__items');
    const hiddenDiscountItem = document.querySelectorAll(`.filters-discount__item:nth-child(n+${maxItems + 1})`);

    filtersDiscountItem.forEach((el, index) => {
        el.setAttribute('data-index', index);
    });

    const showMoreDiscount = () => {
        let childenLength = filtersDiscountItems.children.length;

        if (childenLength > maxItems) {
            filtersDiscountItems.insertAdjacentHTML('beforeend',
                `
            <div class="btn-alignment">   
                <button class="modal-open">Ещё ${(childenLength) - maxItems}</button>
            </div>
            <div class="btn-close">   
                <button class="modal-close">Свернуть</button>
            </div>

           `
            );

            const btnAlignment = document.querySelector('.btn-alignment');
            const btnClose = document.querySelector('.btn-close');

            hiddenDiscountItem.forEach(el => {
                el.classList.add('filters-discount__item_hidden')
            });

            document.querySelector('.modal-open').addEventListener('click', (el) => {
                hiddenDiscountItem.forEach(el => {
                    el.classList.remove('filters-discount__item_hidden')
                });

                btnAlignment.classList.add('btn-alignment_hidden');
                btnClose.classList.add('btn-close_is-active');

                document.querySelector('.modal-close').addEventListener('click', (e) => {
                    hiddenDiscountItem.forEach(el => {
                        el.classList.add('filters-discount__item_hidden')

                        btnClose.classList.remove('btn-close_is-active');
                        btnAlignment.classList.remove('btn-alignment_hidden');
                    });
                });
            });
        }
    }
    showMoreDiscount();

    const filtersColorItem = document.querySelectorAll('.filters-color__item');
    const filtersColortItems = document.querySelector('.filters-color__items');
    const hiddenColorItem = document.querySelectorAll(`.filters-color__item:nth-child(n+${maxItems + 1})`);

    filtersColorItem.forEach((el, index) => {
        el.setAttribute('data-index', index);
    });

    const showMoreColor = () => {
        let childenLength = filtersColortItems.children.length;

        if (childenLength > maxItems) {
            filtersColortItems.insertAdjacentHTML('beforeend',
                `
            <div class="btn-alignment">   
                <button class="modal-open">Ещё ${(childenLength) - maxItems}</button>
            </div>
            <div class="btn-close">   
                <button class="modal-close">Свернуть</button>
            </div>

           `
            );

            const btnAlignment = document.querySelector('.btn-alignment');
            const btnClose = document.querySelector('.btn-close');

            hiddenColorItem.forEach(el => {
                el.classList.add('filters-color__item_hidden')
            });

            document.querySelector('.modal-open').addEventListener('click', (el) => {
                hiddenColorItem.forEach(el => {
                    el.classList.remove('filters-color__item_hidden')
                });

                btnAlignment.classList.add('btn-alignment_hidden');
                btnClose.classList.add('btn-close_is-active');

                document.querySelector('.modal-close').addEventListener('click', (e) => {
                    hiddenColorItem.forEach(el => {
                        el.classList.add('filters-color__item_hidden')

                        btnClose.classList.remove('btn-close_is-active');
                        btnAlignment.classList.remove('btn-alignment_hidden');
                    });
                });
            });
        }
    }
    showMoreColor();
});