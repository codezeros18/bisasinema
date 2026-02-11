import { Request, Response } from "express";
import db from "../config/database.js";

// USER — daftar kelas
export const registerForClass = async (req: Request, res: Response) => {
  try {
    const { classId, userId } = req.body;
    const bukti = req.file ? `/uploads/${req.file.filename}` : null;

    if (!classId || !userId) {
      return res.status(400).json({ message: "classId & userId wajib diisi." });
    }

    const [result]: any = await db.query(
      `INSERT INTO classregistrations 
       (classId, userId, status_pembayaran, bukti_pembayaran) 
       VALUES (?, ?, 'pending', ?)`,
      [classId, userId, bukti]
    );

    res.status(201).json({
      id: result.insertId,
      classId,
      userId,
      status_pembayaran: "pending",
      bukti_pembayaran: bukti,
    });
  } catch (error) {
    console.error("Error register class:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// USER — ambil semua kelas yg dia daftar
export const getUserRegistrations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `SELECT cr.*, c.nama_kelas, c.harga, c.format 
       FROM classregistrations cr
       JOIN classes c ON cr.classId = c.id
       WHERE cr.userId = ?
       ORDER BY cr.tanggal_pendaftaran DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error get user registration:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ADMIN — semua registrasi
export const getAllRegistrationsForAdmin = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      `SELECT 
          cr.id,
          cr.classId,
          cr.userId,
          cr.status_pembayaran,
          cr.bukti_pembayaran,
          cr.tanggal_pendaftaran,
          u.name AS userNama,
          c.nama_kelas
       FROM classregistrations cr
       JOIN users u ON cr.userId = u.id
       JOIN classes c ON cr.classId = c.id
       ORDER BY cr.tanggal_pendaftaran DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Error get all registrations:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ADMIN — ubah status: pending / paid / cancelled
export const updateRegistrationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status_pembayaran } = req.body;

    if (!["pending", "paid", "cancelled"].includes(status_pembayaran)) {
      return res.status(400).json({ message: "Status tidak valid." });
    }

    await db.query(
      `UPDATE classregistrations
       SET status_pembayaran = ?
       WHERE id = ?`,
      [status_pembayaran, id]
    );

    res.json({ id, status_pembayaran });
  } catch (error) {
    console.error("Error update status:", error);
    res.status(500).json({ message: "Server error." });
  }
};
