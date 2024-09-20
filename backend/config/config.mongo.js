// src/config/config.mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const setMongoConnection = () => {
  const MONGO_URI = process.env.MONGODB_URI;

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.error('Erreur de connexion à MongoDB:', error));
};

export { setMongoConnection };
