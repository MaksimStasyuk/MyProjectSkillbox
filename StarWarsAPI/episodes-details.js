//прорисовка страницы
export function render(data) {
    const $container = document.createElement('div'),
        $title = document.createElement('h1'),
        $text = document.createElement('span'),
        $scene = document.createElement('span'),
        $buttonBack = document.createElement('a'),
        $description = document.createElement('p'),
        $listsPlanet = document.createElement('div'),
        $listsSpecies = document.createElement('div');

    //стили элемнтов
    $container.classList.add('container', 'py-4');
    $title.classList.add('mb-3');
    $buttonBack.classList.add('btn', 'btn-primary', 'mb-3');
    $description.classList.add('mb-3');

    //Контент элементов
    $text.textContent = data.title;
    $scene.textContent = ` Episod ${data.episode_id}`;
    $buttonBack.textContent = 'Back to episodes';
    $description.textContent = data.opening_crawl;

    //Обработчик клика кнопки 
    $buttonBack.addEventListener('click', (e) => {
        e.preventDefault;
        history.back();
        import('./main.js')
            .then(module => {
                module.renderPege(
                    './episodes-list.js',
                    'https://swapi.dev/api/films',
                )
            });
    });

    //Вызфвыем функцию создания списка планет
    import('./createListPlanets.js')
        .then(modulePlanet => {
            modulePlanet.createListPlanets(data.planets, $listsPlanet);
        });

    //Вызфвыем функцию создания списока pac
    import('./createListSpecies.js')
        .then(moduleSpecies => {
            moduleSpecies.createListSpecies(data.species, $listsSpecies);
        });

    //Добавляем элементы на страницу
    $title.append($text, $scene)
    $container.append(
        $title,
        $buttonBack,
        $description,
        $listsPlanet,
        $listsSpecies
    );

    return $container;
}