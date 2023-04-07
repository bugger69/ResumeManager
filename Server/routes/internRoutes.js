const express = require("express");

const router = express.Router();

// create Intern
 
router.post("/intern", (req, res, next) => {});

// get Intern details

router.get("/intern/:internId", (req, res, next) => {});

// send all interns

router.get("/intern", (req, res, next) => {});

// apply for intern

router.post("/intern/:internId", (req, res, next) => {});

// get applications (recruiter only)

router.get("/intern/applications/:internId", (req, res, next) => {});

module.exports = router;