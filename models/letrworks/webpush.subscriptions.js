const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { collection: "webpush.subscriptions" });

module.exports = mongoose.model("webpush.subscriptions", schema);
