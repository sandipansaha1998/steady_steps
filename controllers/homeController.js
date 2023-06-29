const Habit = require("../models/habit");
const moment = require("moment");
module.exports.home = async function (req, res) {
  // Fetch all the habits and send it
  try {
    if (req.xhr) {
      let currentMonth = Number(req.params.month);
      let currentYear = req.params.year;

      let habitsCurrentMonth = await Habit.find({
        createdAt: {
          $lt: new Date(currentYear, currentMonth + 1, 1),
          // $gte: new Date(currentYear, currentMonth, 1),
        },
      });
      console.log(habitsCurrentMonth.length);
      let getMonthDayCount = function (y, m) {
        return new Date(y, m + 1, 0).getDate();
      };
      let monthDayCount = getMonthDayCount(currentYear, currentMonth);
      return res.status(200).json({
        habits: habitsCurrentMonth,
        currentMonth,
        currentYear,
        monthDayCount,
      });
    }

    let dateToday = new Date();
    let currentMonth = dateToday.getMonth();
    let currentYear = dateToday.getFullYear();
    let habitsCurrentMonth = await Habit.find({
      createdAt: {
        $lt: new Date(currentYear, currentMonth + 1, 1),
        // $gte: new Date(currentYear, currentMonth, 1),
      },
    });
    let getMonthDayCount = function (y, m) {
      return new Date(y, m + 1, 0).getDate();
    };
    console.log(habitsCurrentMonth);
    let monthDayCount = getMonthDayCount(currentYear, currentMonth);

    return res.render("home", {
      title: "Home",
      habits: habitsCurrentMonth,
      currentMonth,
      currentYear,
      monthDayCount,
    });
  } catch (e) {
    console.log(e, "Error in rendering home");
  }
};
