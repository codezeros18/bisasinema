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

// ---- LOG ALLOWED ORIGINS ----
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'http://localhost:5173',
];
console.log('✅ Allowed origins:', allowedOrigins);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.some(url => typeof url === 'string' && origin.startsWith(url))) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // optional (aktifkan jika pakai cookie / token)
};

// ✅ Tambahkan ini untuk handle preflight
app.options('*', cors(corsOptions));

// ✅ Middleware utama
app.use(cors(corsOptions));
app.use(express.json());

// Endpoint health check
app.get('/health', async (req, res) => {
  const isDbOk = await checkDbConnection();
  if (isDbOk) {
    res.status(200).json({ status: 'ok', database: 'connected' });
  } else {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
