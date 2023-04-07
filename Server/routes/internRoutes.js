const express = require("express");
const b2 = require("../config/backblazeb2");

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
const Resume = require("../models/resume");

async function GetBucket() {
  try {
    await b2.authorize();
    let response = await b2.getBucket({
      bucketName: process.env.BUCKET_NAME || "resume-manager",
    });
    return response.data;
  } catch (err) {
    console.log("Error getting bucket:", err);
  }
}

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

    res.status(200).send({ msg: "Intern Created" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get Intern details

router.get("/:internId", isLoggedIn, async (req, res, next) => {
  try {
    const internId = req.params.internId;
    const intern = await Intern.findById(internId);
    console.log(intern);
    if (!intern) {
      throw new Error("No intern found");
    }
    res.status(200).send(intern);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// send all interns

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const interns = await Intern.find({});
    console.log(interns);
    if (!interns) {
      throw new Error("No intern found");
    }
    res.status(200).send(interns);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// apply for intern

router.post("/:internId", isLoggedIn, async (req, res, next) => {
  try {
    const internId = req.params.internId;
    const intern = await Intern.findById(internId);
    console.log(intern);
    if (!intern) {
      throw new Error("No intern found");
    }
    const user = req.user;
    console.log(user);

    const size = req.user.resumes.length;
    const resume = await Resume.findById(req.user.resumes[size - 1]);
    console.log(resume);

    const application = {Resume: resume, User: user};

    intern.applications.push(application);
    const response = await intern.save();

    console.log(response);

   
    res.status(200).send({data: "application successfull"});
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
