const express = require("express");

const router = express.Router();

const user = require('../schema');
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
// root: path.join(__dirname, 'public'),
const options = { root: path.join(__dirname, '../front_end')}

router.get("/", (req, res) => {
  res.sendFile( "index.html" , options);
});

router.get("/home", (req, res) => {
  res.sendFile( "homepage.html",options);
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
