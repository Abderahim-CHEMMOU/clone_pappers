import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Enterprise from '../models/Enterprise.js';  // Assure-toi que le chemin du modèle est correct

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/companyDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Fonction pour importer les données d'activités et les associer aux entreprises
const importActivity = (filePath, batchSize = 1000) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        ActivityGroup: parseInt(data.ActivityGroup, 10),
        NaceVersion: parseInt(data.NaceVersion, 10),
        NaceCode: data.NaceCode,
        Classification: data.Classification,
      });

      // Lorsque le nombre de résultats atteint batchSize, insérer dans MongoDB
      if (results.length === batchSize) {
        insertBatch(results).then(() => results.length = 0); // Réinitialiser le tableau après l'insertion
      }
    })
    .on('end', async () => {
      // Insérer les données restantes après la lecture du fichier
      if (results.length > 0) {
        await insertBatch(results);
      }
      console.log('Activity data import completed.');
      mongoose.connection.close();  // Ferme la connexion après l'importation
    });
};

// Fonction pour insérer un batch de données dans MongoDB
const insertBatch = async (batch) => {
  const promises = batch.map(async (activity) => {
    try {
      // Rechercher l'entreprise et vérifier les activités existantes
      await Enterprise.updateOne(
        { EnterpriseNumber: activity.EntityNumber }, // Trouver l'entreprise par son numéro
        { $addToSet: { Activities: activity } },  // Ajouter l'activité au tableau d'activités
        { upsert: true } // Créer l'entreprise si elle n'existe pas
      );
      console.log(`Inserted activity for ${activity.EntityNumber} successfully.`);
    } catch (err) {
      if (err.code === 11000) {
        console.log(`Duplicate activity for ${activity.EntityNumber} found. Skipping...`);
      } else {
        console.error(`Error inserting activity for ${activity.EntityNumber}:`, err);
      }
    }
  });

  // Attendre que toutes les opérations d'insertion soient terminées avant de continuer
  await Promise.all(promises);
};

// Importation du fichier activity.csv
importActivity('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/activity.csv', 1000);  // Remplace par le chemin correct du fichier CSV
