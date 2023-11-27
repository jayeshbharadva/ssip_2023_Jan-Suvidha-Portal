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

const govschema = mongoose.Schema({
  schemeid: {
    type: Number,
  },
  schemename: {
    type: String,
  },
  aadhar: {
    type: Number,
  },
  status: {
    type: String,//applied,approved,rejected
  },
  remark: {
    type: String,
  },
  documents: [documentschema],
  userdetail: [userdetailschema],
});

govschema.index({ schemeid: 1, aadhar: 1 }, { unique: true });

module.exports = mongoose.model("gov", govschema);
