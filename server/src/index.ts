import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { checkDbConnection } from './config/database';
import userRoutes from './routes/userRoutes';
import worksRoutes from './routes/worksRoutes';
import classesRoutes from './routes/classesRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  process.env.CORS_ORIGIN, // contoh: https://bisasinema.vercel.app
  'http://localhost:5173',
];

console.log('✅ Allowed Origins:', allowedOrigins);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ✅ FIXED: gunakan regex agar tidak crash di Express v5+
app.options(/.*/, cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Health Check
app.get('/health', async (req, res) => {
  const isDbOk = await checkDbConnection();
  if (isDbOk) res.status(200).json({ status: 'ok', database: 'connected' });
  else res.status(503).json({ status: 'error', database: 'disconnected' });
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
