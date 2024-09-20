import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Code from '../models/Code.js';  // Assure-toi que le chemin du modèle est correct
import { Console } from 'console';

// Connexion à MongoDB
// Connexion à MongoDB sans les options dépréciées
mongoose.connect('mongodb://localhost:27017/companyDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Initialisation des tableaux
const Nace = {};
const Classification = {};
const TypeOfEnterprise = {};
const JuridicalSituation = {};
const Status = {};
const JuridicalForm = {};
const ContactType = {};
const Language = {};
const ActivityGroup = {};
const EntityContact = {};
const TypeOfAddress = {};
const TypeOfDenomination = {};

// Fonction pour remplir les tableaux
const processRow = (row) => {
  const category = row.Category.trim();
  const code = row.Code.trim();
  const language = row.Language.trim();
  const description = row.Description.trim();

  // Regrouper toutes les catégories liées à Nace sous le tableau Nace
  if (category.startsWith('Nace')) {
    console.log("CATEGnACE", category);
    console.log("CATEGcODE", code);
    console.log("CATEGlanguage", language);
    console.log("CATEGdescription", description);
    if (!Nace[category]) Nace[category] = {};  // Initialiser le tableau pour NaceCategory
    if (!Nace[category][code]) Nace[category][code] = {};  // Initialiser le tableau pour le code
    Nace[category][code][language] = description;  // Assigner la description
    return;  // Sortir de la fonction une fois que Nace est traité
  }

  // Autres catégories
  switch (category) {
    case 'Classification':
      if (!Classification[code]) Classification[code] = {};
      Classification[code][language] = description;
      break;
    case 'TypeOfEnterprise':
      if (!TypeOfEnterprise[code]) TypeOfEnterprise[code] = {};
      TypeOfEnterprise[code][language] = description;
      break;
    case 'JuridicalSituation':
      if (!JuridicalSituation[code]) JuridicalSituation[code] = {};
      JuridicalSituation[code][language] = description;
      break;
    case 'Status':
      if (!Status[code]) Status[code] = {};
      Status[code][language] = description;
      break;
    case 'JuridicalForm':
      if (!JuridicalForm[code]) JuridicalForm[code] = {};
      JuridicalForm[code][language] = description;
      break;
    case 'ContactType':
      if (!ContactType[code]) ContactType[code] = {};
      ContactType[code][language] = description;
      break;
    case 'Language':
      if (!Language[code]) Language[code] = {};
      Language[code][language] = description;
      break;
    case 'ActivityGroup':
      if (!ActivityGroup[code]) ActivityGroup[code] = {};
      ActivityGroup[code][language] = description;
      break;
    case 'EntityContact':
      if (!EntityContact[code]) EntityContact[code] = {};
      EntityContact[code][language] = description;
      break;
    case 'TypeOfAddress':
      if (!TypeOfAddress[code]) TypeOfAddress[code] = {};
      TypeOfAddress[code][language] = description;
      break;
    case 'TypeOfDenomination':
      if (!TypeOfDenomination[code]) TypeOfDenomination[code] = {};
      TypeOfDenomination[code][language] = description;
      break;
    default:
      console.log(`Unknown category: ${category}`);
  }
};

// Lire le fichier CSV et remplir les tableaux
const filePath = '/home/chemmou/Documents/IPSSI/react_native/clone_pappers/backend/KboOpenData_0127_2024_09_Full/code.csv';  // Chemin vers le fichier CSV
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    processRow(row);
  })
  .on('end', async () => {
    // Insérer les tableaux dans MongoDB
    try {
      const newCodeData = new Code({
        Nace,
        Classification,
        TypeOfEnterprise,
        JuridicalSituation,
        Status,
        JuridicalForm,
        ContactType,
        Language,
        ActivityGroup,
        EntityContact,
        TypeOfAddress,
        TypeOfDenomination
      });

      await newCodeData.save();
      console.log('Code data has been saved to MongoDB.');
    } catch (err) {
      console.error('Error saving code data:', err);
    }

    mongoose.connection.close();  // Fermer la connexion MongoDB après l'importation
  });
