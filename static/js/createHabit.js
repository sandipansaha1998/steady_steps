// Creates new habit row and appends to the table in DOM
let newHabitDom = function (habit, daysCount) {
  let newRow = $("<tr>");
  let titleData = $("<td>");
  titleData.text(habit.title);
  newRow.append(titleData);
  // Link to yearly performance
  titleData[0].addEventListener("click", () => {
    window.location.href = `https://steady-steps.socialise-india.in/${habit._id}/${currentYear}`;
  });
  titleData.addClass("p-2 habit-title cursor-pointer");

  // Creating the cells
  for (let i = 1; i <= daysCount; i++) {
    let tableCell = $("<td>").addClass(
      `habit-${habit._id} day-${i} day-cell text-light`
    );
    tableCell[0].innerText = i;
    newRow.append(tableCell);
  }
  return newRow;
};
let addToggleStatus = (event) => {
  // Check if class list of cell contains done or undone
  // if neither done nor not done (unmarked) found : change it to done
  // if marked done : change it to not-done
  // if marked not-done :change to unmarked

  if (event.currentTarget.classList.value.includes("habit-done")) {
    event.currentTarget.classList.add("habit-not-done");
    event.currentTarget.classList.remove("habit-done");
  } else if (event.currentTarget.classList.value.includes("habit-not-done")) {
    event.currentTarget.classList.remove("habit-not-done");
  } else {
    event.currentTarget.classList.add("habit-done");
  }

  year = currentYear;
  month = currentMonth;
  // Grab the habit ID and day
  habit = event.currentTarget.classList[0].split("-")[1];
  day = event.currentTarget.classList[1].split("-")[1];
  // POST request sent for toggling a cell's completion status for a particular habit
  $.ajax({
    type: "POST",
    url: "/habit/toggleStatus",
    data: {
      habit,
      day,
      month,
      year,
    },

    error: function (error) {
      new Noty({
        theme: "metroui",
        text: '<i class="fa-solid fa-circle-exclamation"></i>Sorry! Could not update',
        type: "error",
        layout: "topCenter",
        timeout: 1500,
      }).show();
    },
  });
};
let createHabit = (e) => {
  e.preventDefault();
  let newHabitTitle = $("#habit-title");
  let newHabitForm = {
    title: newHabitTitle.val(),
    // Global variable  currentyear and currentMonth
    createdAt: new Date(currentYear, currentMonth, 1).toISOString(),
  };
  // POST request sent for creation of a new habit
  $.ajax({
    type: "post",
    url: "/habit/create",
    data: { data: JSON.stringify(newHabitForm) },
    success: function (data) {
      new Noty({
        theme: "metroui",
        text: '<i class="fa-solid fa-circle-check me-1"></i>Habit Added',
        type: "success",
        layout: "topCenter",
        timeout: 1500,
      }).show();
      // Creating new Habit
      let newHabitDOM = newHabitDom(data.habit, 30);
      console.log(newHabitDOM[0]);
      //  Adding Listners to toggle dates
      newHabitDOM.find(".day-cell").click(addToggleStatus);

      // Appending to the calendar
      let calendarTable = $("#calender-table");
      calendarTable.find("tbody").append(newHabitDOM);

      // reseting the create task form
      document.querySelector("#habit-title").value = "";
    },
    error: {
      function(err) {
        console.log(err);
      },
    },
  });
};

// Event Listner for Form Submition
let form = document.querySelector("#create-habit-form");
form.addEventListener("submit", createHabit);
