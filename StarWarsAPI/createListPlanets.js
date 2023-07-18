//Создаем список планет
export function createListPlanets(apiPlanets, lists) {
    const $titlePlanets = document.createElement('h2'),
        $listGroupPlanets = document.createElement('div');

    $titlePlanets.textContent = 'Planets';
    $listGroupPlanets.classList.add('list-group', 'list-group-item-primary', 'mb-3');


    Promise.all(apiPlanets.map(src => fetch(src).then(res => res.json())))
        .then(arrPlanet => {
            for (const planet of arrPlanet) {
                const $itemPlanets = document.createElement('li');

                $itemPlanets.classList.add('list-group-item');
                $itemPlanets.textContent = planet.name;

                $listGroupPlanets.append($itemPlanets);
                lists.append($titlePlanets, $listGroupPlanets);
            }
        });
}