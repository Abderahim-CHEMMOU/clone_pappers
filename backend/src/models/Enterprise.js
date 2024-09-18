import mongoose from 'mongoose';

const enterpriseSchema = new mongoose.Schema({
  EnterpriseNumber: { type: String, unique: true, required: true },
  Status: { type: String },
  JuridicalSituation: { type: String },
  TypeOfEnterprise: { type: String },
  JuridicalForm: { type: String },
  JuridicalFormCAC: { type: String },
  StartDate: { type: Date }
});

const Enterprise = mongoose.model('Enterprise', enterpriseSchema);
export default Enterprise;
