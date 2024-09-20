import mongoose from 'mongoose';

const establishmentSchema = new mongoose.Schema({
  EstablishmentNumber: { type: String, required: true }, // Numéro d'établissement
  StartDate: { type: Date, required: true }, // Date de création de l'établissement
  EnterpriseNumber: { type: String, required: true } // Numéro de l'entreprise associée
});

const Establishment = mongoose.model('Establishment', establishmentSchema);

export default Establishment;
