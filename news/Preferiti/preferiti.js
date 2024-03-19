function loadFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');

    // Recupera le notizie preferite dal localStorage
    const favorites = JSON.parse(localStorage.getItem('newProjectFavorites')) || [];

    // Controlla se ci sono notizie preferite nel localStorage
    if (favorites.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Nessuna notizia preferita trovata.';
        favoritesContainer.appendChild(message);
    } else {
        // Cicla attraverso le notizie preferite e crea le card
        let row;
        const addedTitles = []; // Array per tenere traccia dei titoli già aggiunti
        favorites.forEach((article, index) => {
            // Controllo se il titolo dell'articolo è già stato aggiunto
            if (addedTitles.includes(article.title)) {
                return; // Salta l'articolo se il titolo è già presente nei preferiti
            }
            
            addedTitles.push(article.title); // Aggiungi il titolo all'array

            // Crea una nuova riga ogni tre elementi
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
                favoritesContainer.appendChild(row);
            }

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
            }

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'position-relative'); // Aggiungiamo position-relative per consentire il posizionamento assoluto del pulsante

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;

            const description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = article.description || 'Nessuna descrizione disponibile.';

            let publishedAt = document.createElement('p');
            publishedAt.textContent = new Date(article.publishedAt).toLocaleString();

            const removeButton = document.createElement('button');
            removeButton.textContent = '💔';
            removeButton.classList.add('btn', 'btn-danger', 'position-absolute', 'bottom-0', 'end-0', 'mb-2', 'me-2'); // Aggiungiamo classi di Bootstrap per posizionare il pulsante nell'angolo in basso a destra
            removeButton.addEventListener('click', () => {
                removeFavorite(article);
                col.remove(); // Rimuove la card dalla visualizzazione
                location.reload(); // Ricarica la pagina per aggiornare la visualizzazione
            });

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(publishedAt);
            cardBody.appendChild(removeButton); // Aggiungi il bottone "Rimuovi dai Preferiti"

            newsItem.appendChild(cardBody);
            col.appendChild(newsItem);
            row.appendChild(col);
        });
    }
}

function removeFavorite(article) {
    const favorites = JSON.parse(localStorage.getItem('newProjectFavorites')) || [];
    const updatedFavorites = favorites.filter(fav => fav.title !== article.title); // Rimuove l'articolo dalla lista dei preferiti
    localStorage.setItem('newProjectFavorites', JSON.stringify(updatedFavorites)); // Aggiorna i preferiti nel localStorage
}
