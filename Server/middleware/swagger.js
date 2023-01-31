const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const router = express.Router();

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resume Manager",
      version: "1.0.0",
    },
  },
  apis: ["../routes*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpec));

module.exports = router;
