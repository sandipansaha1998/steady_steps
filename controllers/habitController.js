const Habit = require("../models/habit");
const moment = require("moment");
module.exports.create = async function (req, res) {
  try {
    // Add the Habit created
    if (req.xhr) {
      let newHabit = JSON.parse(req.body.data);
      newHabit.createdAt = moment(newHabit.createdAt).startOf("day").format();
      let habit = await Habit.create(newHabit);
      // ADD the habit to the DOM
      // Add listners to the table cellss
      res.status(200).json({
        habit,
      });
    }
  } catch (e) {
    console.log("Error in creating habit", e);
  }
};
let isDateIncluded = function (datesArray, dateTobeSearched) {
  let isIncluded = false;
  datesArray.forEach((date) => {
    if (+date === +dateTobeSearched) isIncluded = true;
  });
  return isIncluded;
};

module.exports.toggleStatus = async function (req, res) {
  try {
    let habit = await Habit.findById(req.body.habit);
    day = req.body.day;
    month = req.body.month;
    year = req.body.year;
    // Bring in a offset

    let date = new Date(year, month, day);

    let isMarked = false;
    console.log(date);
    if (
      isDateIncluded(habit.done, date) ||
      isDateIncluded(habit.notDone, date)
    ) {
      console.log("Marked");
      isMarked = true;
    }

    if (isMarked) {
      if (isDateIncluded(habit.done, date)) {
        console.log("Habit is Done and Mark it undone");
        habit.done.remove(date);
        habit.notDone.push(date);
      } else {
        console.log("Habit is not done Mark it unmarked");
        habit.notDone.remove(date);
      }
    } else {
      console.log("Habit is unmarked .Mark it done");
      habit.done.push(date);
    }

    habit.save();

    return res.status(200).json({
      message: "Successfully Toggled",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.getYearlyPerformance = function (req, res) {
  return res.render("yearlyPerformance.ejs", {
    title: "Yearly",
  });
};
