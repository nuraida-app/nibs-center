import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-exam",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { exam_name, subject_id, teacher_id, time, pg, essay, grade_id } =
        req.body;

      const checking = await client.query(
        "SELECT * FROM  exams WHERE exam_name = $1",
        [exam_name]
      );

      if (checking.lenght > 0) {
        return res.status(500).json({ message: "Exam name is already used" });
      } else {
        const data = await client.query(
          "INSERT INTO exams (exam_name, subject_id, teacher_id, time, pg, essay, grade_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [exam_name, subject_id, teacher_id, time, pg, essay, grade_id]
        );

        const exam = data.rows[0];

        if (exam) {
          res.status(200).json({ message: "Exam is added", exam });
        } else {
          return res.status(500).json({ message: "Exam is not added" });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET EXAMS
router.get(
  "/show-exams",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT exams._id, exams.exam_name, users.name, subject.subject, exams.time, exams.pg, exams.essay, exams.status, grades.grade, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.exam_id = exams._id AND questions.quiz_type = 1) AS type_1, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.exam_id = exams._id AND questions.quiz_type = 2) AS type_2 " +
          "FROM exams " +
          "INNER JOIN users ON exams.teacher_id = users._id " +
          "INNER JOIN subject ON exams.subject_id = subject.subject_id " +
          "INNER JOIN grades ON exams.grade_id = grades.grade_id " +
          "ORDER BY exams.exam_name ASC"
      );

      const exams = data.rows;

      if (exams) {
        res.status(200).json(exams);
      } else {
        return res.status(404).json({ message: "Exams are not available" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET EXAMS BY GRADE
router.get(
  "/show-exams-by-grade/:grade",
  authenticatedUser,
  authorizeRoles("admin", "student"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT exams.exam_name, users.name, subject.subject, exams.time, exams.pg, exams.essay, exams.status, grades.grade FROM exams  INNER JOIN users ON exams.teacher_id = users._id INNER JOIN subject ON exams.subject_id = subject.subject_id INNER JOIN grades ON exams.grade_id = grades.grade_id WHERE exams.grade_id = $1  ORDER BY exams.exam_name ASC",
        [req.params.grade]
      );

      const exams = data.rows;

      if (exams) {
        return res.status(200).json(exams);
      } else {
        return res.status(404).json({ message: "Exams are not available" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
