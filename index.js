// index.js
const express = require("express");
const app = express();
const port = 3000;

// routes 폴더에서 라우트 가져오기
const indexRouter = require("./routes/index");
const webPushRouter = require("./routes/web-push");

app.use("/", indexRouter); // 기본 경로로 indexRouter 사용
app.use("/web-push", webPushRouter); // /web-push 경로로 webPushRouter 사용

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//
