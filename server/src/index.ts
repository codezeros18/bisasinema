import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
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
  "http://localhost:5173", // untuk development lokal
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Izinkan Postman, Railway ping, dsb

    const isAllowed = allowedOrigins.some((allowed) =>
      origin.startsWith(allowed)
    );

    if (isAllowed) {
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

// ✅ Tangani preflight OPTIONS secara manual (fix untuk Express v5)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

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

// ✅ Error handler middleware (custom)
app.use(errorHandler);

// ✅ Global error logging (Railway debugging)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Jalankan server (Railway pakai PORT dari env)
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
