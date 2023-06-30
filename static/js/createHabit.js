let addToggleStatus = (event) => {
  if (event.currentTarget.classList.value.includes("")) {
    event.currentTarget.classList.add("habit-not-done");
    event.currentTarget.classList.remove("habit-done");
  } else if (event.currentTarget.classList.value.includes("habit-not-done")) {
    event.currentTarget.classList.remove("habit-not-done");
  } else {
    event.currentTarget.classList.add("habit-done");
  }
  // First check if the it contains done or undone
  // if nothing found change it to done
  // if done change it to not done
  // if not done change to nothing

  // Get month and year
  let headerTitle = document.querySelector("#header-title");
  monthName = headerTitle.innerText.split(",")[0];
  year = headerTitle.innerText.split(",")[1];
  month = currentMonth;
  habit = event.currentTarget.classList[0].split("-")[1];
  day = event.currentTarget.classList[1].split("-")[1];
  console.log(habit + " " + day + " " + month + " " + year);
  $.ajax({
    type: "POST",
    url: "/habit/toggleStatus",
    data: {
      habit,
      day,
      month,
      year,
    },
    success: function (response) {
      //Do nothing on success
      //Show error message on failure
    },
  });
};

let newHabitDom = function (habit, daysCount) {
  let newRow = $("<tr>");
  let titleData = $("<td>");
  titleData.text(habit.title);
  newRow.append(titleData);
  titleData[0].addEventListener("click", () => {
    window.location.href = `http://localhost:8000/habit/year-wise/${habit._id}/${currentYear}`;
  });
  titleData.addClass("p-2 habit-title cursor-pointer");
  for (let i = 1; i <= daysCount; i++) {
    let tableCell = $("<td>").addClass(
      `habit-${habit._id} day-${i} day-cell text-light`
    );
    tableCell[0].innerText = i;
    newRow.append(tableCell);
  }
  return newRow;
};

let createHabit = (e) => {
  e.preventDefault();
  let newHabitTitle = $("#habit-title");
  let newHabitForm = {
    title: newHabitTitle.val(),
    // send it via the current year and currenet month
    createdAt: new Date(currentYear, currentMonth, 1).toISOString(),
  };

  console.log(new Date().toISOString());
  $.ajax({
    type: "post",
    url: "/habit/create",
    data: { data: JSON.stringify(newHabitForm) },
    success: function (data) {
      console.log("Success");
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
      //   Adding Listners to toggle dates
      console.log(newHabitDOM.find(".day-cell").click(addToggleStatus));

      //   newHabitDOM.find(".day-cell").forEach((cell) => {
      //     cell.click(addListnerToCreatedHabit);
      //   });

      let calendarTable = $("#calender-table");
      console.log(calendarTable);
      calendarTable.find("tbody").append(newHabitDOM);

      //   new_taskDOM
      //     .find(".delete-button")
      //     .get(0)
      //     .addEventListener("click", deleteTaskListner);
      // Added to DOM

      // reseting the create task form
    },
    error: {
      function(err) {
        console.log(err);
      },
    },
  });
};

let form = document.querySelector("#create-habit-form");
form.addEventListener("submit", createHabit);
