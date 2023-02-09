const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const unique = require('mongoose-unique-validator');
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
//Define a schema
const ModelSchema = new Schema({
  address: {
    type: String,
    required: [true, "address is required."],
    unique: true
  },
});
ModelSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
ModelSchema.plugin(autoIncrement.plugin, "Setting");
module.exports = mongoose.model('Setting', ModelSchema);
