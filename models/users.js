// const mongoose = require("mongoose");
// const moment = require("moment-timezone");

// const schema = new mongoose.Schema({}, { collection: "users" });

// //월별 가입한 유저 수
// schema.statics.findMonthCount = async function (year, month) {
//   // 1. 입력받는 month의 첫번째 날짜와 마지막 날짜를 구한다.
//   const monthDate = moment()
//     .year(year)
//     .month(month - 1); // 입력받은 month
//   const monthStart = monthDate.clone().startOf("month"); // 입력받은 month의 첫번째 날짜
//   const monthEnd = monthDate.clone().endOf("month"); // 입력받은 month의 마지막 날짜

//   const docs = await this.aggregate([
//     {
//       $match: {
//         createdAt: {
//           $gte: new Date(monthStart.format()),
//           $lt: new Date(monthEnd.format()),
//         },
//         email: {
//           $nin: [
//             "letrworks@gmail.com",
//             "dylee@twigfarm.net",
//             "kha3017@hotmail.com",
//             "0613sue@naver.com",
//             "nocliche@gmail.com",
//             "seoksik.twigfarm@gmail.com",
//             "sskim.twigfarm@gmail.com",
//             "sskim.twigfarm.test@gmail.com",
//             "sskim.twigfarm.test1@gmail.com",
//             "tjddls4232@naver.com",
//             "hongsungin92@gmail.com",
//             "letrworks02@gmail.com",
//             "letrworks11@gmail.com",
//             "nia3.twigfarm@gmail.com",
//             "joseph.lee@twigfarm.co",
//             "taehoon.kwon@twigfarm.net",
//             "hello@gconstudio.com",
//             "sungin.hong@twigfarm.net",
//             "bom1564@gmail.com",
//           ],
//         },
//       },
//     },
//     { $sort: { createdAt: -1 } },
//     // {
//     //   $group: {
//     //     _id: {
//     //       year: { $year: "$createdAt" },
//     //       month: { $month: "$createdAt" },
//     //     },
//     //     count: { $sum: 1 },
//     //   },
//     // },
//   ]);

//   return { docs, monthStart: monthStart.format(), monthEnd: monthEnd.format() };
// };

// module.exports = mongoose.model("Users", schema);
