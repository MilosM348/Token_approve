const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const unique = require('mongoose-unique-validator');
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
//Define a schema
const ApproveTokenSchema = new Schema({
  tokenId: {
    type: Number,
    required: [true, "token id is required."]
  },
  balance: {
    type: Number,
    required: [true, "balance id is required."]
  },
  approve: {
    type: Number,
    required: [true, "approve is required."]
  },
});
const ModelSchema = new Schema({
  address: {
    type: String,
    required: [true, "address is required."],
    unique: true
  },
  approveTokens: {
    type: [ApproveTokenSchema],
    required: [true, "approves is required."],
  },
  isMint: {
    type: Boolean,
    required: [true, "isMint is required."],
  }
});
ModelSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
ModelSchema.plugin(autoIncrement.plugin, "Approve");
module.exports = mongoose.model('Approve', ModelSchema);
