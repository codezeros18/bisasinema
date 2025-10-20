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

// Konfigurasi CORS (tidak berubah)
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'http://localhost:5173',
];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint Health Check (tidak berubah)
app.get('/health', async (req, res) => {
    const isDbOk = await checkDbConnection();
    if (isDbOk) {
        res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
        res.status(503).json({ status: 'error', database: 'disconnected' });
    }
});

// Pastikan semua rute sudah terdaftar
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handler (tidak berubah)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berhasil berjalan di port ${PORT}`);
});

