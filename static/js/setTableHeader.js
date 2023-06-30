// Function to render the calendar for a given month
function renderCalendar(month, year) {
  //
  console.log("Calender rendered");

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
        "text-danger"
      );
    }
    calendarTableHeader.append(headerRowMonthDay);
    headerRowMonthDay.appendChild(headerCell);
  }
  let tableBody = document.querySelector("#calender-table tbody");

  // For the first load we will have the ejs variable and habits would not be null

  $.get(`/habit/${year}/${month}`, (data) => {
    habits = data.habits;

    console.log("---habits:", habits);
    habits.forEach((habit) => {
      let habitRow = createHabitRow(habit, year, month, daysInMonth[month]);
      tableBody.append(habitRow);
    });
    setListners();
    // Set cell status of
    setCellStatus(habits, year, month, daysInMonth[month]);
  });
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
//  Render current month calendar on page load
renderCalendar(currentDate.getMonth(), currentDate.getFullYear());

let prevButton = document.querySelector("#prevButton");
let nextButton = document.querySelector("#nextButton");

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
prevButton.addEventListener("click", function () {
  document.querySelector("#calender-table thead").innerHTML = "";
  document.querySelector("#calender-table tbody").innerHTML = "";

  currentMonth--;
  if (currentMonth === -1) currentYear--;
  let monthTobeRendered = currentMonth % 12;

  if (monthTobeRendered < 0) monthTobeRendered += 12;
  currentMonth = monthTobeRendered;
  renderCalendar(monthTobeRendered, currentYear);
});

nextButton.addEventListener("click", function () {
  document.querySelector("#calender-table thead").innerHTML = "";
  document.querySelector("#calender-table tbody").innerHTML = "";

  if (currentMonth === 11) currentYear++;
  currentMonth++;
  let monthTobeRendered = currentMonth % 12;

  currentMonth = monthTobeRendered;

  renderCalendar(monthTobeRendered, currentYear);
});
console.log("Hello");
