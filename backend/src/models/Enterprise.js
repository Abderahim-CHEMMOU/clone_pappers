import mongoose from 'mongoose';

// Schéma pour les adresses
const addressSchema = new mongoose.Schema({
  TypeOfAddress: { type: String },
  CountryNL: { type: String },
  CountryFR: { type: String },
  Zipcode: { type: String },
  MunicipalityNL: { type: String },
  MunicipalityFR: { type: String },
  StreetNL: { type: String },
  StreetFR: { type: String },
  HouseNumber: { type: String },
  Box: { type: String },
  ExtraAddressInfo: { type: String },
  DateStrikingOff: { type: Date }
});

// Schéma pour les contacts
const contactSchema = new mongoose.Schema({
  EntityContact: { type: String },
  ContactType: { type: String },
  Value: { type: String }
});

// Schéma pour les dénominations
const denominationSchema = new mongoose.Schema({
  Language: { type: String },
  TypeOfDenomination: { type: Number },
  Denomination: { type: String }
});

// Schéma pour les activités
const activitySchema = new mongoose.Schema({
  ActivityGroup: { type: Number, required: true },
  NaceVersion: { type: Number, required: true },
  NaceCode: { type: String, required: true },
  Classification: { type: String, required: true },
  // activityKey: { type: String, required: true }  // Clé unique pour chaque activité
});

// Schéma principal pour les entreprises
const enterpriseSchema = new mongoose.Schema({
  EnterpriseNumber: { type: String, unique: true, required: true },  // Numéro unique d'entreprise
  Status: { type: String },
  JuridicalSituation: { type: String },
  TypeOfEnterprise: { type: String },
  JuridicalForm: { type: String },
  JuridicalFormCAC: { type: String },
  StartDate: { type: Date },
  Activities: [activitySchema],      // Tableau pour les activités
  Addresses: [addressSchema],        // Tableau pour les adresses
  Contacts: [contactSchema],         // Tableau pour les contacts
  Denominations: [denominationSchema] // Tableau pour les dénominations
});

// Ajout de l'index unique pour éviter les duplicatas dans Activities
enterpriseSchema.index({
  EnterpriseNumber: 1,
  'Activities.activityKey': 1
}, { unique: true });

const Enterprise = mongoose.model('Enterprise', enterpriseSchema);

export default Enterprise;
