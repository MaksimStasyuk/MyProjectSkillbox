//Создаем список рас
export function createListSpecies(apiSpecies, lists) {
    const $titleSpecies = document.createElement('h2'),
        $listGroupSpecies = document.createElement('div');

    $titleSpecies.textContent = 'Species'
    $listGroupSpecies.classList.add('list-group', 'list-group-item-primary', 'mb-3');;

    Promise.all(apiSpecies.map(src => fetch(src).then(res => res.json())))
        .then(arrSpecies => {
            for (const species of arrSpecies) {
                const $itemSpecies = document.createElement('li');

                $itemSpecies.classList.add('list-group-item');
                $itemSpecies.textContent = species.name;

                $listGroupSpecies.append($itemSpecies);
                lists.append($titleSpecies, $listGroupSpecies);
            }
        });
}