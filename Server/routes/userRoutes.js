const express = require("express");

const router = express.Router();

const user = require('../schema');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.get("/", (req, res) => {
  res.render( "index");
});

router.get("/home", (req, res) => {
  res.sendFile(__dirname + "Server\front_end\homepage.html");
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
      return res.redirect("/home");
    } else {
      return res.status(401).send("Incorrect password");
    }
  });
});

router.post("/home", upload.single("pdf-file"), (req, res) => {
  console.log(req.file);
  console.log(req.body)
});

module.exports = router;
