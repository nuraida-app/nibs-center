import express from "express";
import { client } from "../connection/connection.js";
import bcrypt from "bcrypt";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE-ADMIN
router.post(
  "/create-admin",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          const role = "admin";
          const data = await client.query(
            "INSERT INTO users (name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *",
            [name, email, hash, role]
          );
          const admin = data.rows[0];

          if (admin) {
            return res
              .status(200)
              .json({ message: "admin successfully added", admin });
          } else {
            return res.status(500).json({ message: "admin failed to add" });
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// CREATE USER
router.post("/create-user", authenticatedUser, async (req, res) => {
  try {
    const {
      nis,
      nip,
      name,
      grade_id,
      class_id,
      subject_id,
      phone_number,
      email,
      role,
    } = req.body;

    const password = "12345678"; // Password default

    let checkingQuery, errorMessage;

    if (nis) {
      checkingQuery = "SELECT * FROM users WHERE nis = $1";
      errorMessage = "NIS is already used";
    } else if (nip) {
      checkingQuery = "SELECT * FROM users WHERE nip = $1";
      errorMessage = "NIP is already used";
    } else if (email) {
      checkingQuery = "SELECT * FROM users WHERE email = $1";
      errorMessage = "Email is already used";
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }

    const userChecking = await client.query(checkingQuery, [nis || nip]);

    if (userChecking.rowCount > 0) {
      return res.status(500).json({ message: errorMessage });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const insertionQuery =
        "INSERT INTO users (nis, nip, name, grade_id, class_id, subject_id, phone_number, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";

      const insertionValues = [
        nis || null,
        nip || null,
        name,
        grade_id || null,
        class_id || null,
        subject_id || null,
        phone_number || null,
        email || null,
        hash,
        role,
      ];

      try {
        const process = await client.query(insertionQuery, insertionValues);
        const user = process.rows[0];

        if (role === "student") {
          return res
            .status(200)
            .json({ message: "Student successfully added", user });
        } else if (role === "teacher") {
          return res
            .status(200)
            .json({ message: "Teacher successfully added", user });
        } else {
          return res
            .status(200)
            .json({ message: "User successfully added", user });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET USER PROFILE
router.get("/profile", authenticatedUser, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET TEACHERS
router.get(
  "/get-teachers",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT users._id, users.nip, users.name, users.email, users.phone_number, subject.subject_id, subject.subject FROM users INNER JOIN subject ON users.subject_id = subject.subject_id WHERE users.role = 'teacher' ORDER BY users.name ASC"
      );

      res.status(200).json(data.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// UPLAOD TEACHERS
router.post(
  "/upload-teachers",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = req.body.data;

      const password = "12345678";
      const role = "teacher";

      // Memeriksa apakah data yang diterima memiliki nilai null untuk name
      const teachersData = data.filter((item) => item[1] !== null);

      // Memproses setiap baris data
      for (const teacher of teachersData) {
        await client.query(
          "INSERT INTO users (nip, name, subject_id, password, role) VALUES ($1, $2, $3, $4, $5)",
          [teacher[0], teacher[1], teacher[2], password, role]
        );
      }

      res.status(200).json({
        message: `${teachersData.length} teachers successfully added`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENTS
router.get(
  "/get-students",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT u.nis, u.name, g.grade, c.class FROM users u INNER JOIN grades g ON u.grade_id = g.grade_id INNER JOIN class c ON u.class_id = c.class_id WHERE u.role = 'student' ORDER BY CAST(SUBSTRING(c.class, 1, LENGTH(c.class) - 1) AS INTEGER), SUBSTRING(c.class, LENGTH(c.class)) ASC, u.name ASC"
      );

      return res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// UPLAOD STUDENTS
router.post(
  "/upload-students",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = req.body.data;

      const password = "12345678";
      const role = "student";

      // Memeriksa apakah data yang diterima memiliki nilai null untuk name
      const studentsData = data.filter((item) => item[1] !== null);

      // Menggunakan Promise.all untuk menunggu semua operasi hash selesai sebelum memberikan respons
      await Promise.all(
        studentsData.map(async (student) => {
          const hash = await bcrypt.hash(password, 10);

          await client.query(
            "INSERT INTO users (nis, name, grade_id, class_id, password, role) VALUES ($1, $2, $3, $4, $5, $6)",
            [student[0], student[1], student[2], student[3], hash, role]
          );
        })
      );

      res.status(200).json({
        message: `${studentsData.length} students successfully added`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
