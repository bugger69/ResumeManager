const express = require("express");
const passport = require("passport");
const signature = require("cookie-signature");

const router = express.Router();

const User = require("../models/user");

/**
 * @swagger
 * /register :
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
 * /login :
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
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(req.sessionID);
        // res.status(200).cookie('connect.sid','s:' + signature.sign(req.sessionID, process.env.SECRET_KEY));
        res.status(200).send({status: "logged in"});
        console.log(req.user);
      });
    }
  })(req, res, next);
});

/**
 * @swagger
 * /logout :
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

router.get("/user", (req, res, next) => {
  res.send(req.user);
})

module.exports = router;
