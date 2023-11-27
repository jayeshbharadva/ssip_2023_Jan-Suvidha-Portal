const mongoose = require("mongoose");

const documentschema = mongoose.Schema({
  docname: {
    type: String,
    required: true,
  },
  doclink: {
    type: String,
    required: true,
  },
  docnumber: {
    type: Number,
  },
});

const userdetailschema = mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const detailschema = mongoose.Schema({
  aadhar: {
    type: Number,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  otp: {
    type: Number,
  },
  documents: [documentschema],
  userdetail: [userdetailschema],
});

module.exports = mongoose.model("detail", detailschema);
