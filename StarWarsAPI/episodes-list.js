export function render(data) {
    const $container = document.createElement('div');

    $container.classList.add('container', 'py-4');

    for (const episode of data.results) {
        const $listGroup = document.createElement('div'),
            $item = document.createElement('a'),
            $title = document.createElement('h2'),
            $scene = document.createElement('span'),
            $text = document.createElement('span');

        $listGroup.classList.add('list-group');

        $item.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-primary');
        $title.classList.add('card-title');

        $listGroup.append($item);
        $title.append($scene, $text);
        $item.append($title);

        $scene.textContent = `Episod ${episode.episode_id}`;
        $text.textContent = ` "${episode.title}"`;

        $item.addEventListener('click', (e) => {
            e.preventDefault;
            history.pushState(episode.episode_id, '', `?episode=${episode.episode_id}`);
            import('./main.js')
                .then(module => {
                    module.renderPege(
                        './episodes-details.js',
                        `https://swapi.dev/api/films/${episode.episode_id}`,
                        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'
                    )
                });
        });

        $container.append($listGroup);
    }

    return $container;
}