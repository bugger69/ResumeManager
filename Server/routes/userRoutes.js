const express = require("express");
const passport = require("passport");

const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  try {
    const {name, username, password, email, dob, p_address, c_address, designation, branch, year, course} = req.body;
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
      course
    });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, err => {
      if(err) {
        return next(err);
      }
      return res.status(200).send({status: "success"});
    })
  } catch (e) {
    console.log(e);
    return res.status(401).send({status: "error"});
  }
});

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

module.exports = router;
