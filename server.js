const express = require('express'); 
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kino_buchung'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connexion à la base de données réussie');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Ajouter un utilisateur (inscription) avec vérification de l'email
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nom, email et mot de passe sont requis.' });
    }

    // Vérifier si l'email existe déjà
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erreur MySQL:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        // Insérer l'utilisateur
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'inscription:', err.sqlMessage);
                return res.status(500).json({ error: err.sqlMessage });
            }
            res.json({ message: 'Utilisateur créé avec succès', userId: results.insertId });
        });
    });
});

// Connexion d'un utilisateur
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Erreur MySQL:', err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (results.length > 0) {
            res.json({ message: 'Connexion réussie', userId: results[0].id });
        } else {
            res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${port}`);
});
