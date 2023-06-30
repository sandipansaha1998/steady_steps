# steady_steps
> Habit tracker web applicaiton.Users can create a habit to track its progress and visualise it through simple bar chart.Users can track their longest streak for a particular habit

## [Hosted URL link](https://the-memory-lane.netlify.app/)

### Features
- [x] Create a new habit to be tracked
- [x] Calendar view for a month where users can track habit completion status.
- [x] Longest Streak

### Dependencies
Particulars | Version
----------- | ---------
"ejs" | "3.1.9"
"express" | "4.18.2"
"express-ejs-layouts" | "2.5.1"
"moment" | "2.29.4"
"mongoose" | "7.2.3"
"nodemon" | "2.0.22"

### Directory Structure
```
.
├── config
│   └── mongoose.js
├── controllers
│   ├── habitController.js
│   └── homeController.js
├── frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
├── index.js
├── models
│   └── habit.js
├── package-lock.json
├── package.json
├── routes
│   ├── habit.js
│   └── index.js
├── static
│   ├── css
│   │   └── home.css
│   └── js
│       ├── addCellListners.js
│       ├── createHabit.js
│       └── setTableHeader.js
└── views
    ├── _createHabit.ejs
    ├── _navbar.ejs
    ├── home.ejs
    ├── layout.ejs
    └── yearlyPerformance.ej
```
