const express = require("express");

const router = express.Router();

const Batch = require("../models/batch");
const isLoggedIn = require("../middleware/isLoggedIn");

//get route to get batch resumes.

module.exports = router;