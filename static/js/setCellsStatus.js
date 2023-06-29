function createHabitRow(habit, year, month, dayCount) {
  // Request for habits from Server
  // Create cell and set cell status
  // add click listners

  let habitRow = document.createElement("tr");

  let HABIT_TITLE = document.createElement("td");
  HABIT_TITLE.innerText = habit.title;
  habitRow.append(HABIT_TITLE);

  for (let i = 1; i <= dayCount; i++) {
    let dayCell = document.createElement("td");
    dayCell.classList.add(`habit-${habit._id}`, `day-${i}`, `day-cell`);

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
  // find the row associated with habit and then create a date
  // check if done array contains that date
  // check if notDone array contains that date
}

function setCellStatus(habits, year, month, daysCount) {
  console.log("SET CELL STATUS", daysCount);
  habits.forEach((habit) => {
    console.log(habit.notDone[0]);
    console.log(new Date(year, month, 1).toISOString());
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

//  <% for(habit of habits){ %>
//                         <tr>

//                             <td>
//                                 <%= habit.title %>
//                             </td>
//                             <!-- change hard coded month days count -->
//                             <!-- apply classes to td to propagate the event into an API Call -->
//                             <% for(let i=1;i<=30;i++){%>

//                                 <% if (habit.done.some(doneDate=>
//                                     +doneDate === +new Date(2023,5,i) )) { %>

//                                     <td class="habit-<%= habit._id %> day-<%= i %> day-cell habit-done">

//                                     </td>
//                                     <% } else if (habit.notDone.some(notDoneDate=>
//                                         +notDoneDate === +new Date(2023,5,i) )) { %>
//                                         <td class="habit-<%= habit._id %> day-<%= i %> day-cell habit-not-done">
//                                         </td>
//                                         <% } else { %>
//                                             <td class="habit-<%= habit._id %> day-<%= i %> day-cell"></td>
//                                             <% } %>

//                                                 <%}%>

//                         </tr>
//                         <%}%>
