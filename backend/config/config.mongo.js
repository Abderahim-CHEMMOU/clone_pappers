// src/config/config.mongo.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const setMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};