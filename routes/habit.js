const express = require("express");
const router = express.Router();

const habitController = require("../controllers/habitController");
const homeController = require("../controllers/homeController");
// Create new habit
router.post("/create", habitController.create);
router.post("/toggleStatus", habitController.toggleStatus);
router.get("/:year/:month", homeController.home);
router.get("/year-wise/:habitID/:year", habitController.getYearlyPerformance);
router.get("/:habit", habitController.delete);
module.exports = router;
