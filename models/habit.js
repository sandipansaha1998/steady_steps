const mongoose = require("mongoose");

//Schema Definition

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: [
    {
      type: Date,
    },
  ],
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
