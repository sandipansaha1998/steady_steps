const Habit = require("../models/habit");
const moment = require("moment");
module.exports.create = async function (req, res) {
  try {
    // Add the Habit created
    if (req.xhr) {
      let newHabit = JSON.parse(req.body.data);
      // newHabit.createdAt = moment(newHabit.createdAt).startOf("day").format();

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
    console.log(year);
    console.log(month);
    console.log(day);
    let date = new Date(year, month, day);

    let isMarked = false;
    // console.log(date);
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

module.exports.getYearlyPerformance = async function (req, res) {
  let habitID = req.params.habitID;
  let year = req.params.year;

  let habit = await Habit.findById(habitID);
  habit.done.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a) - new Date(b);
  });
  // Frrom habit-done get the dates and form data array
  let monthCount = [];
  let doneCount = 0;
  // Calculating Monthly performance
  for (let i = 0; i <= 11; i++) monthCount.push(doneCount);
  habit.done.forEach((date) => {
    monthCount[date.getMonth()]++;
  });

  let streak = 0;
  let maxStreak = 0;
  for (let i = 1; i < habit.done.length; i++) {
    if (
      Date.parse(habit.done[i]) - Date.parse(habit.done[i - 1]) ===
      86400000
    ) {
      streak++;
    } else {
      maxStreak = Math.max(maxStreak, streak);
      streak = 0;
    }
  }

  maxStreak = Math.max(maxStreak, streak);
  return res.render("yearlyPerformance.ejs", {
    title: "Yearly",
    graph_data: monthCount,
    maxStreak: maxStreak === 0 && habit.done.length !== 1 ? 0 : maxStreak + 1,
    habit_title: habit.title,
    habit_id: habitID,
  });
};

module.exports.delete = async function (req, res) {
  try {
    let habitID = req.params.habit;
    console.log(habitID);
    await Habit.findByIdAndDelete(habitID);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
