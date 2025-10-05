import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// Rute ini hanya bisa diakses oleh admin yang sudah login
// GET /api/dashboard/stats
router.get('/stats', protect, admin, getDashboardStats);

export default router;
