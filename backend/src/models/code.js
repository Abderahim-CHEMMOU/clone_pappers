import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  Category: { type: String, required: true },
  Code: { type: Number, required: true },
  Language: { type: String },
  Description: { type: String }
});

const Code = mongoose.model('Code', codeSchema);
export default Code;
