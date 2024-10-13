import express from "express";
const student = express.Router();

student.get("/", (req, res) => {
    res.send("I'm a student!")
});

export default student;