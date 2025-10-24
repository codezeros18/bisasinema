import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = Router();
// === Rute Publik (Tidak perlu login) ===
router.post('/register', registerUser);
router.post('/login', loginUser);
// === Rute Admin (Harus login sebagai admin) ===
// GET /api/users -> Mengambil semua pengguna
router.get('/', protect, admin, getAllUsers);
// DELETE /api/users/:id -> Menghapus satu pengguna
router.delete('/:id', protect, admin, deleteUser);
export default router;
