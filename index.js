// Express
const express = require("express");
const port = 8000;
const app = express();

// Using layouts
const expressLayouts = require("express-ejs-layouts");

// Database Connection
const db_connection = require("./config/mongoose");

//Seting directory for  static files
app.use(express.static("./static"));

// Using Layouts
app.use(expressLayouts);

// Extarct styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting views
app.set("view engine", "ejs");
app.set("views", "./views");

// Parsers
app.use(express.urlencoded());
app.use(express.json());

// Routes
app.use("/", require("./routes"));

process.env.TZ = "Asia/Calcutta";
// Server
app.listen(port, function (err) {
  if (err) {
    console.log(`Server Failed to start . Error Encountered : ${err} `);
    return;
  }

  console.log(`Server started succesfully`);
});
