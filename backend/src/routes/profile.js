// src/routes/profile.js
import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Obtenir les informations de profil
router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// Mettre à jour les préférences
router.put('/preferences', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { preferences } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    user.preferences = preferences;
    await user.save();

    res.json({ message: 'Préférences mises à jour' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour des préférences' });
  }
});

// Ajouter une entreprise aux favoris
router.post('/favorites', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { companyId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    if (!user.favorites.includes(companyId)) {
      user.favorites.push(companyId);
      await user.save();
    }

    res.json({ message: 'Entreprise ajoutée aux favoris' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout aux favoris' });
  }
});

export default router;
