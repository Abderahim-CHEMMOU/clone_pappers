import fs from 'fs';
import csv from 'csv-parser';
import Establishment from './models/Establishment.js';  // Assure-toi que le chemin du modèle est correct

const importEstablishment = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EstablishmentNumber: data.EstablishmentNumber,
        StartDate: new Date(data.StartDate),
        EnterpriseNumber: data.EnterpriseNumber
      });
    })
    .on('end', async () => {
      try {
        await Establishment.insertMany(results);
        console.log('Establishment data imported successfully.');
      } catch (err) {
        console.error('Error importing establishment data:', err);
      }
    });
};
