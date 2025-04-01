// Connexion au backend pour obtenir les films disponibles
async function getFilms() {
    const response = await fetch('http://localhost:3000/films');
    const films = await response.json();
    
    const filmsContainer = document.getElementById('films');
    filmsContainer.innerHTML = ''; // Réinitialiser la liste des films
  
    films.forEach(film => {
      const filmDiv = document.createElement('div');
      filmDiv.classList.add('film');
      filmDiv.innerHTML = `
        <h3>${film.titre}</h3>
        <p>${film.description}</p>
        <p>Places disponibles : ${film.places_disponibles}</p>
        <button onclick="selectFilm(${film.id})">Réserver</button>
      `;
      filmsContainer.appendChild(filmDiv);
    });
  }
  
  // Sélectionner un film pour la réservation
  function selectFilm(filmId) {
    document.getElementById('reservationForm').style.display = 'block';
    const form = document.getElementById('resForm');
    form.onsubmit = async (event) => {
      event.preventDefault();
      const places = document.getElementById('places').value;
  
      const reservationData = {
        utilisateur_id: 1, // ID utilisateur (en pratique, vous pouvez gérer la connexion des utilisateurs)
        film_id: filmId,
        places_reservees: places
      };
  
      const response = await fetch('http://localhost:3306/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });
  
      const result = await response.json();
      alert(result.message);
      getFilms(); // Recharger les films après la réservation
      document.getElementById('reservationForm').style.display = 'none'; // Cacher le formulaire
    };
  }
  
  // Initialiser l'application
  getFilms();
  