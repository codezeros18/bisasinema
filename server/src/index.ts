import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/userRoutes';
import worksRoutes from './routes/worksRoutes';
import classesRoutes from './routes/classesRoutes';
import dashboardRoutes from './routes/dashboardRoutes'; // <-- 1. TAMBAHKAN INI
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/dashboard', dashboardRoutes); // <-- 2. TAMBAHKAN INI

// Error Handler (tetap di paling bawah)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});