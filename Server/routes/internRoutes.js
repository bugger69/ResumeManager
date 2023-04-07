const express = require("express");
const b2 = require("../config/backblazeb2");
const JSZip = require("jszip");

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
const User = require("../models/user");

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

   
    res.status(200).send({msg: "application successfull"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get applications (recruiter only)

router.get("/applications/:internId", isLoggedIn, async (req, res, next) => { // needs a ton of fixing
  try {
    const internId = req.params.internId;
    const intern = await Intern.findById(internId);
    console.log(intern);
    if (!intern) {
      throw new Error("No intern found");
    }
    // await intern.populate("applications.Resume");
    // await intern.populate("applicatons.User");
    const zip = new JSZip();
    for (let application of intern.applications) {
      if (application) {
        const stud = application.Resume;
        const stud1 = application.User;
       
        const resumeId = application.Resume.toString();
        const userId = application.User.toString();

        const user = await User.findById(userId);
        const resume = await Resume.findById(resumeId);

        console.log(user);

        const fileName = resume.fileName;
        const bucket = await GetBucket();
        console.log(bucket);
        // console.log(bucket);
        const bucketId = bucket.buckets[0].bucketId;
        // const bucketName = bucket.buckets[0].bucketName;

        let fileId = resume.fileId;
        // const fileInfo = await b2.getFileInfo({ fileId });

        // const { data: { buckets } } = await b2.listBuckets();
        // const buck = buckets.find(bucket => bucket.bucketId === bucketId);
        // const bucketName = buck.bucketName;

        const auth = await b2.getDownloadAuthorization({
          bucketId: bucketId,
          fileNamePrefix: "",
          validDurationInSeconds: 300000, // a number from 0 to 604800
          // ...common arguments (optional)
        });

        const file = await b2.downloadFileById({
          fileId: fileId,
          responseType: "json",
          onDownloadProgress: (event) => {},
        });
 
        zip.file(fileName, file.data );
        zip.file(`${user.username}.pdf`, JSON.stringify(user));
      }
    }

    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    res.status(200).send(zipData);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

module.exports = router;
