import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  EnterpriseNumber: { type: String, required: true }, 
  Id: { type: String, required: true },
  StartDate: { type: Date }
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
