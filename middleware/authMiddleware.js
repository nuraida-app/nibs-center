import jwt from "jsonwebtoken";
import { client } from "../connection/connection.js";

export const authenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decode = jwt.verify(token, process.env.JWT);

  const data = await client.query("SELECT * FROM users WHERE _id = $1", [
    decode.id,
  ]);

  req.user = data.rows[0];

  next();
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;

      const decode = jwt.verify(token, process.env.JWT);

      const data = await client.query("SELECT * FROM users WHERE _id = $1", [
        decode.id,
      ]);

      req.user = data.rows[0];

      if (!roles.includes(req.user.role))
        return res.status(403).json({ message: "Unauthorized user" });

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};
