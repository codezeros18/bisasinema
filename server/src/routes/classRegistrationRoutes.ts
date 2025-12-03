import { Router } from "express";
import multer from "multer";
import path from "path";

import { 
  registerForClass,
  getUserRegistrations,
  getAllRegistrationsForAdmin,
  updateRegistrationStatus
} from "../controllers/classRegistrationsController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    )
});

const upload = multer({ storage });

// ADMIN — lihat semua registrasi
router.get("/", protect, admin, getAllRegistrationsForAdmin);

// USER — daftar kelas
router.post("/", upload.single("bukti_pembayaran"), registerForClass);

// USER — lihat registrasi dia
router.get("/:userId", getUserRegistrations);

// ADMIN — update status pembayaran
router.put("/:id", protect, admin, updateRegistrationStatus);

export default router;
