import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  EntityNumber: { type: String, required: true },
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

const Address = mongoose.model('Address', addressSchema);
export default Address;
