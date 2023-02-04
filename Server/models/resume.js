const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    fileId: String,
    fileName: String
}, {timestamps: true});

module.exports = mongoose.model("resume", resumeSchema);
