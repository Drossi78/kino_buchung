$(document).ready(function () {
    console.log("Filme-Seite geladen!");

    function ladeFilme() {
        fetch("/api/filme")
            .then(response => response.json())
            .then(filme => {
                const movieList = $("#movie-list");
                movieList.empty();

                filme.forEach(film => {
                    movieList.append(`
                        <div class="movie">
                            <img src="${film.bild}" alt="${film.titel}" class="movie-image">
                            <h3>${film.titel}</h3>
                            <p>${film.beschreibung}</p>
                            <button onclick="reserviereFilm(${film.id})">Reservieren</button>
                        </div>
                    `);
                });
            })
            .catch(error => console.error("Fehler beim Laden der Filme:", error));
    }

    function reserviereFilm(filmId) {
        window.location.href = `reservierung.html?film=${filmId}`;
    }

    $("#logout").on("click", function () {
        // Optional: Logout-Funktion hinzufügen
        alert("Abgemeldet!");
        window.location.href = "index.html";
    });

    ladeFilme();
});
