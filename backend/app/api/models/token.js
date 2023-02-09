const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const unique = require('mongoose-unique-validator');
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
//Define a schema
const ModelSchema = new Schema({
  symbol: {
    type: String,
    required: [true, "symbol is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required."],
  },
  address: {
    type: String,
    required: [true, "address is required."],
  },
  decimals: {
    type: Number,
    required: [true, "decimals is required."],
  },
  logoUrl: {
    type: String,
  },
});
ModelSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
ModelSchema.plugin(autoIncrement.plugin, "Token");
module.exports = mongoose.model('Token', ModelSchema);
