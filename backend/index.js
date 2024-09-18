const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// Route pour récupérer des données depuis PostgreSQL
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});


const cors = require('cors');
app.use(cors());
