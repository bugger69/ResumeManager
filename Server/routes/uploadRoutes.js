const express = require("express");

const router = express.Router();

const User = require("../models/users");
const Resume = require("../models/resume");

const b2 = require("../config/backblazeb2");

async function GetBucket() {
  try {
    await b2.authorize();
    let response = await b2.getBucket({ bucketName: "resume-manager" });
    return response.data;
  } catch (err) {
    console.log("Error getting bucket:", err);
  }
}

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  User.findOne({ name: name }, (err, User) => {
    if (err) {
      return res.status(500).send("Error occured while trying to login");
    }
    if (!User) {
      return res.status(404).send("User not found");
    }
    if (password == User.password) {
      return res.status(200).send({ status: "logged in" });
    } else {
      return res.status(401).send("Incorrect password");
    }
  });
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.file);
    const fileContents = req.file.buffer;
    const bucket = await GetBucket();
    // console.log(bucket);
    const bucketId = bucket.buckets[0].bucketId;
    const uploadUrl = await b2.getUploadUrl({
      bucketId: bucketId,
    });
    // console.log(uploadUrl);
    const response = await b2.uploadFile({
      uploadUrl: uploadUrl.data.uploadUrl,
      uploadAuthToken: uploadUrl.data.authorizationToken,
      fileName: req.file.originalname,
      data: fileContents,
      contentLength: fileContents.length,
    });
    // console.log(response);
    const resumeDetails = {
      fileId: response.data.fileId,
      fileName: response.data.fileName
    }
    const resume = new Resume(resumeDetails);
    console.log(resume);
    res.status(200).send({ status: "file successfully uploaded" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
