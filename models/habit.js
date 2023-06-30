const mongoose = require("mongoose");

//Schema Definition

const habitSchema = new mongoose.Schema({
  // Title
  title: {
    type: String,
    required: true,
  },
  // Array of dates marked done
  done: [
    {
      type: Date,
    },
  ],
  // Array of dates marked not done
  notDone: [
    {
      type: Date,
    },
  ],
  createdAt: { type: Date },
});

//Model Definition
const habits = mongoose.model("Habit", habitSchema);
module.exports = habits;
