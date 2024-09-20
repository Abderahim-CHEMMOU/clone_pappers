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

// Fonction pour importer les contacts
const importContact = (filePath, batchSize = 1000) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        EntityContact: data.EntityContact,
        ContactType: data.ContactType,
        Value: data.Value
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
      console.log('Contact data import completed.');
      mongoose.connection.close();  // Ferme la connexion après l'importation
    });
};

// Fonction pour insérer un batch de données dans MongoDB
const insertBatch = async (batch) => {
  const promises = batch.map(async (contact) => {
    try {
      await Enterprise.updateOne(
        { EnterpriseNumber: contact.EntityNumber }, // Trouver l'entreprise par son numéro
        { $addToSet: { Contacts: {  // Ajouter le contact au tableau des contacts
          EntityContact: contact.EntityContact,
          ContactType: contact.ContactType,
          Value: contact.Value
        }}}
      );
      console.log(`Inserted contact for ${contact.EntityNumber} successfully.`);
    } catch (err) {
      console.error(`Error inserting contact for ${contact.EntityNumber}:`, err);
    }
  });

  // Attendre que toutes les opérations d'insertion soient terminées avant de continuer
  await Promise.all(promises);
};

// Importation du fichier contact.csv
importContact('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/contact.csv', 1000);  // Remplace par le chemin correct du fichier CSV
  
