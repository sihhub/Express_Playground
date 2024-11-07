// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const webPush = require("web-push");

// const WebpushSubscriptions = require("../models/webpush.subscriptions");

// const router = express.Router();

// webPush.setVapidDetails("mailto:example@domain.com", process.env.WEB_PUSH_VAPID_PUBLIC_KEY_DEV, process.env.WEB_PUSH_VAPID_PRIVATE_KEY_DEV);

// // VAPID 키를 생성하여 응답
// router.get("/generate-vapid-keys", (req, res) => {
//   const vapidKeys = webPush.generateVAPIDKeys();
//   res.json(vapidKeys);
// });

// router.get("/send-notifications", async (req, res) => {
//   try {
//     const subscriptions = await WebpushSubscriptions.find({});

//     console.log("Subscriptions:", subscriptions);

//     const payload = JSON.stringify({
//       title: "New Notification",
//       body: "Hello from web push!",
//     });
//     subscriptions.forEach((subscription) => {
//       const pushSubscription = {
//         endpoint: subscription.endpoint,
//         keys: {
//           auth: subscription.keys.auth,
//           p256dh: subscription.keys.p256dh,
//         },
//       };

//       webPush.sendNotification(pushSubscription, payload).catch((error) => {
//         console.error("Error sending notification", error);
//       });
//     });

//     res.status(200).send("Notifications sent to all subscribers");
//   } catch (err) {
//     console.error("Error fetching subscriptions:", err);
//     res.status(500).send("Failed to send notifications");
//   }
// });

// module.exports = router;
