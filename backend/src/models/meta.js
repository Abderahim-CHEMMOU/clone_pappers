import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({
  SnapshotDate: { type: Date },
  ExtractTimestamp: { type: Date },
  ExtractType: { type: String },
  ExtractNumber: { type: Number },
  Version: { type: String }
});

const Meta = mongoose.model('Meta', metaSchema);
export default Meta;
