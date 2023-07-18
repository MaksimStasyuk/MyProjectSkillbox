window.addEventListener('DOMContentLoaded', function () {

    const selectTop = () => {
        const element = document.querySelector('.header-top__choices');
        const choices = new Choices(element, {
            searchEnabled: false,
            itemSelectText: '',
            position: 'bottom',
            shouldSort: false,
        });
    }
    selectTop()

    const selectbottom = () => {
        const el = document.querySelector('.header-bottom__choices');
        const choices = new Choices(el, {
            searchEnabled: false,
            itemSelectText: '',
            position: 'bottom',
            shouldSort: false,
        });
    }
    selectbottom()

});