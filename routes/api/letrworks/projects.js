require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const Projects = require("@root/models/letrworks/projects");

const router = express.Router();

router.post("/relation-create", async (req, res) => {
  try {
    const body = req.body;
    console.log("body:", body);

    // const { title, description, relatedProjectIds } = req.body;

    // // 새 프로젝트 생성
    // const newProject = new Project({ title, description, relatedProjects: relatedProjectIds });
    // const savedProject = await newProject.save();

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating project", details: error });
  }
});

module.exports = router;
