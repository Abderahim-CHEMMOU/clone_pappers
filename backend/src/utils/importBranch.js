import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Branch from '../models/Branch.js';  // Modèle pour stocker les branches

// Fonction pour convertir la date au format DD-MM-YYYY en Date
const parseDate = (dateString) => {
  if (!dateString) return null; // Gérer les valeurs nulles ou vides
  const [day, month, year] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) {
    console.error(`Invalid date format for: ${dateString}`);
    return null; // ou gérer selon le besoin
  }
  return date;
};

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/companyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Fonction pour importer les données des branches dans la collection Branches
const importBranch = (filePath, batchSize = 1000) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EnterpriseNumber: data.EnterpriseNumber,
        Id: data.Id,
        StartDate: parseDate(data.StartDate)
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
      console.log('Branch data import completed.');
      mongoose.connection.close();  // Ferme la connexion après l'importation
    });
};

// Fonction pour insérer un batch de données dans MongoDB
const insertBatch = async (batch) => {
  const promises = batch.map(async (branch) => {
    try {
      await Branch.create(branch);
      console.log(`Inserted branch ${branch.Id} for enterprise ${branch.EnterpriseNumber} successfully.`);
    } catch (err) {
      console.error(`Error inserting branch ${branch.Id} for enterprise ${branch.EnterpriseNumber}:`, err);
    }
  });

  // Attendre que toutes les opérations d'insertion soient terminées avant de continuer
  await Promise.all(promises);
};


// Importation du fichier branch.csv
importBranch('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/branch.csv', 1000);  // Remplace par le chemin correct du fichier CSV
