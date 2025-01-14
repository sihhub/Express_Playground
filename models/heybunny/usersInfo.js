const mongoose = require("mongoose");
const moment = require("moment-timezone");

const schema = new mongoose.Schema({}, { collection: "users.info" });

schema.statics.find = async function (query) {
  const docs = await this.aggregate([
    {
      $match: query,
    },
  ]);

  return docs;
};

// schema.static.updateOne = async function (query, update) {
//   const docs = await this.updateOne(query, update);
//   console.log("updated docs:", docs);
// };

schema.statics.pushMetaGroupId = async function (query, groupId) {
  const result = await this.aggregate([
    { $match: query }, // 조건에 맞는 문서를 찾음
    {
      $set: {
        subscribedMetaGroupIds: {
          $cond: {
            if: { $in: [groupId, "$subscribedMetaGroupIds"] }, // 중복 확인
            then: "$subscribedMetaGroupIds", // 중복이면 기존 배열 유지
            else: { $concatArrays: ["$subscribedMetaGroupIds", [groupId]] }, // 새로운 값 추가
          },
        },
      },
    },
    {
      $merge: { into: "users.info" }, // 변경 사항을 저장
    },
  ]);

  return result;
};

module.exports = mongoose.model("users.info", schema);
