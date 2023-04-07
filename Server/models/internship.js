const mongoose = require("mongoose");

const internSchema = mongoose.Schema({
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    description: String,
    start_date: Date,
    end_date: Date,
    requirements: String,
    stipend: Number,
    compensation: String,
    application_deadline: Date,
    supervision_mentorship: String,
    hiring_info: String,
    eligiblity_for_FE: String,
    applications: [
        {
            Resume: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'resume'
            },
            User: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }

        }
      ]
    // need to add way more specific data types here.
});

module.exports = mongoose.model('internship', internSchema);