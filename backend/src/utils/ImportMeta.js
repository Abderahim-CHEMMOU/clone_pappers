import fs from 'fs';
import csv from 'csv-parser';
import Meta from './models/Meta.js';  // Assure-toi que le chemin du modèle est correct

const importMeta = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        SnapshotDate: new Date(data.SnapshotDate),
        ExtractTimestamp: new Date(data.ExtractTimestamp),
        ExtractType: data.ExtractType,
        ExtractNumber: parseInt(data.ExtractNumber, 10),
        Version: data.Version
      });
    })
    .on('end', async () => {
      try {
        await Meta.insertMany(results);
        console.log('Meta data imported successfully.');
      } catch (err) {
        console.error('Error importing meta data:', err);
      }
    });
};
