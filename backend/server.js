const express = require('express');
const { Pool } = require('pg'); // Importation du module pg
const app = express();
const port = 3000;

// Créer une nouvelle instance de Pool pour gérer les connexions
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'secours',
  password: 'Antonio0108Andria',
  port: 5432, // Port par défaut pour PostgreSQL
});


const cors = require('cors');
app.use(cors());

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Exemple de route pour récupérer des données depuis PostgreSQL
app.get('/api/bareme/:categorie/:indice', async (req, res) => {
  try {
    // Récupération des paramètres de la requête
    const { categorie, indice } = req.params;

    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT * FROM bareme WHERE categorie = $1 AND indice = $2', 
      [categorie, indice]
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

//recuperer les agent en activités
app.get('/api/agent/active', async (req, res) => {
  try {
    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT * FROM active ORDER by matricule DESC LIMIT 14 '
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/api/stat/active', async (req, res) => {
  try {
    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT COUNT(matricule) AS nbactive FROM active'
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/api/stat/retraite', async (req, res) => {
  try {
    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT COUNT(matriculepension) AS nbretraite FROM retraite'
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/api/stat/secours', async (req, res) => {
  try {
    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT COUNT(numero) AS nbdossier FROM secours'
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/api/stat/month', async (req, res) => {
  try {
    // Exécution de la requête SQL
    const result = await pool.query(
      `WITH months AS (
         SELECT generate_series(1, 12) AS mois
       )
       SELECT m.mois, COALESCE(COUNT(s.numero), 0) AS nombre
       FROM months m
       LEFT JOIN secours s ON EXTRACT(MONTH FROM s.date) = m.mois
       GROUP BY m.mois
       ORDER BY m.mois`
    );

    // Envoi de la réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

//recuperer les agent en activités
app.get('/api/agent/retraite', async (req, res) => {
  try {
    // Exécution de la requête SQL avec les paramètres corrects
    const result = await pool.query(
      'SELECT * FROM retraite ORDER by matriculepension DESC LIMIT 14 '
    );

    // Réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


app.get('/api/agent/active/:param', async (req, res) => {
  try {
    // Récupération du paramètre de recherche
    const { param } = req.params;

    // Exécution de la requête SQL avec CONCAT pour gérer les wildcards
    const result = await pool.query(
      `SELECT * FROM active WHERE nom ILIKE '%' || $1 || '%'  OR matricule ILIKE '%' || $1 || '%'`, 
      [param]
    );

    // Envoi de la réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/api/agent/retraite/:param', async (req, res) => {
  try {
    // Récupération du paramètre de recherche
    const { param } = req.params;

    // Exécution de la requête SQL avec CONCAT pour gérer les wildcards
    const result = await pool.query(
      `SELECT * FROM retraite WHERE nomprenoms ILIKE '%' || $1 || '%'  OR matriculepension ILIKE '%' || $1 || '%'`, 
      [param]
    );

    // Envoi de la réponse avec les données en format JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

app.post('/api/secours', async (req, res) => {
  try {
    const { beneficiaire, qtbeneficiaire, matriculedef, nomdef, montant, cin, acte, dateacte } = req.body;

    // Exécution de la requête SQL d'insertion
    const result = await pool.query(
      `INSERT INTO secours (beneficiaire, qtbeneficiaire, matriculedef, nomdef, montant, date, cin, acte, dateacte)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE, $6, $7, $8)`,
      [beneficiaire, qtbeneficiaire, matriculedef, nomdef, montant, cin, acte, dateacte]
    );

    res.status(201).json({ message: 'Dossier ajouté avec succès' }); // Message de succès
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur'); // Gestion d'erreur
  }
});




// Démarrer le serveur
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
