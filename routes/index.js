// routes/index.js
const express = require("express");
const router = express.Router();

// 기본 경로
router.get("/", (req, res) => {
  res.send("Hello from the routes!");
});

module.exports = router;
