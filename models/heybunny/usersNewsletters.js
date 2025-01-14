const mongoose = require("mongoose");
const moment = require("moment-timezone");

const schema = new mongoose.Schema({}, { collection: "users.newsletters" });

// schema.statics.find = async function (query) {};

schema.statics.findSubscribeEmailsByMetadataId = async function (metadataId) {
  const docs = await this.aggregate([
    {
      $match: {
        newslettersMetadataId: metadataId,
      },
    },
  ]);

  //반복되는 데이터 제거
  const uniqueDocs = docs.filter(
    (doc, index, self) =>
      self.findIndex((t) => t.subscribeEmail === doc.subscribeEmail) === index
  );

  const subEmails = uniqueDocs.map((doc) => doc.subscribeEmail);

  console.log("emails:", subEmails);

  return subEmails;
};

module.exports = mongoose.model("users.newsletters", schema);
