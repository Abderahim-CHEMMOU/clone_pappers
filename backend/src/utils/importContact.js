import fs from 'fs';
import csv from 'csv-parser';
import Contact from './models/Contact.js';  // Assure-toi que le chemin du modèle est correct

const importContact = (filePath) => {
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
    })
    .on('end', async () => {
      try {
        await Contact.insertMany(results);
        console.log('Contact data imported successfully.');
      } catch (err) {
        console.error('Error importing contact data:', err);
      }
    });
};
