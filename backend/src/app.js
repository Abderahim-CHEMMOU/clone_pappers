// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js'; // Chemin vers vos routes d'authentification
import authMiddleware from './middleware/auth.js'; // Chemin vers votre middleware

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/yourDatabaseName'; // Remplacez par votre URI MongoDB

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware
app.use(express.json()); // Pour parser les JSON requests

// Routes
app.use('/api', authRoutes); // Utilisation des routes d'authentification

// Route protégée pour tester le middleware
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Vous êtes authentifié !', user: req.user });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
