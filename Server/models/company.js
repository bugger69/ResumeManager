const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  field: String, // change to enum later
  // add in more here
});

module.exports = mongoose.model("company", companySchema);
