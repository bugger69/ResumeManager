const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  field: String, // change to enum later
  location: String,
  scale: String,
  description: String
});

module.exports = mongoose.model("company", companySchema);
