import fs from 'fs';
import csv from 'csv-parser';
import Denomination from './models/Denomination.js';  // Assure-toi que le chemin du modèle est correct

const importDenomination = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        Language: data.Language,
        TypeOfDenomination: data.TypeOfDenomination,
        Denomination: data.Denomination
      });
    })
    .on('end', async () => {
      try {
        await Denomination.insertMany(results);
        console.log('Denomination data imported successfully.');
      } catch (err) {
        console.error('Error importing denomination data:', err);
      }
    });
};
