import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

function countAnswerByStudentId(quiz, answers, exam) {
  let studentScores = [];

  // Mendapatkan bobot untuk setiap jenis soal
  const maxScore = 100;
  const mcqWeight = (exam.pg / 100) * maxScore; // Bobot untuk pilihan ganda
  const quizCount = quiz.filter((item) => item.quiz_type === 1).length;

  // Iterasi melalui setiap jawaban dalam array answers
  answers.forEach((answer) => {
    // Temukan pertanyaan (quiz) yang sesuai dengan id quiz_id pada jawaban
    const correspondingQuiz = quiz.find(
      (quizItem) => quizItem._id === answer.quiz_id
    );

    // Jika ada pertanyaan yang sesuai
    if (correspondingQuiz) {
      const studentId = answer.nis;
      // Temukan indeks siswa jika sudah ada dalam array studentScores
      const studentIndex = studentScores.findIndex(
        (student) => student.nis === studentId
      );

      // Jika studentId belum ada dalam array studentScores, tambahkan
      if (studentIndex === -1) {
        studentScores.push({
          nis: studentId,
          correct_answer: 0,
          wrong_answer: 0,
          mcScore: 0,
          essayScore: 0,
          totalScore: 0,
        });
      }

      const student = studentScores.find(
        (student) => student.nis === studentId
      );

      // Periksa jenis soal
      if (correspondingQuiz.quiz_type === 1) {
        // Multiple Choice
        // Periksa apakah jawaban siswa sama dengan kunci jawaban
        if (answer.mc === correspondingQuiz.key) {
          // Jika sama, tambahkan ke jumlah jawaban benar
          student.correct_answer++;
        } else {
          // Jika tidak, tambahkan ke jumlah jawaban salah
          student.wrong_answer++;
        }
      } else if (correspondingQuiz.quiz_type === 2) {
        // Essay
        // Tambahkan skor Essay
        student.essayScore += (answer.answer_score || 0) * (exam.essay / 100);
      }

      // Menghitung mcScore
      // Jumlah jawaban benar pada pilihan ganda
      const correctMCQ = student.correct_answer;
      // Menghitung persentase jawaban benar dari total soal pilihan ganda dan dikalikan dengan bobot
      student.mcScore = (correctMCQ / quizCount) * mcqWeight;

      // Hitung total skor
      student.totalScore = student.mcScore + student.essayScore;
    }
  });

  return studentScores;
}

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

// CREATE ANSWER
router.post(
  "/create-answer",
  authenticatedUser,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const { exam_id, quiz_id, quiz_type, mc, essay } = req.body;

      // Check if answer already exists for given exam_id, quiz_id, and user (nis)
      const existingAnswer = await client.query(
        "SELECT * FROM answers WHERE exam_id = $1 AND quiz_id = $2 AND nis = $3",
        [exam_id, quiz_id, req.user.nis]
      );

      if (existingAnswer.rows.length > 0) {
        // If an answer already exists, delete it first
        await client.query(
          "DELETE FROM answers WHERE exam_id = $1 AND quiz_id = $2 AND nis = $3",
          [exam_id, quiz_id, req.user.nis]
        );
      }

      // Insert the new answer
      const data = await client.query(
        "INSERT INTO answers (exam_id, quiz_id, quiz_type, nis, mc, essay) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [exam_id, quiz_id, quiz_type, req.user.nis, mc, essay]
      );

      const new_answer = data.rows[0];

      if (new_answer) {
        return res.status(200).json({ message: "Saved", new_answer });
      } else {
        return res.status(500).json({ message: "Not Saved" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENTS ANSWER BY EXAM AND NIS
// Student
router.get(
  "/get-my-answer/:exam_id",
  authenticatedUser,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM answers WHERE exam_id = $1 AND nis = $2",
        [req.params.exam_id, req.user.nis]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENTS ANSWER BY EXAM
// Teacher and admin
router.get(
  "/students-answers/:examId",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM answers WHERE exam_id = $1",
        [req.params.examId]
      );

      res.status(200).json(data.rows);
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
        "SELECT users._id, users.name, questions.quiz, answers.quiz_id, answers.essay, answers.answer_score FROM answers INNER JOIN users ON answers.student_id = users._id INNER JOIN questions ON answers.quiz_id = questions._id WHERE questions.exam_id = $1",
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

// UPDATE ANSWER FOR GIVING ESSAY SCORE
router.put(
  "/update-answer-score/:answerId",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      // Mengonversi nilai score ke integer
      const score = parseInt(req.body.score);

      // Validasi bahwa score adalah integer
      if (isNaN(score)) {
        return res
          .status(400)
          .json({ error: "Skor harus berupa bilangan bulat." });
      }

      const answer = await client.query(
        "SELECT * FROM answers WHERE _id = $1",
        [req.params.answerId]
      );

      if (answer.rows.length === 0) {
        return res.status(404).json({ error: "Jawaban tidak ditemukan." });
      }

      await client.query(
        "UPDATE answers SET answer_score = $1 WHERE _id = $2",
        [score, req.params.answerId]
      );

      // Kembalikan respons berhasil
      return res.status(200).json({ message: "Berhasil disimpan." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
