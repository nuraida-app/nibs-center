import express from "express";
import { client } from "../connection/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticatedUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { nis, nip, email, password } = req.body;

    if (nis) {
      const data = await client.query("SELECT * FROM users WHERE nis = $1", [
        nis,
      ]);

      if (data.rows.length > 0) {
        const user = data.rows[0];

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            if (result) {
              const expires_token = "8h";
              const expires_cookie = 28800000;

              const token = jwt.sign({ id: user._id }, process.env.JWT, {
                expiresIn: expires_token,
              });

              res.cookie("token", token, {
                httpOnly: true,
                maxAge: expires_cookie,
                sameSite: "None", // Coba tambahkan opsi sameSite
              });

              res.status(200).json({ message: "Login successful", user });
            } else {
              return res.status(401).json({ message: "Invalid Password" });
            }
          }
        });
      } else {
        return res.status(401).json({ message: " user not found" });
      }
    } else if (nip) {
      const data = await client.query("SELECT * FROM users WHERE nip = $1", [
        nip,
      ]);

      if (data.rows.length > 0) {
        const user = data.rows[0];

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            if (result) {
              const expires_token = "8h";
              const expires_cookie = 3600000 * 8;

              const token = jwt.sign({ id: user._id }, process.env.JWT, {
                expiresIn: expires_token,
              });

              res.cookie("token", token, {
                httpOnly: true,
                maxAge: expires_cookie,
              });

              res.status(200).json({ message: "Login successful", user });
            } else {
              return res.status(401).json({ message: "Invalid Password" });
            }
          }
        });
      } else {
        return res.status(401).json({ message: "User not found" });
      }
    } else if (email) {
      const data = await client.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (data.rows.length > 0) {
        const user = data.rows[0];

        bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            if (result) {
              const expires_token = "8h";
              const expires_cookie = 3600000 * 8;

              const token = jwt.sign({ id: user._id }, process.env.JWT, {
                expiresIn: expires_token,
              });

              res.cookie("token", token, {
                httpOnly: true,
                maxAge: expires_cookie,
              });

              res.status(200).json({ message: "Login successful", user });
            } else {
              return res.status(401).json({ message: "Invalid Password" });
            }
          }
        });
      } else {
        return res.status(401).json({ message: "User not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  // res.clearCookie("token", { path: "/" });

  try {
    res.cookie("token", null, {
      httpOnly: true,
      maxAge: new Date(Date.now()),
      sameSite: "None", // Coba tambahkan opsi sameSite
    });

    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
