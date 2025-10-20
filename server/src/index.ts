import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { checkDbConnection } from './config/database';

// Panggil dotenv.config() di paling atas untuk memuat .env di lokal
dotenv.config();

// Impor semua file rute Anda
import userRoutes from './routes/userRoutes';
import worksRoutes from './routes/worksRoutes';
import classesRoutes from './routes/classesRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 8080;

// Konfigurasi CORS untuk Vercel & Lokal
const allowedOrigins = [
  process.env.CORS_ORIGIN, // URL dari Vercel akan masuk di sini
  'http://localhost:5173',   // URL untuk development di komputer Anda
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Izinkan jika origin (sumber permintaan) ada di dalam daftar,
    // atau jika origin tidak ada (misalnya saat testing dengan Postman/Thunder Client)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint Health Check yang benar, memeriksa koneksi database
app.get('/health', async (req, res) => {
    const isDbOk = await checkDbConnection();
    if (isDbOk) {
        res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
        // Beri status 503 Service Unavailable jika database tidak terhubung
        res.status(503).json({ status: 'error', database: 'disconnected' });
    }
});

// Pastikan semua rute sudah terdaftar
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handler (wajib diletakkan setelah semua rute)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berhasil berjalan di port ${PORT}`);
});

