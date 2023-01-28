const express = require("express");

const router = express.Router();

const user = require('../schema');

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/front_end/index.html");
});

router.get("/2", (req, res) => {
  res.sendFile(__dirname + "");
});

router.post("/", (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  user.findOne({ name: name }, (err, user) => {
    if (err) {
      return res.status(500).send("Error occured while trying to login");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (password == user.password) {
      return res.redirect("/2");
    } else {
      return res.status(401).send("Incorrect password");
    }
  });
});

module.exports = router;
