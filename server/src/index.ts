import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/database";
import userRoutes from "./routes/userRoutes";
import worksRoutes from "./routes/worksRoutes";
import classesRoutes from "./routes/classesRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

// ✅ Gunakan PORT dari Railway agar tidak auto-stop
const PORT = process.env.PORT || 8080;

// ✅ Allowed origins untuk CORS
const allowedOrigins = [
  "https://bisasinema.vercel.app",
  "http://localhost:5173", // untuk development
];

// ✅ Setup CORS dengan callback
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // untuk Postman / server internal
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  const isDbOk = await checkDbConnection();
  if (isDbOk) {
    res.status(200).json({ status: "ok", database: "connected" });
  } else {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/works", worksRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ Error handler middleware
app.use(errorHandler);

// ✅ Global error logging (untuk debugging Railway)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Jalankan server (Railway pakai PORT env)
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
