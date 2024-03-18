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

// GET DETAIL TEACHER
router.get(
  "/get-teacher/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const data = await client.query(
        "SELECT users._id, users.nip, users.name, users.email, users.phone_number, subject.subject_id, subject.subject FROM users INNER JOIN subject ON users.subject_id = subject.subject_id WHERE users._id = $1",
        [id]
      );

      const teacher = data.rows[0];

      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// UPDATE TEACHER DATA
router.put(
  "/update-teacher/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Menangkap data yang akan diperbarui dari body permintaan
      const { name, email, phone_number, subject_id } = req.body;

      // Memperbarui data guru dalam database
      const updatedTeacher = await client.query(
        "UPDATE users SET name = $1, email = $2, phone_number = $3, subject_id = $4 WHERE _id = $5 RETURNING *",
        [name, email, phone_number, subject_id, id]
      );

      if (updatedTeacher.rowCount > 0) {
        // Jika data guru berhasil diperbarui, kirim respons dengan data yang diperbarui
        res.status(200).json({
          message: "Data has been updated",
          data: updatedTeacher.rows[0],
        });
      } else {
        // Jika data guru tidak ditemukan, kirim respons dengan pesan kesalahan
        res.status(404).json({ message: "Teacher not found" });
      }
    } catch (error) {
      // Tangani kesalahan yang terjadi selama proses pembaruan data
      console.error("Error updating teacher:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// DELETE TEACHER
router.delete(
  "/delete-teacher/:id",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await client.query(
        "DELETE FROM users WHERE _id = $1 RETURNING *",
        [id]
      );

      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.status(200).json({
        message: "Teacher deleted successfully",
        deletedTeacher: data.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
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
        "SELECT u._id, u.nis, u.name, g.grade, c.class FROM users u INNER JOIN grades g ON u.grade_id = g.grade_id INNER JOIN class c ON u.class_id = c.class_id WHERE u.role = 'student' ORDER BY CAST(SUBSTRING(c.class, 1, LENGTH(c.class) - 1) AS INTEGER), SUBSTRING(c.class, LENGTH(c.class)) ASC, u.name ASC"
      );

      return res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// GET STUDENT BY GRADE
router.get(
  "/students-by-grade/:grade",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const students = await client.query(
        "SELECT users._id, users.nis, users.name, grades.grade, class.class FROM users " +
          "INNER JOIN grades ON users.grade_id = grades.grade_id " +
          "INNER JOIN class ON users.class_id = class.class_id " +
          "WHERE users.grade_id = $1",
        [req.params.grade]
      );

      res.status(200).json(students.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// DETAIL STUDENT
router.get(
  "/student-detail/:id",
  authenticatedUser,
  authorizeRoles("admin", "student"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const data = await client.query(
        "SELECT users._id, users.nis, users.name, users.grade_id, grades.grade, users.class_id, class.class FROM users " +
          "INNER JOIN grades ON users.grade_id = grades.grade_id " +
          "INNER JOIN class ON users.class_id = class.class_id " +
          "WHERE users._id = $1",
        [id]
      );

      const student = data.rows[0];

      res.status(200).json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// UPDATE STUDENT DATA
router.put(
  "/student-update/:id",
  authenticatedUser,
  authorizeRoles("admin", "student"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Menangkap data yang akan diperbarui dari body permintaan
      const { nis, name, grade_id, class_id } = req.body;

      // Memperbarui data murid dalam database
      const updatedStudent = await client.query(
        "UPDATE users SET nis = $1, name = $2, grade_id = $3, class_id = $4 WHERE _id = $5 RETURNING *",
        [nis, name, grade_id, class_id, id]
      );

      if (updatedStudent.rowCount > 0) {
        // Jika data murid berhasil diperbarui, kirim respons dengan data yang diperbarui
        res.status(200).json({
          message: "Data has been updated",
          data: updatedStudent.rows[0],
        });
      } else {
        // Jika data murid tidak ditemukan, kirim respons dengan pesan kesalahan
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// DELETE STUDENT
router.delete(
  "/student-delete/:id",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await client.query(
        "DELETE FROM users WHERE _id = $1 RETURNING *",
        [id]
      );

      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({
        message: "Student deleted successfully",
        deletedStudent: data.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
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
