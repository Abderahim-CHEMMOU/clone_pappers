import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';

// Importation des modèles
import Address from '../models/Address.js';
import Activity from '../models/Activity.js';
import Code from '../models/Code.js';
import Enterprise from '../models/Enterprise.js';
import Branch from '../models/Branch.js';
import Contact from '../models/Contact.js';
import Denomination from '../models/Denomination.js';
import Establishment from '../models/Establishment.js';

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Définir les mappings entre les entêtes et les schémas MongoDB
const schemas = {
  address: ['EntityNumber', 'TypeOfAddress', 'CountryNL', 'CountryFR', 'Zipcode', 'MunicipalityNL', 'MunicipalityFR', 'StreetNL', 'StreetFR', 'HouseNumber', 'Box', 'ExtraAddressInfo', 'DateStrikingOff'],
  activity: ['EntityNumber', 'ActivityGroup', 'NaceVersion', 'NaceCode', 'Classification'],
  code: ['Category', 'Code', 'Language', 'Description'],
  enterprise: ['EnterpriseNumber', 'Status', 'JuridicalSituation', 'TypeOfEnterprise', 'JuridicalForm', 'JuridicalFormCAC', 'StartDate'],
  branch: ['Id', 'StartDate', 'EnterpriseNumber'],
  contact: ['EntityNumber', 'EntityContact', 'ContactType', 'Value'],
  denomination: ['EntityNumber', 'Language', 'TypeOfDenomination', 'Denomination'],
  establishment: ['EstablishmentNumber', 'StartDate', 'EnterpriseNumber']
};

// Fonction pour convertir les dates au format "DD-MM-YYYY" en ISO "YYYY-MM-DD"
function convertToISO(dateStr) {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}

// Fonction pour déterminer le schéma en fonction des entêtes
function determineSchema(headers) {
  if (headers.includes('TypeOfAddress')) return Address;
  if (headers.includes('ActivityGroup')) return Activity;
  if (headers.includes('Category')) return Code;
  if (headers.includes('Status')) return Enterprise;
  if (headers.includes('Id')) return Branch;
  if (headers.includes('EntityContact')) return Contact;
  if (headers.includes('TypeOfDenomination')) return Denomination;
  if (headers.includes('EstablishmentNumber')) return Establishment;
  return null;
}

// Fonction pour parser un fichier CSV et stocker dans MongoDB
function parseCSV(filePath) {
  const results = [];
  let schema = null;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', (headers) => {
      schema = determineSchema(headers);
    })
    .on('data', (data) => {
      if (schema) {
        // Convertir les dates si le modèle est Enterprise
        if (schema.modelName === 'Enterprise' && data.StartDate) {
          data.StartDate = convertToISO(data.StartDate);
        }
        results.push(data);
      }
    })
    .on('end', () => {
      if (schema) {
        schema.insertMany(results)
          .then(() => console.log(`Données insérées dans ${schema.modelName}`))
          .catch((err) => console.error('Erreur lors de l\'insertion des données:', err));
      } else {
        console.log('Aucun schéma trouvé pour ce fichier.');
      }
    });
}

// Chemin vers le répertoire des fichiers CSV
const csvDir = path.resolve('C:/Users/Utilisateur/Desktop/React native/clone_pappers/data');

// Lire tous les fichiers dans le répertoire des CSV
fs.readdir(csvDir, (err, files) => {
  if (err) {
    return console.error('Erreur lors de la lecture du répertoire:', err);
  }

  // Parcourir chaque fichier CSV et le parser
  files.forEach(file => {
    if (path.extname(file) === '.csv') {
      const filePath = path.join(csvDir, file);
      parseCSV(filePath);
    }
  });
});
