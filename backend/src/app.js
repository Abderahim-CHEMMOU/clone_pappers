import cors from 'cors'; // Pour gérer les requêtes cross-origin
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'; // Pour gérer l'upload de fichiers
import authMiddleware from './middleware/auth.js'; // Chemin correct vers auth.js
import authRoutes from './routes/auth.js'; // Chemin correct vers auth.js
const app = express();
const PORT = process.env.PORT || 3003;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware
app.use(express.json()); // Pour parser les JSON requests
app.use(cors()); // Activer CORS pour autoriser les requêtes depuis le frontend

// Configuration de multer pour stocker les fichiers CSV dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Stocke le fichier dans le dossier 'uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Ajout d'un timestamp pour éviter les conflits de nom
  }
});
const upload = multer({ storage: storage });

app.use('/api', authRoutes);

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
    filePath: req.file.path
  });
});

// Route protégée pour tester le middleware
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Vous êtes authentifié !', user: req.user });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
