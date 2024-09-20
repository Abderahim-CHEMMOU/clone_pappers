// src/app.js
import express from 'express';
import { setMongoConnection } from '../config/config.mongo.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import authMiddleware from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
setMongoConnection();

// Middleware
app.use(express.json()); // Pour parser les JSON requests

// Routes
app.use('/api', authRoutes); // Utilisation des routes d'authentification
app.use('/api', profileRoutes); // Utilisation des routes de gestion de profil

// Route protégée pour tester le middleware
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Vous êtes authentifié !', user: req.user });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
