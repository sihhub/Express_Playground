require("dotenv").config();
const express = require("express");

const Sentences = require("@root/models/letrworks/sentences");

const router = express.Router();

router.get("/find-one", async (req, res) => {
  const sentences = await Sentences.find({
    "_id.translation_id": "7955a63a-2140-4777-9482-7f0a67bc4857",
  });

  console.log("sentences:", sentences);

  const sentence = sentences.find((item) => {
    //"나를 알다니" 라는 텍스트가 있는 문장을 찾는다.
    return item.tgt.includes("##감사##");
  });

  console.log("sentence:", sentence);

  res.status(200).json({ message: "Success" });
});

module.exports = router;
