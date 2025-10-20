import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import worksRoutes from "./routes/worksRoutes.js";
import classesRoutes from "./routes/classesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ✅ Gunakan PORT dari Railway agar tidak auto-stop
const PORT = process.env.PORT || 8080;

// ✅ Allowed origins untuk CORS
const allowedOrigins = [
  "https://bisasinema.vercel.app",
  "http://localhost:5173", // untuk development
];

// ✅ Konfigurasi CORS aman untuk TypeScript
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    console.log("🌍 Incoming Origin:", origin);
    if (!origin) return callback(null, true); // Izinkan Postman / server-side fetch

    const isAllowed = allowedOrigins.some((allowed) =>
      origin.startsWith(allowed)
    );

    if (isAllowed) {
      console.log(`✅ Allowed by CORS: ${origin}`);
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

// ✅ Middleware harus di atas semua routes
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ⚡ penting untuk preflight OPTIONS
app.use(express.json());

// ✅ Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  const isDbOk = await checkDbConnection();
  res.status(isDbOk ? 200 : 503).json({
    status: isDbOk ? "ok" : "error",
    database: isDbOk ? "connected" : "disconnected",
  });
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

// ✅ Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
