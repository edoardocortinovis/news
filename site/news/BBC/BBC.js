const key = "ff3b96012253421688004de0d2a35598";


function ricerca() {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=ff3b96012253421688004de0d2a35598';
    search(apiUrl);
}

function search(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            if (newsContainer) {
                // Se esiste un container delle notizie precedenti, rimuovilo
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
                cardBody.classList.add('card-body', 'd-flex', 'flex-column'); // Imposta il corpo della card come contenitore flessibile

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
                addToFavoritesButton.classList.add('btn', 'btn-primary', 'mt-auto', 'align-self-end'); // Posiziona il bottone in basso a destra

                addToFavoritesButton.addEventListener('click', () => {
                    // Salvare l'articolo preferito nel localStorage con una chiave univoca
                    const favorites = JSON.parse(localStorage.getItem('newProjectFavorites')) || []; // Otteniamo l'array dei preferiti dal localStorage o creiamo un array vuoto se non esiste
                    favorites.push(article); // Aggiungiamo l'articolo ai preferiti
                    localStorage.setItem('newProjectFavorites', JSON.stringify(favorites)); // Salviamo l'array aggiornato nel localStorage
                    console.log('Articolo aggiunto ai preferiti:', article.title);
                });

                cardBody.appendChild(title);
                cardBody.appendChild(description);
                cardBody.appendChild(publishedAt);
                cardBody.appendChild(addToFavoritesButton); // Aggiungi il bottone alla fine del corpo della card

                newsItem.appendChild(cardBody);

                col.appendChild(newsItem);
                row.appendChild(col);
            }

            newNewsContainer.appendChild(row);

            // Aggiungi il nuovo container delle notizie al documento
            document.body.appendChild(newNewsContainer);

            // Chiamata a populateCarousel solo dopo aver completato la ricerca delle notizie
        })
        
}

// Funzione per popolare il carousel con le immagini delle notizie


ricerca();
