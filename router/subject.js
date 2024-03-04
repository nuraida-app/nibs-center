import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-subject", async (req, res) => {
  try {
    const checking = await client.query(
      "SELECT * FROM subject WHERE subject = $1",
      [req.body.subject]
    );

    if (checking.length > 0) {
      res.status(500).json({ error: "Subject is already in use" });
    } else {
      const data = await client.query(
        "INSERT INTO subject(subject) VALUES($1) RETURNING *",
        [req.body.subject]
      );

      const new_subject = data.rows[0];

      if (new_subject) {
        res.status(200).json({ message: "Subject is added", new_subject });
      } else {
        res.status(500).json({ message: "Subject is not added" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/get-subjects",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM subject ORDER BY subject ASC"
      );

      const subejcts = data.rows;

      res.status(200).json(subejcts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
