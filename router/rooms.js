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
        const data = await client.query("SELECT * FROM exam_rooms");

        const rooms = data.rows;
        return res.status(200).json(rooms);
      } else {
        const data = await client.query(
          "SELECT * FROM exam_rooms WHERE teacher_id = $1 ORDER BY name ASC",
          [req.user._id]
        );

        const rooms = data.rows;
        return res.status(200).json(rooms);
      }
    } catch (error) {
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

export default router;
