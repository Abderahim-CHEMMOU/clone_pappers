import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Enterprise from '../models/Enterprise.js';  // Assure-toi que le chemin du modèle est correct

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/companyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Fonction pour importer les dénominations
const importDenomination = (filePath, batchSize = 1000) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Vérifier si les données sont valides, sinon assigner des valeurs par défaut
      const TypeOfDenomination = parseInt(data.TypeOfDenomination, 10);
      
      if (isNaN(TypeOfDenomination)) {
        console.warn(`Invalid TypeOfDenomination for ${data.EntityNumber}, skipping...`);
        return;
      }

      results.push({
        EntityNumber: data.EntityNumber,
        Language: data.Language || null,  // Si vide, utiliser null
        TypeOfDenomination: TypeOfDenomination || null,  // Si NaN, utiliser null
        Denomination: data.Denomination || null  // Si vide, utiliser null
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
      console.log('Denomination data import completed.');
      mongoose.connection.close();  // Ferme la connexion après l'importation
    });
};

// Fonction pour insérer un batch de données dans MongoDB
const insertBatch = async (batch) => {
  const promises = batch.map(async (denomination) => {
    try {
      await Enterprise.updateOne(
        { EnterpriseNumber: denomination.EntityNumber }, // Trouver l'entreprise par son numéro
        { $addToSet: { Denominations: {  // Ajouter la dénomination au tableau des dénominations
          Language: denomination.Language,
          TypeOfDenomination: denomination.TypeOfDenomination,
          Denomination: denomination.Denomination
        }}}
      );
      console.log(`Inserted denomination for ${denomination.EntityNumber} successfully.`);
    } catch (err) {
      console.error(`Error inserting denomination for ${denomination.EntityNumber}:`, err);
    }
  });

  // Attendre que toutes les opérations d'insertion soient terminées avant de continuer
  await Promise.all(promises);
};

// Importation du fichier denomination.csv
importDenomination('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/denomination.csv', 1000);  // Remplace par le chemin correct du fichier CSV
