const mongoose = require("mongoose");
const moment = require("moment-timezone");

const schema = new mongoose.Schema({}, { collection: "sentences" });

schema.statics.find = async function (query) {
  const docs = await this.aggregate([
    {
      $match: query,
    },
  ]);

  return docs;
};

schema.statics.findOne = async function (query) {
  const docs = await this.aggregate([
    {
      $match: query,
    },
  ]);

  return docs[0];
};

module.exports = mongoose.model("sentences", schema);
