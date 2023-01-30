const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    branchName: String, // change to enum later
    year: Number, // add a condition later
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    tpr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model("batch", batchSchema);