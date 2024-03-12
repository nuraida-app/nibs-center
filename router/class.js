import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-class",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const checking = await client.query(
        "SELECT * FROM class WHERE class = $1",
        [req.body.class]
      );

      if (checking.length > 0) {
        res.status(500).json({ error: "Class is already in use" });
      } else {
        const data = await client.query(
          "INSERT INTO class(class) VALUES($1) RETURNING *",
          [req.body.class]
        );

        const new_class = data.rows[0];

        if (new_class) {
          res.status(200).json({ message: "class is added", new_class });
        } else {
          res.status(500).json({ message: "class is not added", new_class });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/get-classes",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM class ORDER BY CAST(SUBSTRING(class.class, 1, LENGTH(class.class) - 1) " +
          "AS INTEGER), SUBSTRING(class.class, LENGTH(class.class)) ASC"
      );

      const classes = data.rows;

      res.status(200).json(classes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete-class/:id",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const data = await client.query("DELETE FROM class WHERE class_id = $1", [
        req.params.id,
      ]);

      res.status(200).json({ message: "data is deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
