const express = require("express");
const webPush = require("web-push");
const router = express.Router();

// VAPID 키를 생성하여 응답
router.get("/generate-vapid-keys", (req, res) => {
  const vapidKeys = webPush.generateVAPIDKeys();
  res.json(vapidKeys);
});

module.exports = router;
