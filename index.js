// index.js
require("module-alias/register");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// routes 폴더에서 라우트 가져오기
const indexRouter = require("./routes/index");
// const webPushRouter = require("./routes/web-push");
const letrworksProjectsRouter = require("./routes/api/letrworks/projects");
const letrworksSentencesRouter = require("./routes/api/letrworks/sentences");
const heybunnyRouter = require("./routes/api/heybunny/index");

const worksMongodbUri = process.env.LETR_WORKS_MONGO_URI_PROD;
const heybunnyMongodbUri = process.env.HEYBUNNY_MONGO_URI_PROD;

// MongoDB 연결
mongoose
  .connect(worksMongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected", worksMongodbUri))
  .catch((error) => console.error("MongoDB connection error:", error));

// mongoose
//   .connect(heybunnyMongodbUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected", heybunnyMongodbUri))
//   .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", indexRouter); // 기본 경로로 indexRouter 사용
app.use("/letrworks/projects", letrworksProjectsRouter); // /letrworks/projects 경로로 letrworksProjectsRouter 사용
// app.use("/letrworks/sentences", letrworksSentencesRouter); // /letrworks/sentences 경로로 letrworksSentencesRouter 사용
// app.use("/web-push", webPushRouter); // /web-push 경로로 webPushRouter 사용
// app.use("/api/heybunny", heybunnyRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//
