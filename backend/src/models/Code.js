import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  Nace: { type: Object, default: {} },  // Un objet contenant NaceVersion[NaceCode][Language]
  Classification: { type: Object, default: {} },  // Un objet contenant Classification[Code][Language]
  TypeOfEnterprise: { type: Object, default: {} },  // Un objet contenant TypeOfEnterprise[Code][Language]
  JuridicalSituation: { type: Object, default: {} },  // Un objet contenant JuridicalSituation[Code][Language]
  Status: { type: Object, default: {} },  // Un objet contenant Status[Code][Language]
  JuridicalForm: { type: Object, default: {} },  // Un objet contenant JuridicalForm[Code][Language]
  ContactType: { type: Object, default: {} },  // Un objet contenant ContactType[Code][Language]
  Language: { type: Object, default: {} },  // Un objet contenant Language[Code][Language]
  ActivityGroup: { type: Object, default: {} },  // Un objet contenant ActivityGroup[Code][Language]
  EntityContact: { type: Object, default: {} }  // Un objet contenant EntityContact[Code][Language]
});

const Code = mongoose.model('Code', codeSchema);

export default Code;
