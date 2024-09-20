// src/app.js
import cors from 'cors';
import csv from 'csv-parser';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { setMongoConnection } from './config/config.mongo.js';
import authMiddleware from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(cors());

// Configuration de multer pour stocker les fichiers CSV
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

// Endpoint pour téléverser le fichier CSV
app.post('/upload-csv', authMiddleware, upload.single('file'), (req, res) => {
  console.log('Requête reçue pour le téléversement de fichier.');

  if (!req.file) {
    console.log('Aucun fichier téléversé.');
    return res.status(400).send('Aucun fichier na été téléversé.');
  }

  console.log(`Fichier reçu : ${req.file.originalname}`);
  console.log(`Chemin du fichier stocké : ${req.file.path}`);

  // Traitement du fichier CSV
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('Parsing CSV terminé');
      // Ici, vous pouvez traiter les données du CSV (par exemple, les sauvegarder dans la base de données)
      res.json({
        message: 'Fichier téléversé, stocké et parsé avec succès.',
        filePath: req.file.path,
        rowCount: results.length
      });
    });
});

// Route protégée pour tester le middleware
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Vous êtes authentifié !', user: req.user });
});

// Initialisation de la connexion MongoDB et démarrage du serveur
const startServer = async () => {
  try {
    await setMongoConnection();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();