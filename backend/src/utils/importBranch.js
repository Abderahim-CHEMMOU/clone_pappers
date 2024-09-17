import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Branch from '../models/branch.js';  // Assure-toi que le chemin du modèle est correct

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/companyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Fonction pour importer les données du fichier CSV dans MongoDB
const importBranch = (filePath) => {
  const results = [];
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        Id: data.Id,
        StartDate: new Date(data.StartDate),
        EnterpriseNumber: data.EnterpriseNumber
      });
    })
    .on('end', async () => {
      try {
        await Branch.insertMany(results);
        console.log('Branch data imported successfully.');
      } catch (err) {
        console.error('Error importing branch data:', err);
      } finally {
        mongoose.connection.close();  // Ferme la connexion après l'importation
      }
    });
};

// Importation du fichier branch.csv
importBranch('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/KboOpenData_0127_2024_09_Full/branch.csv');  // Remplace par le chemin correct du fichier CSV
