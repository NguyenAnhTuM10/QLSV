// routes/students.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const verifyToken = require("../middleware/auth");

// Get all (ai cũng xem được)
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Thêm mới (phải đăng nhập)
router.post("/", verifyToken, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Sửa (phải đăng nhập)
router.put("/:id", verifyToken, async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// Xoá (phải đăng nhập)
router.delete("/:id", verifyToken, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


module.exports = router;
