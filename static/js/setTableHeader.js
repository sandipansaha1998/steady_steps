// Function to render the calendar for a given month and year
function renderCalendar(month, year) {
  //

  // Setting Header MONTH and YEAR
  let headerTitle = document.querySelector("#header-title");
  headerTitle.classList.add("container", "text-center", "text-primary");

  // fetches name of the month from monthNames[]
  headerTitle.innerHTML = "<h4>" + monthNames[month] + " , " + year + "</h4>";

  // Setting WEEK DAYS HEADER ROW
  // Calender header
  let calendarTableHeader = document.querySelector("#calender-table thead");

  //   Fetching startind day of the month
  let startingDateofMonth = new Date(year, month, 1);

  let startingDateDayCount = startingDateofMonth.getDay();

  // Creating Week-day header
  let headerRowWeekDay = document.createElement("tr");
  headerRowWeekDay.id = "week-day-row";
  // Habits header title
  let HABITS_HEADER = document.createElement("th");
  HABITS_HEADER.innerText = "Habits";
  HABITS_HEADER.classList.add("p-3");
  headerRowWeekDay.append(HABITS_HEADER);
  // Appending the header row to the calendar header
  calendarTableHeader.append(headerRowWeekDay);

  for (let i = 0; i < daysInMonth[month]; i++) {
    let headerCell = document.createElement("th");
    headerCell.classList.add("p-1");
    // Adding week day name to the table header
    headerCell.textContent = dayNames[startingDateDayCount++ % 7];
    headerRowWeekDay.appendChild(headerCell);
  }

  // Setting Month day header
  let headerRowMonthDay = document.createElement("tr");
  headerRowMonthDay.id = "#month-day-row";

  let emptyCell = document.createElement("th");
  headerRowMonthDay.append(emptyCell);

  for (let col = 1; col <= daysInMonth[month]; col++) {
    let headerCell = document.createElement("th");
    headerCell.classList.add("py-4", "fs-5");
    // Adding month day number to the table header
    headerCell.textContent = col;
    // Marking Current date
    if (
      col === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      headerCell.className = "current-day";
      headerCell.classList.add(
        "border",
        "border-2",
        "border-dark",
        "text-danger",
        "fs-3"
      );
    }
    calendarTableHeader.append(headerRowMonthDay);
    headerRowMonthDay.appendChild(headerCell);
  }
  let tableBody = document.querySelector("#calender-table tbody");

  // Fetches habtis for Month view
  $.get(`/habit/${year}/${month}`, (data) => {
    habits = data.habits;
    habits.forEach((habit) => {
      let habitRow = createHabitRow(habit, year, month, daysInMonth[month]);
      tableBody.append(habitRow);
    });
    // Adding ClickListners and setting cells status
    setClickListners();
    setCellStatus(habits, year, month, daysInMonth[month]);
  });
}
function createHabitRow(habit, year, month, dayCount) {
  // Creates and returns habit row to be appended to  DOM

  // Creates a new DOM node tr
  let habitRow = document.createElement("tr");

  // Habit Title
  let HABIT_TITLE = document.createElement("td");
  HABIT_TITLE.classList.add("p-2", "habit-title", "cursor-pointer");
  HABIT_TITLE.innerText = habit.title;
  HABIT_TITLE.addEventListener("click", () => {
    window.location.href = `http://localhost:8000/habit/year-wise/${habit._id}/${year}`;
  });
  habitRow.append(HABIT_TITLE);

  // Creating new cells
  for (let i = 1; i <= dayCount; i++) {
    let dayCell = document.createElement("td");
    dayCell.innerText = i;
    dayCell.classList.add(`habit-${habit._id}`, `day-${i}`, `day-cell`);
    // Marking the status
    if (habit.done.some((doneDate) => +doneDate === +new Date(2023, 5, i)))
      dayCell.class.add(`habit-done`);
    else if (
      habit.notDone.some(
        (notDoneDate) => +notDoneDate === +new Date(2023, 5, i)
      )
    ) {
      dayCell.class.add(`habit-not-done`);
    }
    habitRow.append(dayCell);
  }
  return habitRow;
}

// Month names array
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Day names array
let dayNames = ["S", "M", "T", "W", "T", "F", "S"];

// Days in each month
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Get current date
let currentDate = new Date();

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

//  Render current month calendar on page load
renderCalendar(currentDate.getMonth(), currentDate.getFullYear());

// Adding Listners to Toggle month button
let prevButton = document.querySelector("#prevButton");
let nextButton = document.querySelector("#nextButton");

prevButton.addEventListener("click", function () {
  // Cleared the previous table
  document.querySelector("#calender-table thead").innerHTML = "";
  document.querySelector("#calender-table tbody").innerHTML = "";

  // Setting the month
  currentMonth--;
  if (currentMonth === -1) currentYear--;
  let monthTobeRendered = currentMonth % 12;

  if (monthTobeRendered < 0) monthTobeRendered += 12;
  currentMonth = monthTobeRendered;
  renderCalendar(monthTobeRendered, currentYear);
});

nextButton.addEventListener("click", function () {
  // Cleared the previous table
  document.querySelector("#calender-table thead").innerHTML = "";
  document.querySelector("#calender-table tbody").innerHTML = "";
  // Setting the month
  if (currentMonth === 11) currentYear++;
  currentMonth++;
  let monthTobeRendered = currentMonth % 12;

  currentMonth = monthTobeRendered;

  renderCalendar(monthTobeRendered, currentYear);
});
