const mongoose = require("mongoose");

const DocDBschema = mongoose.Schema({
  docname: {
    type: String,
    required: true,
  },
  docnumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("DocDb", DocDBschema);
