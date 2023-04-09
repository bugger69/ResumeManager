const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const { isAdmin } = require("../middleware/authorization");

const Company = require("../models/company");

// all these routes should later be admin exclusive except the get ones

// register a company

/**
 * @swagger
 * /api/company :
 *    post:
 *        tags:
 *            - companyRoutes
 *        summary: Used register a company.
 *        description: Exclusive to the admin atm.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  companyName:
 *                    type: string
 *                  field:
 *                    type: string
 *                  location:
 *                    type: string
 *                  scale:
 *                    type: string
 *                  description:
 *                    type: string
 */

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const {companyName, field, location, scale, description} = req.body; // scale : startup and all
    const obj = {companyName: companyName, field: field, location: location, scale: scale, description: description};
    const company = new Company(obj);
    console.log(company);
    const response = await company.save();
    res.status(200).send({msg: "Company registered"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get single company data

/**
 * @swagger
 * /api/company :
 *    get:
 *        tags:
 *            - companyRoutes
 *        summary: Used to get a company's data.
 *        description: Exclusive to the admin atm.
 *        basePath: /api/v1
 */

router.get("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const companyData = await Company.findById(companyId);
    res.status(200).json(companyData);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get all the companies data

/**
 * @swagger
 * /api/company/:companyId :
 *    get:
 *        tags:
 *            - companyRoutes
 *        summary: Used to get all the companies's data.
 *        description: Exclusive to the admin atm.
 *        basePath: /api/v1
 */

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// edit company data

/**
 * @swagger
 * /api/company/:companyId :
 *    put:
 *        tags:
 *            - companyRoutes
 *        summary: Used to update a company's data.
 *        description: Exclusive to the admin atm.
 *        basePath: /api/v1
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  companyName:
 *                    type: string
 *                  field:
 *                    type: string
 *                  location:
 *                    type: string
 *                  scale:
 *                    type: string
 *                  description:
 *                    type: string
 */

router.put("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const {companyName, field, location, scale, description} = req.body; // add checks for each field here later
    const obj = {companyName: companyName, field: field, location: location, scale: scale, description: description};
    const response = await Company.findByIdAndUpdate(companyId, obj);
    res.status(200).send({msg: "updated successfully"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// unregister the company

/**
 * @swagger
 * /api/company/:companyId :
 *    delete:
 *        tags:
 *            - companyRoutes
 *        summary: Used to unregister/delete a company.
 *        description: Exclusive to the admin atm.
 *        basePath: /api/v1
 */

router.delete("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const response = await Company.findByIdAndDelete(companyId);
    res.status(200).send({msg: "successfully deleted"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

module.exports = router;
