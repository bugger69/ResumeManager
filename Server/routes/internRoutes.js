const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const {
  isTpr,
  isProf,
  isRecruiter,
  isAdmin,
} = require("../middleware/authorization");
const Company = require("../models/company");
const Intern = require("../models/internship");

// create Intern

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const {
      companyName,
      description,
      startDate,
      endDate,
      requirements,
      stipend,
      compensation,
      applicationDeadline,
      supervisionMentorship,
      hiringInfo,
      eligibility,
    } = req.body;
    const companyData = await Company.find({ companyName: companyName });
    console.log(companyData);
    const companyId = companyData[0].companyId;
    const internData = {
      companyId: companyId,
      description: description,
      start_date: startDate,
      end_date: endDate,
      requirements: requirements,
      stipend: stipend,
      compensation: compensation,
      application_deadline: applicationDeadline,
      supervision_mentorship: supervisionMentorship,
      hiring_info: hiringInfo,
      eligiblity_for_FE: eligibility,
    };
    const createdIntern = new Intern(internData);
    const response = await createdIntern.save();
    console.log(response);

    res.status(200).send({msg: "Intern Created"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get Intern details

router.get("/:internId", isLoggedIn, (req, res, next) => {
  try {
    res.status(200).send("hit the route");
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// send all interns

router.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.status(200).send("hit the route");
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// apply for intern

router.post("/:internId", isLoggedIn, (req, res, next) => {
  try {
    res.status(200).send("hit the route");
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get applications (recruiter only)

router.get("/applications/:internId", isLoggedIn, (req, res, next) => {
  try {
    res.status(200).send("hit the route");
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

module.exports = router;
