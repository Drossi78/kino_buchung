const movies = [
    {
        id: "sternreise",
        title: "Die letzte Sternreise",
        genre: "Science-Fiction",
        duration: "128 Min.",
        description: "Eine mutige Crew folgt einem geheimnisvollen Signal bis an den Rand der Galaxie.",
        poster: "poster--space",
        mark: "STERN"
    },
    {
        id: "mitternacht",
        title: "Mitternacht in Berlin",
        genre: "Drama",
        duration: "106 Min.",
        description: "In einer langen Nacht kreuzen sich die Wege von drei Fremden in der Grossstadt.",
        poster: "poster--night",
        mark: "NACHT"
    },
    {
        id: "letzter-vorhang",
        title: "Der letzte Vorhang",
        genre: "Mystery",
        duration: "114 Min.",
        description: "Hinter den Kulissen eines alten Theaters ist nichts so, wie es scheint.",
        poster: "poster--stage",
        mark: "BÜHNE"
    },
    {
        id: "sommerwind",
        title: "Sommerwind",
        genre: "Komödie",
        duration: "98 Min.",
        description: "Ein unerwarteter Roadtrip wird zum Beginn eines ganz neuen Kapitels.",
        poster: "poster--summer",
        mark: "SOMMER"
    }
];

function renderMovies() {
    const movieList = document.querySelector("#movie-list");
    if (!movieList) return;

    movies.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "movie-card";

        const poster = document.createElement("div");
        poster.className = `movie-poster ${movie.poster}`;
        poster.setAttribute("aria-hidden", "true");
        const posterMark = document.createElement("span");
        posterMark.textContent = movie.mark;
        poster.append(posterMark);

        const details = document.createElement("div");
        details.className = "movie-details";

        const meta = document.createElement("p");
        meta.className = "movie-meta";
        meta.textContent = `${movie.genre} · ${movie.duration}`;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const description = document.createElement("p");
        description.className = "movie-description";
        description.textContent = movie.description;

        const reserveLink = document.createElement("a");
        reserveLink.className = "button button-card";
        reserveLink.href = `reservierung.html?film=${encodeURIComponent(movie.id)}`;
        reserveLink.textContent = "Platz reservieren";

        details.append(meta, title, description, reserveLink);
        card.append(poster, details);
        movieList.append(card);
    });
}

function setupReservation() {
    const form = document.querySelector("#reservation-form");
    if (!form) return;

    const movieId = new URLSearchParams(window.location.search).get("film");
    const movie = movies.find((item) => item.id === movieId);
    const movieTitle = document.querySelector("#reservation-movie");
    const message = document.querySelector("#reservation-message");

    if (!movie) {
        movieTitle.textContent = "Film nicht gefunden";
        message.textContent = "Bitte wähle zuerst einen Film aus dem Programm.";
        message.hidden = false;
        return;
    }

    movieTitle.textContent = movie.title;
    form.hidden = false;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const time = formData.get("time");
        const seats = Number(formData.get("seats"));

        message.textContent = `Demo-Reservierung: ${seats} ${seats === 1 ? "Platz" : "Plätze"} für „${movie.title}“ um ${time} Uhr. Es wurde nichts gespeichert.`;
        message.hidden = false;
    });
}

renderMovies();
setupReservation();
