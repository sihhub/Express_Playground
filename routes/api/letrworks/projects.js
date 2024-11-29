require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const Projects = require("@root/models/letrworks/projects");
const Sentences = require("@root/models/letrworks/sentences");

const router = express.Router();

const letrWorksApi = axios.create({
  baseURL: process.env.LETR_WORKS_API_URL_PROD,
  headers: {
    Authorization: `Bearer ${process.env.LETR_WORKS_API_ADMIN_TOKEN_PROD}`,
  },
});

router.get("/counts", async (req, res) => {
  try {
    const projects = await Projects.find({
      groupId: "66f658272240680008cdab74",

      //10/08 부터 11/20 기간 한국시간
      createdAt: {
        $gte: new Date("2024-10-07T15:00:00.000Z"),
        $lt: new Date("2024-11-20T14:59:59.999Z"),
      },
    });

    console.log("projects.length:", projects.length);

    const items = [];

    let koToEnSrcWordCount = 0;
    let enToLangSrcCharCount = 0;

    // for (let project of projects) {
    //   console.log("project title: ", project.title);
    //   const sentences = await Sentences.find({
    //     "_id.translation_id": project.translationId,
    //   });

    //   let totalSrcCharCount = 0;
    //   let totalSrcWordCount = 0;
    //   let totalTgtCharCount = 0;
    //   let totalTgtWordCount = 0;

    //   for (let sentence of sentences) {
    //     const tgtNoTag = removeHtmlTag(sentence?.tgt || "", ["o"]);
    //     const srcNoTag = removeHtmlTag(sentence?.src || "", ["o"]);
    //     const tgtCharCount = getCharCount(
    //       tgtNoTag,
    //       project?.characterRule?.latin || 1,
    //       project?.characterRule?.doubleByte || 1,
    //       project?.characterRule?.special || 1
    //     );
    //     const srcCharCount = getCharCount(
    //       srcNoTag,
    //       project?.characterRule?.latin || 1,
    //       project?.characterRule?.doubleByte || 1,
    //       project?.characterRule?.special || 1
    //     );

    //     const srcWordCount = getWordCount(srcNoTag);
    //     const tgtWordCount = getWordCount(tgtNoTag);

    //     totalSrcCharCount += srcCharCount;
    //     totalSrcWordCount += srcWordCount;
    //     totalTgtCharCount += tgtCharCount;
    //     totalTgtWordCount += tgtWordCount;

    //     if (
    //       project.sourceLanguageCode === "ko" &&
    //       project.targetLanguageCode === "en"
    //     ) {
    //       koToEnSrcWordCount += srcWordCount;
    //     }

    //     if (project.sourceLanguageCode === "en") {
    //       enToLangSrcCharCount += srcCharCount;
    //     }
    //   }

    //   items.push({
    //     projectId: project._id,
    //     projectTitle: project.title,
    //     srcLangCode: project.sourceLanguageCode,
    //     tgtLangCode: project.targetLanguageCode,
    //     sentencesCount: sentences.length,
    //     totalSrcCharCount,
    //     totalSrcWordCount,
    //     totalTgtCharCount,
    //     totalTgtWordCount,
    //   });
    // }

    console.log("koToEnSrcWordCount:", koToEnSrcWordCount);
    console.log("enToLangSrcCharCount:", enToLangSrcCharCount);
    // JSON 파일로 저장
    // await saveItemsToJson(items);

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error creating project", details: error });
  }
});

// router.post("/relation-create", async (req, res) => {
//   try {
//     // const body = req.body;
//     // console.log("body:", body);

//     // const { title, description, relatedProjectIds } = req.body;

//     const body = {
//       categoryId: "tech",
//       resourceType: "video",
//       sourceLanguageCode: "ko",
//       targetLanguageCode: "en",
//       type: "translation",
//       groupId: "646ec1290ffd0e32fe152526", //SBS_트위그팜
//       endDate: "2024-11-21T13:58:48+09:00",
//       startDate: "2024-11-07T13:58:48+09:00",
//       note: "",
//       title: "",
//       parentProjectId: "",
//       characterRule: {
//         doubleByte: 1,
//         latin: 0.5,
//         special: 0.5,
//       },
//       videoRule: {
//         displayDuration: {
//           max: 7000,
//           min: 100,
//         },
//         maxCharacters: 16,
//         maxLines: 2,
//         minGap: 80,
//       },
//       tm_tb_ids: {
//         speaker_tb_id: "",
//         tm_id: "",
//         tb_id: "",
//       },
//       options: {
//         is_dubbing: false,
//       },
//     };

//     //mongodb에서 프로젝트 가져오기
//     //title $regex: $regex:"검수_인생은 아름다워"

//     const projects = await Projects.find({
//       title: { $regex: "검수_달콤한 나의 도시" },
//     });

//     let okCount = 0;

//     for (const project of projects) {
//       //title에서 앞에 "검수_"를 제거하고 title에 넣기
//       body.title = project.title.replace("검수_", "");
//       body.parentProjectId = project._id;

//       const response = await letrWorksApi.post("/projects", body, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       okCount++;
//       console.log("title:", body.title);
//       console.log("okCount:", okCount);
//     }

//     res.status(201).json({ message: "Project created successfully", okCount });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating project", details: error });
//   }
// });

module.exports = router;

const getWordCount = (text) => {
  return text?.replace(/\n/g, "")?.split(" ").length || 0;
};

const getCharCount = (text, latinRule, doubleByteRule, specialRule) => {
  let charCount = 0;

  for (let i = 0; i < text?.length; i++) {
    const char = text.charAt(i);
    const charCode = text.charCodeAt(i);

    if (/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\s]/.test(char)) {
      // 구두점 및 공백 확인
      charCount += specialRule;
    } else if (charCode > 0x007f) {
      // 2바이트 문자 확인
      charCount += doubleByteRule;
    } else {
      // 라틴 문자 확인
      charCount += latinRule;
    }
  }

  return charCount;
};

const removeHtmlTag = (text, tags) => {
  if (tags?.includes("o")) {
    text = text?.replace(/<o:[^>]+>|<\/o:[^>]+>/g, "");
  }
  return text;
};

async function saveItemsToJson(items) {
  try {
    // JSON 파일로 변환
    const jsonContent = JSON.stringify(items, null, 2);

    // 저장할 파일 경로
    const filePath = path.join(__dirname, "items.json");

    // JSON 파일 생성
    fs.writeFileSync(filePath, jsonContent, "utf8");
    console.log(`JSON 파일이 생성되었습니다: ${filePath}`);
  } catch (error) {
    console.error("JSON 파일 생성 중 오류가 발생했습니다:", error);
  }
}
