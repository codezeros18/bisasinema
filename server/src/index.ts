import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import worksRoutes from "./routes/worksRoutes.js";
import classesRoutes from "./routes/classesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// HANYA jalankan dotenv jika BUKAN di produksi
if (process.env.NODE_ENV !== 'production') {
  console.log("💻 Mode development, memuat file .env...");
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8080;

// --- KONFIGURASI CORS YANG BENAR ---
const allowedOrigins = [
  process.env.CORS_ORIGIN, // Ini akan berisi 'https://bisasinema.vercel.app'
  "http://localhost:5173", // Untuk development
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Izinkan jika origin ada di daftar, atau jika !origin (seperti Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Pastikan OPTIONS ada di sini
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Gunakan HANYA SATU middleware cors ini di bagian ATAS
app.use(cors(corsOptions));
// ---------------------------------

// Middleware ini harus ada SETELAH cors
app.use(express.json());

// Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  const isDbOk = await checkDbConnection();
  if (isDbOk) {
    res.status(200).json({ status: "ok", database: "connected" });
  } else {
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/works", worksRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handler middleware (custom)
app.use(errorHandler);

// Global error logging
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("🔥 Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});