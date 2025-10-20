import express from 'express';
import cors from 'cors';
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

// ✅ Daftar origin yang diizinkan
const allowedOrigins = [
  process.env.CORS_ORIGIN, // contoh: https://bisasinema.vercel.app
  'http://localhost:5173', // untuk development
];

// ✅ Log biar kelihatan di Railway
console.log('✅ Allowed Origins:', allowedOrigins);

const corsOptions = {
  origin: (origin: string | undefined, callback: (arg0: Error | null, arg1: boolean | undefined) => any) => {
    if (!origin) return callback(null, true); // untuk Postman / server to server
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ✅ Tambahkan handler OPTIONS secara eksplisit sebelum route
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Health Check
app.get('/health', async (req, res) => {
  const isDbOk = await checkDbConnection();
  if (isDbOk) res.status(200).json({ status: 'ok', database: 'connected' });
  else res.status(503).json({ status: 'error', database: 'disconnected' });
});

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ✅ Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
