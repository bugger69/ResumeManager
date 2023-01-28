const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

//setting up express
const app = express();
const port = process.env.PORT || 5000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ResumeManager");
  console.log("Mongo connection open");
}