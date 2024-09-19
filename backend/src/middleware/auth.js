// middleware/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_secret_jwt'; // Remplacez par une valeur sécurisée

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token manquant' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    
    req.user = user;
    next();
  });
};

export default authMiddleware;
