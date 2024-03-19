//key cortinovis.edoardo.studente = e9a9bf8905fe470f930f039b0c565f98
//key edo personale = ff3b96012253421688004de0d2a35598




/*function ricerca() {
    const domanda = document.getElementById("cerca").value;
    const apiUrl = "https://newsapi.org/v2/everything?q=" + domanda + "&apiKey=" + key;
    search(apiUrl);
    populateCarousel(apiUrl); // Aggiunta della chiamata a populateCarousel
}*/



/*function ricerca() {
    const domanda = document.getElementById("cerca").value.trim(); // Rimuove eventuali spazi iniziali e finali
    const apiUrl = "https://newsapi.org/v2/everything?q=" + domanda + "&apiKey=" + key;
    
    if (searchResultsCache.hasOwnProperty(apiUrl)) {Z
        updateUI(searchResultsCache[apiUrl]);
        populateCarousel(searchResultsCache[apiUrl]);
    } else {
        search(apiUrl)
            .then(data => {
                searchResultsCache[apiUrl] = data;
                updateUI(data);
                populateCarousel(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}*/
/*function search(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Rimuovi il carouselInner
            let carouselInner = document.querySelector('#carouselExampleIndicators .carousel-inner');
            carouselInner.innerHTML = '';

            // Popola il carousel solo se ci sono almeno 3 articoli disponibili
            if (data.articles.length >= 3) {
                populateCarousel(data); // Chiamata a populateCarousel() con i dati ottenuti dall'API
            }

            // Continua con la creazione e visualizzazione delle notizie
            const newsContainer = document.getElementById('news-container');
            if (newsContainer) {
                newsContainer.remove();
            }

            const newNewsContainer = document.createElement('div');
            newNewsContainer.id = 'news-container';
            newNewsContainer.classList.add('container');

            const row = document.createElement('div');
            row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

            for (let i = 0; i < data.articles.length; i++) {
                const article = data.articles[i];

                const col = document.createElement('div');
                col.classList.add('col');

                const newsItem = document.createElement('div');
                newsItem.classList.add('card', 'h-100');

                if (article.urlToImage) {
                    const image = document.createElement('img');
                    image.src = article.urlToImage;
                    image.classList.add('card-img-top');
                    image.style.height = '200px'; 
                    image.style.objectFit = 'cover'; 
                    newsItem.appendChild(image);
                } else {
                    continue;
                }

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'd-flex', 'flex-column');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;

                const description = document.createElement('p');
                description.classList.add('card-text');
                description.textContent = article.description;

                let publishedAt = document.createElement('p');
                publishedAt.textContent = new Date(article.publishedAt).toLocaleString();

                const addToFavoritesButton = document.createElement('button');
                addToFavoritesButton.textContent = '❤️';
                addToFavoritesButton.classList.add('btn', 'btn-primary', 'mt-auto', 'align-self-end');

                addToFavoritesButton.addEventListener('click', () => {
                    const favorites = JSON.parse(localStorage.getItem('newProjectFavorites')) || [];
                    favorites.push(article);
                    localStorage.setItem('newProjectFavorites', JSON.stringify(favorites));
                    console.log('Articolo aggiunto ai preferiti:', article.title);
                });

                cardBody.appendChild(title);
                cardBody.appendChild(description);
                cardBody.appendChild(publishedAt);
                cardBody.appendChild(addToFavoritesButton);

                newsItem.appendChild(cardBody);

                col.appendChild(newsItem);
                row.appendChild(col);
            }

            newNewsContainer.appendChild(row);

            document.body.appendChild(newNewsContainer);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}*/

const key = "e9a9bf8905fe470f930f039b0c565f98";

const searchResultsCache = {};

function ricerca() {
    const domanda = document.getElementById("cerca").value.trim();
    const cacheKey = `news_search_${domanda}`; // Chiave unica per ogni ricerca

    // Prova a recuperare i dati dal localStorage
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        console.log("Lettura dalla cache per:", domanda);
        const data = JSON.parse(cachedData);
        updateUI(data);
        populateCarousel(data);
    } else {
        const apiUrl = "https://newsapi.org/v2/everything?q=" + encodeURIComponent(domanda) + "&apiKey=" + key;
        search(apiUrl).then(data => {
            // Dopo aver ottenuto i dati, salvali nel localStorage
            localStorage.setItem(cacheKey, JSON.stringify(data));
            updateUI(data);
            populateCarousel(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }
}

function search(apiUrl) {
    console.log("Effettuando la chiamata API per:", apiUrl);
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Qui, invece di manipolare l'UI, restituiamo i dati per essere gestiti da `ricerca`
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Rilancia l'errore per gestirlo nel catch di `ricerca`
        });
}


function updateUI(data) {
    // Assumi che "data" contenga l'oggetto con i dati delle notizie ottenuti dall'API o dalla cache

    // Rimuovi il contenuto esistente
    let carouselInner = document.querySelector('#carouselExampleIndicators .carousel-inner');
    carouselInner.innerHTML = '';

    let newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.remove();
    }

    newsContainer = document.createElement('div');
    newsContainer.id = 'news-container';
    newsContainer.classList.add('container');
    document.body.appendChild(newsContainer);

    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
    newsContainer.appendChild(row);

    // Filtra gli articoli che hanno un URL dell'immagine
    const filteredArticles = data.articles.filter(article => article.urlToImage);

    filteredArticles.forEach(article => {
        const col = document.createElement('div');
        col.classList.add('col');

        const newsItem = document.createElement('div');
        newsItem.classList.add('card', 'h-100');

        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.classList.add('card-img-top');
        image.style.height = '200px';
        image.style.objectFit = 'cover';
        newsItem.appendChild(image);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = article.description;

        let publishedAt = document.createElement('p');
        publishedAt.textContent = new Date(article.publishedAt).toLocaleString();

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = '❤️';
        addToFavoritesButton.classList.add('btn', 'btn-primary', 'mt-auto', 'align-self-end');

        addToFavoritesButton.addEventListener('click', () => {
            // Ottieni l'array dei preferiti dal localStorage, o inizializzalo se non esiste
            const favorites = JSON.parse(localStorage.getItem('newProjectFavorites')) || [];

            // Aggiungi l'articolo corrente ai preferiti, assicurandoti di non duplicare gli articoli
            // Puoi decidere di controllare i duplicati basandoti su un identificativo unico, come l'URL dell'articolo
            const articleExists = favorites.some(favorite => favorite.url === article.url);
            if (!articleExists) {
                favorites.push(article);
                localStorage.setItem('newProjectFavorites', JSON.stringify(favorites));
                console.log('Articolo aggiunto ai preferiti:', article.title);
            } else {
                console.log('Questo articolo è già nei preferiti');
            }
        });


        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(publishedAt);
        cardBody.appendChild(addToFavoritesButton);

        newsItem.appendChild(cardBody);

        col.appendChild(newsItem);
        row.appendChild(col);
    });
}





function populateCarousel(data) {
    let carouselInner = document.querySelector('#carouselExampleIndicators .carousel-inner');

    carouselInner.innerHTML = '';

    for (let i = 0; i < Math.min(3, data.articles.length); i++) {
        let article = data.articles[i];
        if (article.urlToImage) {
            let carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (i === 0) {
                carouselItem.classList.add('active'); // Aggiungi la classe "active" solo al primo elemento
            }

            let image = document.createElement('img');
            image.src = article.urlToImage;
            image.classList.add('img', 'mx-auto');

            image.style.height = '600px';

            carouselItem.appendChild(image);
            carouselInner.appendChild(carouselItem);
        }
    }
}









