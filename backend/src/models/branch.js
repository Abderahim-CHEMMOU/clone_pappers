import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  Id: { type: String, required: true },
  StartDate: { type: Date },
  EnterpriseNumber: { type: String, required: true }
});

const Branch = mongoose.model('Branch', branchSchema);
export default Branch;
