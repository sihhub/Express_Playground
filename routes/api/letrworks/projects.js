require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const Projects = require("@root/models/letrworks/projects");

const router = express.Router();

const letrWorksApi = axios.create({
  baseURL: process.env.LETR_WORKS_API_URL_PROD,
  headers: {
    Authorization: `Bearer ${process.env.LETR_WORKS_API_ADMIN_TOKEN_PROD}`,
  },
});

router.post("/relation-create", async (req, res) => {
  try {
    // const body = req.body;
    // console.log("body:", body);

    // const { title, description, relatedProjectIds } = req.body;

    const body = {
      categoryId: "tech",
      resourceType: "video",
      sourceLanguageCode: "ko",
      targetLanguageCode: "en",
      type: "translation",
      groupId: "646ec1290ffd0e32fe152526", //SBS_트위그팜
      endDate: "2024-11-21T13:58:48+09:00",
      startDate: "2024-11-07T13:58:48+09:00",
      note: "",
      title: "",
      parentProjectId: "",
      characterRule: {
        doubleByte: 1,
        latin: 0.5,
        special: 0.5,
      },
      videoRule: {
        displayDuration: {
          max: 7000,
          min: 100,
        },
        maxCharacters: 16,
        maxLines: 2,
        minGap: 80,
      },
      tm_tb_ids: {
        speaker_tb_id: "",
        tm_id: "",
        tb_id: "",
      },
      options: {
        is_dubbing: false,
      },
    };

    //mongodb에서 프로젝트 가져오기
    //title $regex: $regex:"검수_인생은 아름다워"

    const projects = await Projects.find({
      title: { $regex: "검수_달콤한 나의 도시" },
    });

    let okCount = 0;

    for (const project of projects) {
      //title에서 앞에 "검수_"를 제거하고 title에 넣기
      body.title = project.title.replace("검수_", "");
      body.parentProjectId = project._id;

      const response = await letrWorksApi.post("/projects", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      okCount++;
      console.log("title:", body.title);
      console.log("okCount:", okCount);
    }

    res.status(201).json({ message: "Project created successfully", okCount });
  } catch (error) {
    res.status(500).json({ error: "Error creating project", details: error });
  }
});

module.exports = router;
