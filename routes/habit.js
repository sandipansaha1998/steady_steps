const express = require("express");
const router = express.Router();

const habitController = require("../controllers/habitController");
const homeController = require("../controllers/homeController");
// Create new habit
router.post("/create", habitController.create);
// Toggles the status of the habit for a date
router.post("/toggleStatus", habitController.toggleStatus);
// Get habits for particular year and month
router.get("/:year/:month", homeController.home);
// Get Year-wise performance for habit with ID habitID for a particular year
router.get("/year-wise/:habitID/:year", habitController.getYearlyPerformance);
// Delete a route
router.get("/:habit", habitController.delete);
module.exports = router;
