const mongoose = require("mongoose");

const internSchema = mongoose.Schema({
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }
    // need to add way more here
});

module.exports = mongoose.model('internship', internSchema);