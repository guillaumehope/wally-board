const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const candidatUserSchema = mongoose.Schema({
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

candidatUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('CandidatUser', candidatUserSchema);
