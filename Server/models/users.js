const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_of_birth: Date,
  permanent_address: String,
  current_address: String,
  designation: {
    type: String,
    enum: ['student', 'tpr', 'professor', 'comp_representative'],
    default: 'student'
  },
  branch: String, // change this to enum
  year: Number,
  course: {
    type: String,
    enum: ['btech', 'mtech', 'phd'],
    default: 'btech'
  },
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'resume'
    }
  ]
});

module.exports = mongoose.model("user", UserSchema);
