import fs from 'fs';
import csv from 'csv-parser';
import Address from './models/Address.js';  // Assure-toi que le chemin du modèle est correct

const importAddress = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        EntityNumber: data.EntityNumber,
        TypeOfAddress: data.TypeOfAddress,
        CountryNL: data.CountryNL,
        CountryFR: data.CountryFR,
        Zipcode: data.Zipcode,
        MunicipalityNL: data.MunicipalityNL,
        MunicipalityFR: data.MunicipalityFR,
        StreetNL: data.StreetNL,
        StreetFR: data.StreetFR,
        HouseNumber: data.HouseNumber,
        Box: data.Box,
        ExtraAddressInfo: data.ExtraAddressInfo,
        DateStrikingOff: data.DateStrikingOff ? new Date(data.DateStrikingOff) : null
      });
    })
    .on('end', async () => {
      try {
        await Address.insertMany(results);
        console.log('Address data imported successfully.');
      } catch (err) {
        console.error('Error importing address data:', err);
      }
    });
};
