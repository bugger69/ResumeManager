const express = require("express");

const router = express.Router();

const Batch = require("../models/batch");
const {isTpr, isProf, isRecruiter, isAdmin} = require("../middleware/authorization");
const isLoggedIn = require("../middleware/isLoggedIn");

// create a batch

router.post("/batch", isLoggedIn, (req, res, next) => {
    const {branchName, year, passOut, tprId} = req.body;
});

// get resumes from a batch

router.get("/resumes", isLoggedIn, (req, res, next) => {});

module.exports = router;