const mongoose = require("mongoose");

const schmesschema = mongoose.Schema({
  schemeid: {
    type: Number,
    required: true,
    unique: true,
  },
  schemename: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
  },
  userdetail: {
    type: [String],
  },
  status: {
    type: String, //active or completed
  },
  LastDate: {
    type: Date,
  },
});

module.exports = mongoose.model("schemes", schmesschema);
