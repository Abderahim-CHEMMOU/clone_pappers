

const express = require('express');
const multer = require('multer'); // Pour gérer l'upload de fichiers
const csv = require('csv-parser'); // Pour parser les fichiers CSV
const fs = require('fs'); // Pour manipuler le système de fichiers
const cors = require('cors'); // Pour gérer les requêtes cross-origin

const app = express();
app.use(cors()); // Activer CORS pour autoriser les requêtes depuis le frontend

// Configuration de multer pour stocker les fichiers CSV dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Stocke le fichier dans le dossier 'uploads'
  },
  filename: (req, file, cb) => {
    // Ajouter un timestamp pour éviter les conflits de nom
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint pour téléverser le fichier CSV
app.post('/upload-csv', upload.single('file'), (req, res) => {
  console.log('Requête reçue pour le téléversement de fichier.');

  if (!req.file) {
    console.log('Aucun fichier téléversé.');
    return res.status(400).send('Aucun fichier n’a été téléversé.');
  }

  console.log(`Fichier reçu : ${req.file.originalname}`);
  console.log(`Chemin du fichier stocké : ${req.file.path}`);

  res.json({
    message: 'Fichier téléversé et stocké avec succès.',
    filePath: req.file.path // Renvoyer le chemin du fichier stocké
  });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
