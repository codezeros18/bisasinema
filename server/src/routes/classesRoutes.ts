import { Router } from 'express';
import { 
    getAllClasses,
    createClass,
    updateClass,
    deleteClass
} from '../controllers/classesController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

// --- Rute Publik ---
// GET /api/classes -> Siapa saja bisa melihat semua kelas
router.get('/', getAllClasses);

// --- Rute Admin (Dilindungi) ---
// POST /api/classes -> Hanya admin yang bisa membuat kelas baru
router.post('/', protect, admin, createClass);

// PUT /api/classes/:id -> Hanya admin yang bisa mengedit kelas
router.put('/:id', protect, admin, updateClass);

// DELETE /api/classes/:id -> Hanya admin yang bisa menghapus kelas
router.delete('/:id', protect, admin, deleteClass);

export default router;
