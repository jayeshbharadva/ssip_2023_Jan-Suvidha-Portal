const mongoose = require("mongoose");

const digilockerscheme = {
  aadhar: {
    type: Number,
    required: true,
  },
  docnumber: {
    type: Number,
    required: true,
  },
  docname: {
    type: String,
    required: true,
  },
  doclink: {
    type: String,
    required: true,
  },
};

module.exports = mongoose.model("digilocker", digilockerscheme);
