const express = require('express'); 
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const XLSX = require('xlsx');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const app = express();
const port = 3000;


// Configuration de multer pour gérer les fichiers envoyés via formulaire
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        // Vérifier si le dossier existe, sinon le créer
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Ajouter une extension appropriée
    }
});

const upload = multer({ storage: storage });

// Créer une nouvelle instance de Pool pour gérer les connexions
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'secours',
    password: 'Antonio0108Andria',
    port: 5432, // Port par défaut pour PostgreSQL
});

// Middleware pour gérer les CORS
app.use(cors());

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Fonction pour convertir les dates d'Excel au format PostgreSQL
function convertExcelDate(excelDate) {
    const date = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    return date.toISOString().split('T')[0]; // Retourne une date au format YYYY-MM-DD
}

// Fonction pour formater les nombres
function formatNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        // Remplacer les virgules par des points et convertir en nombre
        return parseFloat(value.replace(',', '.')) || 0;
    }
    return 0;
}

// Fonction principale pour importer les données Excel dans PostgreSQL pour bareme
async function importBareme(filePath) {
    try {
        // Lire le fichier Excel
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Affiche les données pour vérifier qu'elles sont correctement lues
        console.log('Données Bareme:', jsonData);

        // Insertion des données dans PostgreSQL
        for (const row of jsonData) {
            const query = `
                INSERT INTO bareme (date, categorie, indice, v500, v501, v502, v503, v506, solde)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

            const values = [
                typeof row.DATEBAREME === 'number' ? convertExcelDate(row.DATEBAREME) : row.DATEBAREME,
                row.CATEGORIE,
                row.INDICE,
                formatNumber(row.V500),
                formatNumber(row.V501),
                formatNumber(row.V502),
                formatNumber(row.V503),
                formatNumber(row.V506),
                formatNumber(row.SOLDE),
            ];

            // Exécution de la requête d'insertion
            await pool.query(query, values);
        }

        console.log('Importation du Bareme réussie !');
    } catch (err) {
        console.error('Erreur lors de l\'importation du Bareme :', err);
        throw err; // Propager l'erreur pour qu'elle soit gérée par le routeur
    } finally {
        // Supprimer le fichier après importation réussie ou en cas d'erreur
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier Bareme:', err);
            } else {
                console.log('Fichier Bareme supprimé:', filePath);
            }
        });
    }
}

// Fonction principale pour importer les données Excel dans PostgreSQL pour active
async function importAgent(filePath) {
    try {
        // Lire le fichier Excel
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Affiche les données pour vérifier qu'elles sont correctement lues
        console.log('Données Agents Actifs:', jsonData);

        // Insertion des données dans PostgreSQL
        for (const row of jsonData) {
          const query = `
              INSERT INTO active (matricule, nom, prenoms, sexe, datenais, cin, cp, codegrade, codecategorie, codesection, codecorps, indice)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (matricule) DO NOTHING;`;
          
          const values = [
              row.AGENTMATRICULE,
              row.AGENTNOM,
              row.AGENTPRENOMS,
              row.AGENTSEXE,
              row.AGENTDATENAIS,
              row.AGENTCIN,
              row.FIVCODE,
              row.GRADECODE,
              row.CATEGORIECODE,
              row.SECTIONCODE,
              row.CORPSCODE,
              row.INDICE
          ];

          await pool.query(query, values);
      }

        console.log('Importation des Agents Actifs réussie !');
    } catch (err) {
        console.error('Erreur lors de l\'importation des Agents Actifs :', err);
        throw err;
    } finally {
        // Supprimer le fichier après importation réussie ou en cas d'erreur
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier Agents Actifs:', err);
            } else {
                console.log('Fichier Agents Actifs supprimé:', filePath);
            }
        });
    }
}

// Fonction principale pour importer les données Excel dans PostgreSQL pour retraite
async function importRetraite(filePath) {
    try {
        // Lire le fichier Excel
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Affiche les données pour vérifier qu'elles sont correctement lues
        console.log('Données Retraités:', jsonData);

        // Insertion des données dans PostgreSQL
        for (const row of jsonData) {
            const query = `
                INSERT INTO retraite (matriculepension, nomprenoms, cin, cp, codegrade, codesection, codecorps, indice, pensionnet)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (matriculepension) DO NOTHING
            `;

            const values = [
                row.PENSION_NUMERO_MATRICULE || '',
                row.NOM_PRENOMS || '',
                row.CIN || '',
                row.LOCALITE_CODE || '',
                row.GRADE_CODE || '',
                row.SECTION_CODE || '',
                row.CORPSCODE || '',
                row.INDICE || 0,
                formatNumber(row.MONTANT_PENSION_NET),
            ];

            // Exécution de la requête d'insertion
            await pool.query(query, values);
        }

        console.log('Importation des Retraités réussie !');
    } catch (err) {
        console.error('Erreur lors de l\'importation des Retraités :', err);
        throw err;
    } finally {
        // Supprimer le fichier après importation réussie ou en cas d'erreur
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier Retraités:', err);
            } else {
                console.log('Fichier Retraités supprimé:', filePath);
            }
        });
    }
}

// Routes pour importer les données via multer

// Importer le bareme
app.post('/bareme/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Appel de la fonction d'importation avec le chemin du fichier
        await importBareme(filePath);

        res.status(200).json({ message: 'Importation du Bareme réussie !' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'importation du Bareme : ' + err.message });
    }
});

// Récupérer les années de bareme
app.get('/bareme/year', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT DISTINCT EXTRACT(YEAR FROM (date)) AS date FROM bareme'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer les categories
app.get('/categorie', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT DISTINCT categorie FROM bareme ORDER BY categorie asc'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});


// Importer les agents actifs
app.post('/agent/active/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Appel de la fonction d'importation avec le chemin du fichier
        await importAgent(filePath);

        res.status(200).json({ message: 'Importation des Agents Actifs réussie !' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'importation des Agents Actifs : ' + err.message });
    }
});

// Importer les retraités
app.post('/agent/retraite/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Appel de la fonction d'importation avec le chemin du fichier
        await importRetraite(filePath);

        res.status(200).json({ message: 'Importation des Retraités réussie !' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'importation des Retraités : ' + err.message });
    }
});


// Route pour ajouter un nouvel utilisateur
app.post('/api/register', async (req, res) => {
    const { username, fullname, im, password } = req.body; // Récupérer le nom d'utilisateur et le mot de passe depuis la requête

    // Vérifier si les informations sont fournies
    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
        }

        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer le nouvel utilisateur dans la base de données
        await pool.query(
            'INSERT INTO users (username, fullname, im, password, created) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
            [username, fullname, im, hashedPassword]
        );

        res.status(201).json({ message: 'Utilisateur créé avec succès' }); // Message de succès
    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        res.status(500).json({ message: 'Erreur du serveur' }); // Gestion des erreurs
    }
});

// Récupérer les agents en activité
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

app.delete('/api/users/delete', async (req, res) => {
    try {
        const { username } = req.body;

        // Vérifier si un dossier existe pour ce beneficiaire et cet agent
        const checkQuery = `SELECT * FROM users WHERE username = $1`;
        const checkResult = await pool.query(checkQuery, [username]);

        if (checkResult.rows.length === 0) {
            // Si le dossier n'existe pas, renvoyer un message
            return res.status(404).json({ message: "Aucun dossier trouvé pour cet agent et bénéficiaire" });
        }

        // Supprimer le dossier correspondant
        const deleteQuery = `DELETE FROM users WHERE username = $1`;
        await pool.query(deleteQuery, [username]);

        res.status(200).json({ message: "utilisateur avec succès" });
    } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});



// Configuration de la session
app.use(session({
    store: new PgSession({
        pool: pool, // Utiliser le même pool de connexion à la base de données
        tableName: 'session' // Nom de la table pour stocker les sessions
    }),
    secret: 'srsp2024', // Remplacez par une chaîne secrète sécurisée
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Durée de vie du cookie de session (1 jour)
    }
}));


// Route pour la connexion des utilisateurs
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                req.session.user = { username: user.username, fullname: user.fullname };
                res.status(200).json({ message: 'Connexion réussie', user });
            } else {
                res.status(401).json({ message: 'Mot de passe incorrect' });
            }
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});


//route pour la deconnexion
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        res.status(200).json({ message: 'Déconnexion réussie' });
    });
});



// Route pour changer le mot de passe
app.post('/api/change-password', async (req, res) => {
    const { username, oldPass, newPass } = req.body; // Récupérer le nom d'utilisateur, l'ancien et le nouveau mot de passe

    // Vérifier si toutes les informations sont fournies
    if (!username || !oldPass || !newPass) {
        return res.status(400).json({ message: 'Nom d\'utilisateur, ancien et nouveau mot de passe requis' });
    }

    try {
        // Récupérer l'utilisateur par le nom d'utilisateur
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password; // Le mot de passe haché stocké dans la base de données

            // Comparer l'ancien mot de passe fourni avec le mot de passe haché
            const isMatch = await bcrypt.compare(oldPass, hashedPassword);

            if (isMatch) {
                // Si l'ancien mot de passe est correct, hacher le nouveau mot de passe
                const newHashedPassword = await bcrypt.hash(newPass, 10);

                // Mettre à jour le mot de passe dans la base de données pour cet utilisateur
                await pool.query('UPDATE users SET password = $1 WHERE username = $2', [newHashedPassword, username]);

                res.status(200).json({ message: 'Mot de passe changé avec succès' });
            } else {
                // Si l'ancien mot de passe est incorrect
                res.status(401).json({ message: 'Ancien mot de passe incorrect' });
            }
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        console.error('Erreur lors du changement de mot de passe:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});


// Route pour récupérer le bareme avec catégorie, indice et année
app.get('/api/bareme/:categorie/:indice/:annee', async (req, res) => {
    try {
        // Récupération des paramètres de la requête
        const { categorie, indice, annee } = req.params;

        // Exécution de la requête SQL avec les paramètres corrects
        const result = await pool.query(
            'SELECT * FROM bareme WHERE categorie = $1 AND indice = $2 AND EXTRACT(YEAR FROM date) = $3', 
            [categorie, indice, annee]
        );

        // Réponse avec les données en format JSON
        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer le nombre d'agents en activité
app.get('/api/stat/active', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT COUNT(matricule) AS nbactive FROM active'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer le nombre d'agents retraités
app.get('/api/stat/retraite', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT COUNT(matriculepension) AS nbretraite FROM retraite'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer le nombre de dossiers traités cette année
app.get('/api/stat/secours', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT COUNT(numero) AS nbdossier FROM secours WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer le nombre de dossiers par mois
app.get('/api/stat/month', async (req, res) => {
    try {
        const result = await pool.query(
            `WITH months AS (
                SELECT generate_series(1, 12) AS mois
            )
            SELECT m.mois, COALESCE(COUNT(s.numero), 0) AS nombre
            FROM months m
            LEFT JOIN secours s 
            ON EXTRACT(MONTH FROM s.date) = m.mois
            AND EXTRACT(YEAR FROM s.date) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY m.mois
            ORDER BY m.mois`
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

app.get('/api/stat/month2', async (req, res) => {
    try {
        const result = await pool.query(
            `WITH months AS (
                SELECT generate_series(1, 12) AS mois
            )
            SELECT m.mois, COALESCE(COUNT(s.numero), 0) AS nombre
            FROM months m
            LEFT JOIN secours s 
            ON EXTRACT(MONTH FROM s.date) = m.mois
            AND EXTRACT(YEAR FROM s.date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1 
            GROUP BY m.mois
            ORDER BY m.mois`
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});



// Récupérer les agents en activité
app.get('/api/agent/active', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM active ORDER BY matricule DESC LIMIT 14'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Récupérer les agents retraités
app.get('/api/agent/retraite', async (req,res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM retraite ORDER BY matriculepension DESC LIMIT 14'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Route pour la recherche d'agents en activité
app.get('/api/agent/active/:param', async (req, res) => {
    try {
        // Récupération du paramètre de recherche
        const { param } = req.params;

        // Exécution de la requête SQL avec CONCAT pour gérer les wildcards (%)
        const result = await pool.query(
            `SELECT * FROM active WHERE nom ILIKE '%' || $1 || '%' OR matricule ILIKE '%' || $1 || '%'`, 
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

// Route pour la recherche d'agents retraités
app.get('/api/agent/retraite/:param', async (req, res) => {
    try {
        // Récupération du paramètre de recherche
        const { param } = req.params;

        // Exécution de la requête SQL avec CONCAT pour gérer les wildcards (%)
        const result = await pool.query(
            `SELECT * FROM retraite WHERE nomprenoms ILIKE '%' || $1 || '%' OR matriculepension ILIKE '%' || $1 || '%'`, 
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


// Route pour ajouter ou modifier des données de secours au décès
app.post('/api/secours', async (req, res) => {
    try {
        const { beneficiaire, cin, datecin, adresse, qualite, nomdef, imdef, status, activite, grade, indice, categorie, bareme, section, datedec, acte, dateacte, date } = req.body;

        // Vérifier si un dossier avec la même date existe déjà
        const existingQuery = `SELECT * FROM secours WHERE date::TEXT LIKE '%' || $1 || '%'`;
        const existingResult = await pool.query(existingQuery, [date]);

        if (existingResult.rows.length > 0) {
            // Si le dossier existe, mettre à jour l'enregistrement
            const updateQuery = `
                UPDATE secours
                SET beneficiaire = $1, cin = $2, datecin = $3, adresse = $4, qualite = $5, nomdef = $6, imdef = $7, 
                    status = $8, activite = $9, grade = $10, indice = $11, categorie = $12, bareme = $13, 
                    section = $14, datedec = $15, acte = $16, dateacte = $17
                WHERE date::TEXT LIKE '%' || $18 || '%'
            `;

            const updateValues = [beneficiaire, cin, datecin, adresse, qualite, nomdef, imdef, status, activite, grade, indice, categorie, bareme, section, datedec, acte, dateacte, date];
            await pool.query(updateQuery, updateValues);
            res.status(200).json({ message: 'Dossier mis à jour avec succès' });
        } else {
            // Si le dossier n'existe pas, insérer un nouveau dossier
            const insertQuery = `
                INSERT INTO secours (beneficiaire, cin, datecin, adresse, qualite, nomdef, imdef, status, activite, grade, indice, categorie, bareme, section, datedec, acte, dateacte, date) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())
            `;
            const insertValues = [beneficiaire, cin, datecin, adresse, qualite, nomdef, imdef, status, activite, grade, indice, categorie, bareme, section, datedec, acte, dateacte];
            await pool.query(insertQuery, insertValues);
            res.status(201).json({ message: 'Dossier ajouté avec succès' });
        }
    } catch (err) {
        console.error('Erreur lors de l\'ajout ou la mise à jour du dossier:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});





app.get('/api/secours/list', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM secours ORDER BY numero DESC LIMIT 2'
        );

        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

app.delete('/api/secours/delete', async (req, res) => {
    try {
        const { date } = req.body;

        // Vérifier si un dossier existe pour ce beneficiaire et cet agent
        const checkQuery = `SELECT * FROM secours WHERE date = $1`;
        const checkResult = await pool.query(checkQuery, [imdef, beneficiaire]);

        if (checkResult.rows.length === 0) {
            // Si le dossier n'existe pas, renvoyer un message
            return res.status(404).json({ message: "Aucun dossier trouvé pour cet agent et bénéficiaire" });
        }

        // Supprimer le dossier correspondant
        const deleteQuery = `DELETE FROM secours WHERE date = $1`;
        await pool.query(deleteQuery, [imdef, beneficiaire]);

        res.status(200).json({ message: "Dossier supprimé avec succès" });
    } catch (err) {
        console.error('Erreur lors de la suppression du dossier:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

app.delete('/api/agent/active/delete', async (req, res) => {
    try {
        // Supprimer tous les dossiers de la table active
        const deleteQuery = `DELETE FROM active`;
        await pool.query(deleteQuery);

        res.status(200).json({ message: "Tous les dossiers ont été supprimés avec succès" });
    } catch (err) {
        console.error('Erreur lors de la suppression des dossiers:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

app.delete('/api/agent/retraite/delete', async (req, res) => {
    try {
        // Supprimer tous les dossiers de la table active
        const deleteQuery = `DELETE FROM retraite`;
        await pool.query(deleteQuery);

        res.status(200).json({ message: "Tous les dossiers ont été supprimés avec succès" });
    } catch (err) {
        console.error('Erreur lors de la suppression des dossiers:', err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});


// Route pour la recherche d'agents retraités
app.get('/api/secours/recherche/:param', async (req, res) => {
    try {
        // Récupération du paramètre de recherche
        const { param } = req.params;

        // Exécution de la requête SQL avec CONCAT pour gérer les wildcards (%)
        const result = await pool.query(
            `SELECT * FROM secours WHERE beneficiaire ILIKE '%' || $1 || '%' OR imdef ILIKE '%' || $1 || '%' OR nomdef ILIKE '%' || $1 || '%'`, 
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


// Démarrer le serveur
/*
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server is running on http://0.0.0.0:${port}`);
});*/

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
})
