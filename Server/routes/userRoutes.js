const express = require("express");
const passport = require("passport");
const JSZip = require("jszip");
const b2 = require("../config/backblazeb2");

const router = express.Router();

const User = require("../models/user");
const Resume = require("../models/resume");
const isLoggedIn = require("../middleware/isLoggedIn");

async function GetBucket() {
  try {
    await b2.authorize();
    let response = await b2.getBucket({ bucketName: process.env.BUCKET_NAME || "resume-manager" });
    return response.data;
  } catch (err) {
    console.log("Error getting bucket:", err);
  }
}

/**
 * @swagger
 * /api/register :
 *    post:
 *        tags:
 *            - userRoutes
 *        summary: Creates a user.
 *        description: Creates an new user if the info is correct and logs them in.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  username:
 *                    type: string
 *                  email:
 *                    type: string
 *                  date_of_birth:
 *                    type: string
 *                    format: date-time
 *                  permanent_address:
 *                    type: string
 *                  current_address:
 *                    type: string
 *                  designation:
 *                    type: string
 *                    enum:
 *                      - student
 *                      - tpr
 *                      - professor
 *                      - comp_representative
 *                    default: student
 *                  branch:
 *                    type: string
 *                  year:
 *                    type: number
 *                  course:
 *                    type: string
 *                    enum:
 *                      - btech
 *                      - mtech
 *                      - phd
 *                    default: btech
 *                  resumes:
 *                    type: array
 *                    items:
 *                      type: string
 */

router.post("/register", async (req, res, next) => {
  try {
    const {
      name,
      username,
      password,
      email,
      dob,
      p_address,
      c_address,
      designation,
      branch,
      year,
      course,
    } = req.body;
    const user = new User({
      name,
      username,
      email,
      date_of_birth: dob,
      permanent_address: p_address,
      current_address: c_address,
      designation,
      branch,
      year,
      course,
    });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send({ status: "successfully registered" });
    });
  } catch (e) {
    console.log(e);
    return res.status(401).send({ status: "error" });
  }
});

/**
 * @swagger
 * /api/login :
 *    post:
 *        tags:
 *            - userRoutes
 *        summary: Logs in a user.
 *        description: Logs in a user.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // console.log(req.sessionID);
        // res.status(200).cookie('connect.sid','s:' + signature.sign(req.sessionID, process.env.SECRET_KEY));
        res.status(200).send({ status: "logged in" });
        // console.log(req.user);
      });
    }
  })(req, res, next);
});

/**
 * @swagger
 * /api/logout :
 *    get:
 *        tags:
 *            - userRoutes
 *        summary: Logs out a user.
 *        description: Only works if the user is logged in.
 */

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(403).send({ status: "logout failed" });
    }
    res.status(200).send({ status: "logged out" });
  });
});

// will need this one later, hence need to fix up this one.

/**
 * @swagger
 * /api/user :
 *    get:
 *        tags:
 *            - userRoutes
 *        summary: Fetches user data for a user that's already logged in.
 *        description: Only works if the user is logged in.
 */

router.get("/user", isLoggedIn, (req, res, next) => {
  if (req.user) {
    const userData = {
      id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      permanent_address: req.user.permanent_address,
      current_address: req.user.current_address,
      designation: req.user.designation,
      branch: req.user.branch,
      year: req.user.year,
      course: req.user.course,
    };
    res.status(200).send(userData);
  } else {
    throw new Error("User Not Found.");
  }
});

/**
 * @swagger
 * /api/user :
 *    put:
 *        tags:
 *            - userRoutes
 *        summary: Edits the provided fields for a user.
 *        description: Can be used to edit user data that may have entered wrong at some point. None of the fields are required.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *                  permanent_address:
 *                    type: string
 *                  current_address:
 *                    type: string
 *                  branch:
 *                    type: string
 *                  year:
 *                    type: string
 *                  course:
 *                    type: string
 */

router.put("/user", isLoggedIn ,(req, res, next) => { // add checks to check the presence of every field, turn this into a try-catch.
  if(req.user) {
    const id = req.user.id;
    const userData = {
      username: req.body.username,
      email: req.body.email,
      date_of_birth: req.body.dob,
      permanent_address: req.body.permanent_address,
      current_address: req.body.current_address,
      branch: req.body.branch,
      year: req.body.year,
      course: req.body.course,
    };
    User.findByIdAndUpdate(id, userData).then((resp) => {
      console.log(resp);
      res.status(200).send({status: "user updated"});
    }).catch((e) => {
      console.log(e);
    })
  }
});

// route to get your own resume

/**
 * @swagger
 * /api/user/resume :
 *    get:
 *        tags:
 *            - userRoutes
 *        summary: Allows a user that's logged in to fetch his own resume.
 *        description: Only works if the user is logged in.
 */

 router.get("/user/resume", isLoggedIn, async (req, res, next) => { // check if you're getting the oldest resume or the latest one
  try {
    if (req.user) {
      const size = req.user.resumes.length;
      const resumeData = await Resume.findById(req.user.resumes[size - 1]);
      console.log(req.user);
      console.log(resumeData);
      const fileId = resumeData.fileId;
      const fileName = resumeData.fileName;

      const bucket = await GetBucket();

      const bucketId = bucket.buckets[0].bucketId;

      const zip = new JSZip();

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
      const zipData = await zip.generateAsync({ type: 'nodebuffer' });
      res.status(200).send(zipData);
    }
  } catch (e) {
    console.log(e);
  }
 });

module.exports = router;
