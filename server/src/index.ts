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

// ✅ CORS Bebas dulu (sementara biar cepat jalan)
app.use(cors());
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
  console.log(`🚀 Server berhasil berjalan di port ${PORT}`);
});

export default app;