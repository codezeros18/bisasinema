import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { checkDbConnection } from './config/database';

dotenv.config();

import userRoutes from './routes/userRoutes';
import worksRoutes from './routes/worksRoutes';
import classesRoutes from './routes/classesRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================================
// --- FINAL CORS DEBUGGING ---
// ==========================================================

// 1. Kita cetak nilai CORS_ORIGIN yang dibaca oleh server saat dimulai
console.log('--- MEMBACA VARIABEL CORS ---');
console.log('CORS_ORIGIN DARI ENV:', process.env.CORS_ORIGIN);
console.log('------------------------------------');

const allowedOrigins = [
  process.env.CORS_ORIGIN, // URL dari Vercel akan masuk ke sini
  'http://localhost:5173', // Port default Vite untuk development
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // 2. Kita cetak origin yang meminta izin SETIAP KALI ADA REQUEST
    console.log('PERMINTAAN CORS DARI:', origin);
    console.log('DAFTAR IZIN (allowedOrigins):', allowedOrigins);

    if (!origin || (allowedOrigins.includes(origin))) {
      console.log('IZIN CORS DIBERIKAN UNTUK:', origin);
      callback(null, true);
    } else {
      console.error('IZIN CORS DITOLAK UNTUK:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
// ==========================================================

app.use(express.json());

// Endpoint Health Check
app.get('/health', async (req, res) => {
    const isDbOk = await checkDbConnection();
    if (isDbOk) {
        res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
        res.status(503).json({ status: 'error', database: 'disconnected' });
    }
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berhasil berjalan di port ${PORT}`);
});