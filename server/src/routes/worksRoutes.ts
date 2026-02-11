import { Router } from 'express';
import { 
    getAllWorks,
    createWork,
    updateWork,
    deleteWork
} from '../controllers/worksController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

// --- Rute Publik ---
// GET /api/works -> Siapa saja bisa melihat semua karya
router.get('/', getAllWorks);

// --- Rute Admin (Dilindungi) ---
// POST /api/works -> Hanya admin yang bisa membuat karya baru
router.post('/', protect, admin, createWork);

// PUT /api/works/:id -> Hanya admin yang bisa mengedit karya
router.put('/:id', protect, admin, updateWork);

// DELETE /api/works/:id -> Hanya admin yang bisa menghapus karya
router.delete('/:id', protect, admin, deleteWork);

export default router;
