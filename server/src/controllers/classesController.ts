import { Request, Response } from 'express';
import db from '../config/database';

// --- GET ALL CLASSES (READ) ---
// Fungsi ini bersifat publik, tidak perlu login untuk melihat daftar kelas.
export const getAllClasses = async (req: Request, res: Response) => {
    try {
        // Mengambil semua data dari tabel 'Classes', diurutkan berdasarkan tanggal mulai
        const [classes] = await db.query('SELECT * FROM Classes ORDER BY tanggal_mulai DESC');
        res.json(classes);
    } catch (error) {
        console.error("Error getting classes:", error);
        res.status(500).json({ message: "Server error while getting classes." });
    }
};

// --- CREATE NEW CLASS (CREATE) ---
// Fungsi ini hanya untuk admin.
export const createClass = async (req: Request, res: Response) => {
    // Mengambil semua data yang relevan dari body request
    const { nama_kelas, deskripsi, harga, format, tanggal_mulai, jadwal_detail, kuota, status, link_thumbnail } = req.body;

    // Validasi sederhana
    if (!nama_kelas || !deskripsi || !harga || !format) {
        return res.status(400).json({ message: "Nama kelas, deskripsi, harga, dan format tidak boleh kosong." });
    }

    try {
        const [result]: any = await db.query(
            'INSERT INTO Classes (nama_kelas, deskripsi, harga, format, tanggal_mulai, jadwal_detail, kuota, status, link_thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nama_kelas, deskripsi, harga, format, tanggal_mulai, jadwal_detail, kuota, status, link_thumbnail]
        );
        // Mengirim kembali data yang baru dibuat beserta ID-nya
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ message: "Server error while creating class." });
    }
};

// --- UPDATE CLASS (UPDATE) ---
// Fungsi ini hanya untuk admin.
export const updateClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nama_kelas, deskripsi, harga, format, tanggal_mulai, jadwal_detail, kuota, status, link_thumbnail } = req.body;

    try {
        await db.query(
            'UPDATE Classes SET nama_kelas = ?, deskripsi = ?, harga = ?, format = ?, tanggal_mulai = ?, jadwal_detail = ?, kuota = ?, status = ?, link_thumbnail = ? WHERE id = ?',
            [nama_kelas, deskripsi, harga, format, tanggal_mulai, jadwal_detail, kuota, status, link_thumbnail, id]
        );
        res.json({ id: Number(id), ...req.body });
    } catch (error) {
        console.error("Error updating class:", error);
        res.status(500).json({ message: "Server error while updating class." });
    }
};

// --- DELETE CLASS (DELETE) ---
// Fungsi ini hanya untuk admin.
export const deleteClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Classes WHERE id = ?', [id]);
        res.json({ message: 'Class deleted successfully.' });
    } catch (error) {
        console.error("Error deleting class:", error);
        res.status(500).json({ message: "Server error while deleting class." });
    }
};
