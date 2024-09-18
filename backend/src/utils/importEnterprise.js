import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Enterprise from './models/Enterprise.js';  // Assure-toi que le chemin du modèle est correct

const importEnterprise = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EnterpriseNumber: data.EnterpriseNumber,
        Status: data.Status,
        JuridicalSituation: data.JuridicalSituation,
        TypeOfEnterprise: data.TypeOfEnterprise,
        JuridicalForm: data.JuridicalForm,
        JuridicalFormCAC: data.JuridicalFormCAC,
        StartDate: new Date(data.StartDate)
      });
    })
    .on('end', async () => {
      try {
        await Enterprise.insertMany(results);
        console.log('Enterprise data imported successfully.');
      } catch (err) {
        console.error('Error importing enterprise data:', err);
      }
    });
};
