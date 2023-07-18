const cssPromise = {};
const appContainer = document.querySelector('#app');
const searchParams = new URLSearchParams(location.search); //поиск по url
const episode = searchParams.get('episode');

function loadResource(src) {
    //Javascript module
    if (src.endsWith('.js')) {
        return import(src);
    }
    //CSS файл
    if (src.endsWith('.css')) {
        if (!cssPromise[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromise[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }

        return cssPromise[src]
    }
    //данные с сервера 
    return fetch(src).then(res => res.json());
}

export function renderPege(
    moduleName,
    apiUrl,
    css = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'
) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
        .then(([pageModule, data]) => {
            appContainer.innerHTML = '';
            appContainer.append(pageModule.render(data));
        });
}

if (episode) {
    renderPege(
        './episodes-details.js',
        `https://swapi.dev/api/films/${episode}`,
    );
} else {
    renderPege(
        './episodes-list.js',
        'https://swapi.dev/api/films',
    );
}

window.addEventListener('popstate', e => {
    if (e.state === null) {
        renderPege(
            './episodes-list.js',
            'https://swapi.dev/api/films',
        );
    } else {
        renderPege(
            './episodes-details.js',
            `https://swapi.dev/api/films/${episode}`,
        );
    }
});
