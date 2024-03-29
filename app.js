import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import useragent from "express-useragent";

import userRoutes from "./router/users.js";
import gradeRoutes from "./router/grade.js";
import classRoutes from "./router/class.js";
import subjectRoutes from "./router/subject.js";
import authRoutes from "./router/authentication.js";
import examRoutes from "./router/exam.js";
import roomsRoutes from "./router/rooms.js";
import questionRoutes from "./router/question.js";
import answerRoutes from "./router/answer.js";
import uploadRoutes from "./router/upload.js";
import logRoutes from "./router/log.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: [process.env.DOMAIN_1, process.env.DOMAIN_2, process.env.DOMAIN_3],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(useragent.express());

app.use(
  session({
    secret: process.env.JWT, // Change this to your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      domain: "192.168.1.245",
      maxAge: 3600000 * 8, // 8 hours
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/class", classRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/quizes", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/api/log", logRoutes);

export default app;
