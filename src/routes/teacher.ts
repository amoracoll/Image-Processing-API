import express from "express";
const teacher = express.Router();

teacher.get("/", (req, res) => {
    res.send("I'm a teacher!")
});

export default teacher;