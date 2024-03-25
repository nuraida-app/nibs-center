import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/get-log/:examid",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query("SELECT * FROM log WHERE exam = $1", [
        req.params.examid,
      ]);

      res.status(200).json(data.rows);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/create-log",
  authenticatedUser,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      const { student, exam } = req.body;
      const date = new Date().toISOString();
      const ipAddress = req.socket.remoteAddress;
      const browser = req.useragent.browser + " " + req.useragent.version;

      // Periksa apakah ada student yang sama dalam log
      const existingLog = await client.query(
        "SELECT * FROM log WHERE student = $1",
        [student]
      );

      if (existingLog.rows.length > 0) {
        // Jika ada student yang sama, hapus entri log yang terkait
        await client.query("DELETE FROM log WHERE student = $1", [student]);
      }

      // Simpan data log baru
      const data = await client.query(
        "INSERT INTO log (date, ip, browser, student, exam) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [date, ipAddress, browser, student, exam]
      );

      const logs = data.rows[0];

      res.status(200).json({ success: true, logs });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/private-ip", (req, res) => {
  const privateIP = req.socket.remoteAddress;
  res.json({ privateIP });
});

export default router;
