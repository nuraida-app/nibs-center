import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE QUESTION
router.post(
  "/create-quiz",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const {
        exam_id,
        quiz_type,
        quiz,
        answer_1,
        answer_2,
        answer_3,
        answer_4,
        answer_5,
        key,
      } = req.body;

      const audio = "";

      const data = await client.query(
        "INSERT INTO questions (exam_id, quiz_type, quiz, answer_1, answer_2, answer_3, answer_4, answer_5, key) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          exam_id,
          quiz_type,
          quiz,
          answer_1,
          answer_2,
          answer_3,
          answer_4,
          answer_5,
          key,
        ]
      );

      const question = data.rows[0];

      if (question) {
        return res
          .status(200)
          .json({ message: "Question successfully added", question });
      } else {
        return res.status(500).json({ message: "Question failed to be added" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/exam/:exam_id", authenticatedUser, async (req, res) => {
  try {
    const data = await client.query(
      "SELECT * FROM questions WHERE exam_id = $1",
      [req.params.exam_id]
    );

    const questions = data.rows;

    res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post(
  "/upload-quiz",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { id, data } = req.body;

      data.map(async (item) => {
        await client.query(
          "INSERT INTO questions (exam_id, quiz, quiz_type, answer_1, answer_2, answer_3, answer_4, answer_5, key) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [
            id,
            item[0],
            item[1],
            item[2],
            item[3],
            item[4],
            item[5],
            item[6],
            item[7],
          ]
        );
      });

      res
        .status(200)
        .json({ message: `${data.length} questions successfully added` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;