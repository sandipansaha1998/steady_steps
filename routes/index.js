// Packages
const express = require("express");
// Modules
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.home);

router.use("/habit", require("./habit"));

module.exports = router;
