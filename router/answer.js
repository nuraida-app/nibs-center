import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

function countAnswerByStudentId(quiz, answers, exam) {
  let studentScores = {};

  // Mendapatkan bobot untuk setiap jenis soal
  const maxScore = 100;
  const mcqWeight = (exam.pg / 100) * maxScore; // Bobot untuk pilihan ganda
  const quizCount = quiz.filter((item) => item.quiz_type === 1).length;

  // Iterasi melalui setiap jawaban dalam array answers
  answers.forEach((answer) => {
    // Temukan pertanyaan (quiz) yang sesuai dengan id quiz_id pada jawaban
    const correspondingQuiz = quiz.find(
      (quizItem) => quizItem._id === answer.quiz_id && quizItem.quiz_type === 1
    );

    // Jika ada pertanyaan yang sesuai
    if (correspondingQuiz) {
      const studentId = answer.student_id;
      // Jika studentId belum ada dalam objek studentScores, inisialisasi dengan nilai awal
      if (!studentScores[studentId]) {
        studentScores[studentId] = {
          student_id: studentId,
          score: 0,
          correct_answer: 0,
          wrong_answer: 0,
        };
      }

      // Periksa apakah jawaban siswa sama dengan kunci jawaban
      if (answer.answer === correspondingQuiz.key) {
        // Jika sama, tambahkan ke jumlah jawaban benar
        studentScores[studentId].correct_answer++;
      } else {
        // Jika tidak, tambahkan ke jumlah jawaban salah
        studentScores[studentId].wrong_answer++;
      }
    }
  });

  // Menghitung skor untuk jawaban pilihan ganda
  Object.values(studentScores).forEach((student) => {
    student.score += (student.correct_answer / quizCount) * mcqWeight;
    // Menggunakan toFixed(2) untuk membulatkan skor menjadi 2 digit di belakang koma
    student.score = parseFloat(student.score.toFixed(2));
  });

  // Menghitung skor untuk jawaban esai
  // Anda perlu menambahkan logika di sini untuk memperoleh skor jawaban esai dan menambahkannya ke skor siswa

  return Object.values(studentScores);
}

// CREATE ANSWER
router.post(
  "/create-answer",
  authenticatedUser,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const { exam_id, quiz_id, answer, answer_essay } = req.body;

      const data = await client.query(
        "INSERT INTO answers (exam_id, quiz_id, student_id, answer, answer_essay) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [exam_id, quiz_id, req.user._id, answer, answer_essay]
      );

      const new_answer = data.rows[0];

      if (new_answer) {
        return res.status(200).json({ message: "Saved", new_answer });
      } else {
        return res.status(500).json({ message: "Not Save" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENTS' ESSAY ANSWER
router.get(
  "/get-essay-answer/:exam_id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const answers_data = await client.query(
        "SELECT users._id, users.name, questions.quiz, answers.quiz_id, answers.answer_essay, answers.answer_score FROM answers INNER JOIN users ON answers.student_id = users._id INNER JOIN questions ON answers.quiz_id = questions._id WHERE questions.exam_id = $1",
        [req.params.exam_id]
      );

      const answer_result = answers_data.rows;

      const quiz_data = await client.query(
        "SELECT * FROM questions WHERE exam_id = $1",
        [req.params.exam_id]
      );

      const quiz_result = quiz_data.rows;

      const quizIds = quiz_result
        .filter((quiz) => quiz.quiz_type === 2)
        .map((quiz) => quiz._id);

      const studentAnswers = answer_result.filter((answer) =>
        quizIds.includes(answer.quiz_id)
      );

      res.status(200).json(studentAnswers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENTS' SCORE BASED ON EXAM
router.get(
  "/get-scores/:exam_id",
  authenticatedUser,
  authorizeRoles("admin", "teacher", "student"),
  async (req, res) => {
    try {
      const answer_data = await client.query(
        "SELECT * FROM answers WHERE exam_id = $1",
        [req.params.exam_id]
      );

      const answers = answer_data.rows;

      const question_data = await client.query(
        "SELECT * FROM questions WHERE exam_id = $1",
        [req.params.exam_id]
      );

      const quiz = question_data.rows;

      const find_exam = await client.query(
        "SELECT * FROM exams WHERE _id = $1",
        [req.params.exam_id]
      );

      const exam = find_exam.rows[0];

      const studentScores = countAnswerByStudentId(quiz, answers, exam);

      res.status(200).json(studentScores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
