const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require('path')

const userRoutes = require("./routes/userRoutes");

//setting up express
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('view engine','ejs')
app.set('views',path.join(__dirname ,  'front_end'))
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ResumeManager");
  console.log("Mongo connection open");
}

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
