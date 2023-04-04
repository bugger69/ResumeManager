const express = require("express");
const JSZip = require("jszip");
const { PassThrough } = require("stream");

const router = express.Router();

const Batch = require("../models/batch");
const User = require("../models/user");
const Resume = require("../models/resume");
const {
  isTpr,
  isProf,
  isRecruiter,
  isAdmin,
} = require("../middleware/authorization"); // apply and test after testing the routes.
const isLoggedIn = require("../middleware/isLoggedIn");

const b2 = require("../config/backblazeb2");

async function GetBucket() {
  try {
    await b2.authorize();
    let response = await b2.getBucket({ bucketName: process.env.BUCKET_NAME || "resume-manager"});
    return response.data;
  } catch (err) {
    console.log("Error getting bucket:", err);
  }
}

// route to get batch id

router.get("/:tprId", isLoggedIn, async (req, res, next) => {
  try {
    const tprId = req.params.tprId;
    const batch = await Batch.find({tpr: tprId}).exec();
    res.status(200).send({batchId: batch[0]._id});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});



// create a batch

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { branchName, year, passOut, tprId } = req.body;
    const batchDetails = {
      branchName: branchName,
      year: year,
      passOutYear: passOut,
      tpr: tprId,
    };
    const tpr = await User.findById(tprId);
    // optional update of designation here
    batchDetails.tpr = tpr;
    const batch = new Batch(batchDetails);
    await batch.save();
    res.status(200).send({ msg: "batch created" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get resumes from a batch

// ohkay so here are the final steps
// get the array buffer as you were including filenames, create a archive and append all files using loop, do the honours then.

router.get("/resumes/:batchId", isLoggedIn, async (req, res, next) => {
  // add a check for if the current user is  the tpr of the requested batch.
  try {
    const { batchId } = req.params;
    const batch = await Batch.findById(batchId).populate({
      path: "students",
      populate: {
        path: "resumes",
        model: "resume",
      },
    });
    console.log(batch);
    if (batch.tpr.toString() != req.user._id.toString()) {
      throw new Error("You're not the tpr of the batch");
    }
    // const allResumes = [];
    const zip = new JSZip();
    for (let student of batch.students) {
      if (student) {
        const stud = await student.populate("resumes");
        // console.log(stud);
        const resumeId = stud.resumes[0];
        const fileName = student.resumes[0].fileName;
        const bucket = await GetBucket();
        console.log(bucket);
        // console.log(bucket);
        const bucketId = bucket.buckets[0].bucketId;
        const bucketName = bucket.buckets[0].bucketName;

        const resume = await Resume.findById(resumeId);
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
        // console.log(fileInfo);
        // console.log(auth);

        // const downloadUrl = `https://f${bucketName}.backblazeb2.com/file/${bucketName}/${fileName}?Authorization=${auth.data.authorizationToken}`;
        const file = await b2.downloadFileById({
          fileId: fileId,
          responseType: "json",
          onDownloadProgress: (event) => {},
        });
        // console.log(downloadUrl);
        // allResumes.push(downloadUrl);
        zip.file(fileName, file.data );
      }
    }

    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    // for (let i = 0; i < allResumes.length; i++) {
    //   const resume = allResumes[i];
    //   const name = `resume${i + 1}.pdf`;
    //   zip.file(name, resume);
    // }
    // const buffer = await zip.generateAsync({ type: "nodebuffer" });
    // res.set({
    //   "Content-Type": "application/zip",
    //   "Content-Disposition": "attachment; filename=resumes.zip",
    // });
    res.status(200).send(zipData);
    // for(let resume of allResumes) {
    //   res.status(200).sendFile(resume.path, resume.name);
    // }
    // how do you get all the resumes again, the links or what????
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

module.exports = router;
