import mongoose from 'mongoose';

const denominationSchema = new mongoose.Schema({
  EntityNumber: { type: String, required: true },
  Language: { type: String },
  TypeOfDenomination: { type: String },
  Denomination: { type: String }
});

const Denomination = mongoose.model('Denomination', denominationSchema);
export default Denomination;
