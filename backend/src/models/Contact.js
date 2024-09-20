import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  EntityNumber: { type: String, required: true },
  EntityContact: { type: String },
  ContactType: { type: String },
  Value: { type: String }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
