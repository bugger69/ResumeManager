const express = require("express");

const router = express.Router();

const User = require("../models/user");
const Resume = require("../models/resume");
const isLoggedIn = require("../middleware/isLoggedIn");

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

/**
 * @swagger
 * /api/upload :
 *    post:
 *        tags:
 *            - uploadRoutes
 *        summary: Route to upload Resume.
 *        description: Uploads the resume to the database. Upload the file to the file input and send the request.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  file:
 *                    type: string
 */

router.post("/resume", upload.single("file"), isLoggedIn, async (req, res) => {
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
      fileName: response.data.fileName,
    };
    const resume = new Resume(resumeDetails);
    // console.log(req.user?"user found": "user not found");
    const user = await User.findById(req.user._id.toString());
    user.resumes.push(resume);
    // console.log(user);
    await resume.save();
    await user.save();
    res.status(200).send({ status: "file successfully uploaded" });
  } catch (e) {
    console.log(e);
    res.status(400).send({status: "unable to upload"});
  }
});

module.exports = router;
