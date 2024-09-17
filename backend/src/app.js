import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Charger les variables d'environnement
dotenv.config();

// Importation des routes
// import authRoutes from './routes/authRoutes.js';
// import companyRoutes from './routes/companyRoutes.js';

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour autoriser les requêtes provenant d'autres domaines (CORS)
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Utiliser les routes définies dans le dossier routes
// app.use('/api/auth', authRoutes);       // Pour les routes d'authentification
// app.use('/api/companies', companyRoutes);  // Pour les routes de gestion des entreprises

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
