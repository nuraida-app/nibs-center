import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ROOMS
router.get(
  "/get-rooms",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const admin = req.user.role === "admin"; // Menentukan apakah pengguna adalah admin
      if (admin) {
        const data = await client.query(
          "SELECT exam_rooms.name AS room_name, exam_rooms.description, exam_rooms.code, grades.grade, " +
            "users.name AS teacher_name, exams.exam_name, exam_rooms.status, exam_rooms.date_start, exam_rooms.time_start " +
            "FROM exam_rooms " +
            "INNER JOIN users ON exam_rooms.teacher_id = users._id " +
            "INNER JOIN exams ON exam_rooms.exam_id = exams._id " +
            "INNER JOIN grades on exams.grade_id = grades.grade_id"
        );

        const rooms = data.rows;

        return res.status(200).json(rooms);
      } else {
        const data = await client.query(
          "SELECT exam_rooms.name AS room_name, exams.exam_name, grades.grade, exam_rooms.status, exam_rooms.code " +
            "FROM exam_rooms " +
            "INNER JOIN exams ON exam_rooms.exam_id = exams._id " +
            "INNER JOIN grades ON exams.grade_id = grades._id " +
            "WHERE exam_rooms.teacher_id = $1 ORDER BY exam_rooms.name ASC",
          [req.user._id]
        );

        const rooms = data.rows;
        return res.status(200).json(rooms);
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
  }
);

// GENERATE CODE
function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  // Menambahkan 2 huruf pertama
  for (let i = 0; i < 2; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Menambahkan 2 angka
  for (let i = 0; i < 2; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Menambahkan 2 huruf terakhir
  for (let i = 0; i < 2; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return code;
}

// CREATE ROOM
router.post(
  "/create-room",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { name, description, teacher_id, exam_id, date_start, time_start } =
        req.body;

      const checking = await client.query(
        "SELECT * FROM  exam_rooms WHERE name = $1",
        [name]
      );

      const code = generateCode();

      if (checking.lenght > 0) {
        return res.status(500).json({ message: "Room name is already used" });
      } else {
        const data = await client.query(
          "INSERT INTO exam_rooms (name, description, code, teacher_id, exam_id, date_start, time_start) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [name, description, code, teacher_id, exam_id, date_start, time_start]
        );

        const exam = data.rows[0];

        if (exam) {
          res.status(200).json({ message: "Room is added", exam });
        } else {
          return res.status(500).json({ message: "Room is not added" });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

//DETAIL ROOM
router.get(
  "/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT exam_rooms.name AS room_name, exam_rooms.description, exam_rooms.code, grades.grade, " +
          "users.name AS teacher_name, exams.exam_name, exam_rooms.status, exam_rooms.date_start, exam_rooms.time_start " +
          "FROM exam_rooms " +
          "INNER JOIN users ON exam_rooms.teacher_id = users._id " +
          "INNER JOIN exams ON exam_rooms.exam_id = exams._id " +
          "INNER JOIN grades on exams.grade_id = grades.grade_id " +
          "WHERE exam_rooms.id = $1",
        [req.params.id]
      );

      const room = data.rows[0];

      res.status(200).json(room);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// DELETE ROOM
router.delete(
  "/delete-room/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const process = await client.query(
        "DELETE FROM exam_rooms where id = $1",
        [req.params.id]
      );

      res.status(200).json({ message: "Data has been deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/update-room/:id",
  authenticatedUser,
  authorizeRoles("admin", "teaher"),
  async (req, res) => {
    try {
      const { name, description, teacher_id, exam_id, date_start, time_start } =
        req.body;

      const data = await client.query(
        "UPDATE exam_rooms SET name = $1, description = $2, teacher_id = $3, exam_id = $4, date_start = $5, time_start = $6 " +
          "WHERE id = $7 RETURNING *",
        [name, description, teacher_id, exam_id, date_start, time_start]
      );

      if (data.rowCount > 0) {
        res.status(200).json({ message: "Schedule has been updated" });
      } else {
        res.status(404).json({ message: "Data is not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
