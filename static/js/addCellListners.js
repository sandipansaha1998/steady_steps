function setCellStatus(habits, year, month, daysCount) {
  // Sets Cell status
  // sets cell for a partiular year month and daysCount
  habits.forEach((habit) => {
    for (let i = 1; i <= daysCount; i++) {
      if (
        habit.done.some(
          (doneDate) => doneDate === new Date(year, month, i).toISOString()
        )
      ) {
        document
          .querySelector(`.habit-${habit._id}.day-cell.day-${i}`)
          .classList.add("habit-done");
      } else if (
        habit.notDone.some(
          (notDoneDate) =>
            notDoneDate === new Date(year, month, i).toISOString()
        )
      ) {
        document
          .querySelector(`.habit-${habit._id}.day-cell.day-${i}`)
          .classList.add("habit-not-done");
      } else {
      }
    }
  });
}

// Sets Click Listners
function setClickListners() {
  let cells = document.querySelectorAll(".day-cell");
  // Setting Listners to all the day-cells
  for (let cell of cells) {
    // Sets Cell status
    // Check if class list of cell contains done or undone
    // if neither done nor not done (unmarked) found : change it to done
    // if marked done : change it to not-done
    // if marked not-done :change to unmarked
    cell.addEventListener("click", (event) => {
      if (event.currentTarget.classList.value.includes("habit-done")) {
        event.currentTarget.classList.add("habit-not-done");
        event.currentTarget.classList.remove("habit-done");
      } else if (
        event.currentTarget.classList.value.includes("habit-not-done")
      ) {
        event.currentTarget.classList.remove("habit-not-done");
      } else {
        event.currentTarget.classList.add("habit-done");
      }

      // set month and year and day and habit and post request for toggle
      year = currentYear;
      month = currentMonth;
      habit = event.currentTarget.classList[0].split("-")[1];
      day = event.currentTarget.classList[1].split("-")[1];
      $.ajax({
        type: "POST",
        url: "/habit/toggleStatus",
        data: {
          habit,
          day,
          month,
          year,
        },
        success: function (response) {},
        error: function (err) {
          new Noty({
            theme: "metroui",
            text: '<i class="fa-solid fa-circle-exclamation"></i>Problema',
            type: "error",
            layout: "topCenter",
            timeout: 1500,
          }).show();
        },
      });
    });
  }
}
