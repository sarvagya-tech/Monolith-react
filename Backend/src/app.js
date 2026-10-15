import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();

const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim().replace(/\/$/, ""))
  : [];

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...envOrigins,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/chat", chatRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Internal Server Error";
  let errors = err?.errors || (err?.error ? [err.error] : []);

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err?.name === "CastError") {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
    errors = [err.message];
  }

  // Handle Mongoose ValidationError
  if (err?.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Failed";
    errors = Object.values(err.errors || {}).map((e) => e.message);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
});

export default app;

