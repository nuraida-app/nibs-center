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
      const { exam_name, teacher_id, time, pg, essay, grade_id } = req.body;

      const checking = await client.query(
        "SELECT * FROM  exams WHERE exam_name = $1",
        [exam_name]
      );

      if (checking.lenght > 0) {
        return res.status(500).json({ message: "Exam name is already used" });
      } else {
        const data = await client.query(
          "INSERT INTO exams (exam_name, teacher_id, time, pg, essay, grade_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [exam_name, teacher_id, time, pg, essay, grade_id]
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
        "SELECT exams._id, exams.exam_name, exams.teacher_id, users.name, exams.time, " +
          "exams.pg, exams.essay, exams.status, exams.grade_id, grades.grade, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.exam_id = exams._id AND questions.quiz_type = 1) AS type_1, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.exam_id = exams._id AND questions.quiz_type = 2) AS type_2 " +
          "FROM exams " +
          "INNER JOIN users ON exams.teacher_id = users._id " +
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
      console.log(error);
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
        "SELECT exams._id, exams.exam_name, users.name, exams.time, exams.pg, exam_rooms.date_start, " +
          "exams.essay, exams.status, grades.grade, exam_rooms.code FROM exams  " +
          "INNER JOIN users ON exams.teacher_id = users._id " +
          "INNER JOIN grades ON exams.grade_id = grades.grade_id " +
          "INNER JOIN exam_rooms ON exam_rooms.exam_id = exams._id " +
          "WHERE exams.grade_id = $1  ORDER BY exams.exam_name ASC",
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

// GET EXAM DETAIL WITH QUESTIONS
router.get(
  "/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher", "student"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT exams.exam_name, exams.time, exams.pg, exams.essay, " +
          "questions._id, questions.exam_id, questions.quiz_type, questions.quiz, questions.img, questions.audio, " +
          "questions.answer_1, questions.answer_2, questions.answer_3, questions.answer_4, questions.answer_5, questions.key " +
          "FROM exams LEFT JOIN questions ON exams._id = questions.exam_id WHERE exams._id = $1",
        [req.params.id]
      );

      const exam = {
        exam_name: data.rows[0].exam_name,
        time: data.rows[0].time,
        pg: data.rows[0].pg,
        essay: data.rows[0].essay,
        questions: data.rows.map((row) => ({
          _id: row._id,
          exam_id: row.exam_id,
          quiz_type: row.quiz_type,
          quiz: row.quiz,
          img: row.img,
          audio: row.audio,
          answer_1: row.answer_1,
          answer_2: row.answer_2,
          answer_3: row.answer_3,
          answer_4: row.answer_4,
          answer_5: row.answer_5,
          key: row.key,
        })),
      };

      res.status(200).json(exam);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET DETAIL EXAM
router.get(
  "/detail-exam/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT exams._id FROM exams where _id = $1",
        [req.params.id]
      );

      const exam = data.rows[0];

      if (!exam) {
        return res.status(404).json({ message: "Exam is not available" });
      }

      res.status(200).json(exam);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// UPDATE EXAM
router.put(
  `/update-exam/:id`,
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { exam_name, teacher_id, time, pg, essay, grade_id } = req.body;

      const process = await client.query(
        "UPDATE exams SET exam_name = $1, teacher_id = $2, " +
          "time = $3, pg = $4, essay = $5, grade_id = $6 WHERE _id = $7 RETURNING *",
        [exam_name, teacher_id, time, pg, essay, grade_id, req.params.id]
      );

      if (process.rowCount > 0) {
        res.status(200).json({ message: "Data has been updated" });
      } else {
        res.status(404).json({ message: "Data is not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// DELETE EXAM
router.delete(
  "/delete-exam/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "DELETE FROM exams WHERE _id = $1 RETURNING *",
        [req.params.id]
      );

      const delQuestion = await client.query(
        "DELETE FROM questions WHERE exam_id = $1 RETURNING *",
        [req.params.id]
      );

      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Data is not found" });
      }

      res.status(200).json({
        message: `Exam and ${delQuestion.rows.length} questions  have been deleted`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
