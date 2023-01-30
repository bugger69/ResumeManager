const express = require("express");

const router = express.Router();

const User = require("../models/users");

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
