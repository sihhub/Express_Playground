const mongoose = require("mongoose");
const moment = require("moment-timezone");

const schema = new mongoose.Schema({}, { collection: "projects" });

// const projects = await Projects.find({
//   title: { $regex: "검수_인생은 아름다워" },
// });

schema.statics.find = async function (query) {
  const docs = await this.aggregate([
    {
      $match: query,
    },
  ]);

  console.log("docs.length:", docs.length);

  return docs;
};

// schema.statics.findAll = async function () {
//   return await this.find({});
// };

// schema.statics.findMonthCount = async function (year, month) {
//   // 1. 입력받는 month의 첫번째 날짜와 마지막 날짜를 구한다.
//   const monthDate = moment()
//     .year(year)
//     .month(month - 1); // 입력받은 month
//   const monthStart = monthDate.clone().startOf("month"); // 입력받은 month의 첫번째 날짜
//   const monthEnd = monthDate.clone().endOf("month"); // 입력받은 month의 마지막 날짜

//   const docs = await this.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "createUserId",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $lookup: {
//         from: "languages",
//         localField: "sourceLanguageCode",
//         foreignField: "_id",
//         as: "sourceLanguage",
//       },
//     },
//     {
//       $lookup: {
//         from: "languages",
//         localField: "targetLanguageCode",
//         foreignField: "_id",
//         as: "targetLanguage",
//       },
//     },
//     {
//       $match: {
//         createdAt: {
//           $gte: new Date(monthStart.format()),
//           $lt: new Date(monthEnd.format()),
//         },
//         "user.email": {
//           $nin: [
//           ],
//         },
//       },
//     },
//     {
//       $addFields: {
//         sourceLanguageName: {
//           $arrayElemAt: ["$sourceLanguage.name", 0],
//         },
//         targetLanguageName: {
//           $arrayElemAt: ["$targetLanguage.name", 0],
//         },
//       },
//     },
//     { $unset: ["sourceLanguage", "targetLanguage", "user"] },
//   ]);

//   return {
//     docs,
//     startDate: monthStart.format(),
//     endDate: monthEnd.format(),
//   };
// };

// schema.statics.findWeekCount = async function (year, week) {
//   // year, week를 입력받아서 해당 week의 첫번째 날짜와 마지막 날짜를 구한다.

//   // 1. 입력받은 week의 첫번째 날짜와 마지막 날짜를 구한다.
//   const weekDate = moment().year(year).week(week); // 입력받은 week
//   const weekStart = weekDate.clone().startOf("week"); // 입력받은 week의 첫번째 날짜 (일요일)
//   const weekEnd = weekDate.clone().endOf("week"); // 입력받은 week의 마지막 날짜  (토요일)

//   const docs = await this.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "createUserId",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $lookup: {
//         from: "groups",
//         localField: "groupId",
//         foreignField: "_id",
//         as: "group",
//       },
//     },
//     {
//       $lookup: {
//         from: "languages",
//         localField: "sourceLanguageCode",
//         foreignField: "_id",
//         as: "sourceLanguage",
//       },
//     },
//     {
//       $lookup: {
//         from: "languages",
//         localField: "targetLanguageCode",
//         foreignField: "_id",
//         as: "targetLanguage",
//       },
//     },
//     {
//       $match: {
//         createdAt: {
//           $gte: new Date(weekStart.format()),
//           $lt: new Date(weekEnd.format()),
//         },
//         "user.email": {
//           $nin: [
//           ],
//         },
//       },
//     },
//     {
//       $addFields: {
//         userEmail: {
//           $arrayElemAt: ["$user.email", 0],
//         },
//         groupName: {
//           $arrayElemAt: ["$group.name", 0],
//         },
//         sourceLanguageName: {
//           $arrayElemAt: ["$sourceLanguage.name", 0],
//         },
//         targetLanguageName: {
//           $arrayElemAt: ["$targetLanguage.name", 0],
//         },
//       },
//     },
//     { $unset: ["user", "group", "sourceLanguage", "targetLanguage"] },
//     { $sort: { resourceType: -1, type: -1, createUserId: -1 } },
//   ]);

//   return {
//     docs,
//     startDate: weekStart.format(),
//     endDate: weekEnd.format(),
//   };
// };

module.exports = mongoose.model("projects", schema);
