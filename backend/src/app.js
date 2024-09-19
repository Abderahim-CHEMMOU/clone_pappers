// src/app.js
import express from 'express';
import { setMongoConnection } from './config.mongo.js'; // Corrigez le chemin si nécessaire
import authRoutes from './routes/auth.js'; // Corrigez le chemin si nécessaire
import authMiddleware from './middleware/auth.js'; // Corrigez le chemin si nécessaire

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
setMongoConnection();

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
