import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Enterprise from '../models/Enterprise.js';  // Assure-toi que le chemin du modèle est correct

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

// Fonction pour importer les adresses
const importAddress = (filePath, batchSize = 1000) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        TypeOfAddress: data.TypeOfAddress,
        CountryNL: data.CountryNL || null,
        CountryFR: data.CountryFR || null,
        Zipcode: data.Zipcode,
        MunicipalityNL: data.MunicipalityNL || null,
        MunicipalityFR: data.MunicipalityFR || null,
        StreetNL: data.StreetNL || null,
        StreetFR: data.StreetFR || null,
        HouseNumber: data.HouseNumber || null,
        Box: data.Box || null,
        ExtraAddressInfo: data.ExtraAddressInfo || null,
        DateStrikingOff: parseDate(data.DateStrikingOff)
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
      console.log('Address data import completed.');
      mongoose.connection.close();  // Ferme la connexion après l'importation
    });
};

// Fonction pour insérer un batch de données dans MongoDB
const insertBatch = async (batch) => {
  const promises = batch.map(async (address) => {
    try {
      await Enterprise.updateOne(
        { EnterpriseNumber: address.EntityNumber }, // Trouver l'entreprise par son numéro
        { $addToSet: { Addresses: {  // Ajouter l'adresse au tableau d'adresses
          TypeOfAddress: address.TypeOfAddress,
          CountryNL: address.CountryNL,
          CountryFR: address.CountryFR,
          Zipcode: address.Zipcode,
          MunicipalityNL: address.MunicipalityNL,
          MunicipalityFR: address.MunicipalityFR,
          StreetNL: address.StreetNL,
          StreetFR: address.StreetFR,
          HouseNumber: address.HouseNumber,
          Box: address.Box,
          ExtraAddressInfo: address.ExtraAddressInfo,
          DateStrikingOff: address.DateStrikingOff
        }}}
      );
      console.log(`Inserted address for ${address.EntityNumber} successfully.`);
    } catch (err) {
      console.error(`Error inserting address for ${address.EntityNumber}:`, err);
    }
  });

  // Attendre que toutes les opérations d'insertion soient terminées avant de continuer
  await Promise.all(promises);
};


// Importation du fichier adress.csv
importAddress('/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/address.csv', 1000);  
