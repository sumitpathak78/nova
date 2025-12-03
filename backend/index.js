import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js"; // use kar rahe ho to theek, warna hata bhi sakte ho
import path from "path";
import { fileURLToPath } from "url";

// ✅ ES Modules me __dirname ka sahi setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "https://nova-di9f.onrender.com",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ React build serve karna
// Expected folder structure:
// ai/
//   backend/index.js
//   frontend/dist/...
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ Catch-all route (regex use kiya, isse path-to-regexp nahi chalta)
app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  connectDb();
  console.log("server started on port", port);
});
