import fs from 'fs';
import csv from 'csv-parser';
import Activity from './models/Activity.js';  // Assure-toi que le chemin du modèle est correct

const importActivity = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        ActivityGroup: parseInt(data.ActivityGroup, 10),
        NaceVersion: parseInt(data.NaceVersion, 10),
        NaceCode: data.NaceCode,
        Classification: data.Classification
      });
    })
    .on('end', async () => {
      try {
        await Activity.insertMany(results);
        console.log('Activity data imported successfully.');
      } catch (err) {
        console.error('Error importing activity data:', err);
      }
    });
};
