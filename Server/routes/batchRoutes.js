const express = require("express");

const router = express.Router();

const Batch = require("../models/batch");
const User = require("../models/user");
const {isTpr, isProf, isRecruiter, isAdmin} = require("../middleware/authorization"); // apply and test after testing the routes.
const isLoggedIn = require("../middleware/isLoggedIn");

// create a batch

router.post("/batch", isLoggedIn, async (req, res, next) => {
    try {
        const {branchName, year, passOut, tprId} = req.body;
        const batchDetails = {branchName: branchName, year: year, passOutYear: passOut, tpr: tprId };
        const tpr = await User.findById(tprId);
        // optional update of designation here
        batchDetails.tpr = tpr;
        const batch = new Batch(batchDetails);
        await batch.save();
        res.status(200).send({msg: "batch created"});
    } catch (e) {
        console.log(e);
        res.status(400).send({msg: "An error occured"});
    }
});

// get resumes from a batch

router.get("/resumes/:batchId", isLoggedIn, (req, res, next) => {
    // add a check for if the current user is  the tpr of the requested batch.
});

module.exports = router;