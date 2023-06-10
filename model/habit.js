const mongoose = require("mongoose");

//Schema Definition

const habitSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

//Model Definition
const habits = mongoose.model("Habit", habitSchema);
module.exports = habits;
