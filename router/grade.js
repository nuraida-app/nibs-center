import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-grade",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const checking = await client.query(
        "SELECT * FROM grades WHERE grade = $1",
        [req.body.grade]
      );

      if (checking.length > 0) {
        res.status(500).json({ message: "Grade is already in use" });
      } else {
        const data = await client.query(
          "INSERT INTO grades(grade) VALUES($1) RETURNING *",
          [req.body.grade]
        );

        res.status(200).json({ message: "Grade is added", data });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/get-grades",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM grades ORDER BY CAST(grade AS INTEGER) ASC"
      );

      const grades = data.rows;

      res.status(200).json(grades);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
