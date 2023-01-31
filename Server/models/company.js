const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  field: String, // change to enum later
  location: String,
  size: String,
  description: String
});

module.exports = mongoose.model("company", companySchema);
