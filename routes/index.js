const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<div>hello</div>");
});
module.exports = router;
