function setListners() {
  let cells = document.querySelectorAll(".day-cell");
  console.log(cells.length);
  for (let cell of cells) {
    cell.addEventListener("click", (event) => {
      console.log(event.currentTarget.classList);
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
      // First check if the it contains done or undone
      // if nothing found change it to done
      // if done change it to not done
      // if not done change to nothing

      // Get month and year
      let headerTitle = document.querySelector("#header-title");
      monthName = headerTitle.innerText.split(",")[0];
      year = headerTitle.innerText.split(",")[1];
      month = monthNames.indexOf(monthName);
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
            text: '<i class="fa-solid fa-circle-check me-1"></i>Habit Added',
            type: "error",
            layout: "topCenter",
            timeout: 1500,
          }).show();
        },
      });
    });
  }
}
