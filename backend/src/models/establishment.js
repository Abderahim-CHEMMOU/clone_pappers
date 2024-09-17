import mongoose from 'mongoose';

const establishmentSchema = new mongoose.Schema({
  EstablishmentNumber: { type: String, required: true },
  StartDate: { type: Date },
  EnterpriseNumber: { type: String, required: true }
});

const Establishment = mongoose.model('Establishment', establishmentSchema);
export default Establishment;
