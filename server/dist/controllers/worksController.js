import db from '../config/database.js';
// --- GET ALL WORKS (READ) ---
// Fungsi ini bersifat publik, tidak perlu login untuk melihat karya.
export const getAllWorks = async (req, res) => {
    try {
        // Mengambil semua data dari tabel 'Works', diurutkan berdasarkan tahun terbaru
        const [works] = await db.query('SELECT * FROM Works ORDER BY tahun_proyek DESC');
        res.json(works);
    }
    catch (error) {
        console.error("Error getting works:", error);
        res.status(500).json({ message: "Server error while getting works." });
    }
};
// --- CREATE NEW WORK (CREATE) ---
// Fungsi ini hanya untuk admin.
export const createWork = async (req, res) => {
    // Mengambil semua data yang relevan dari body request
    const { judul, deskripsi, kategori, klien, link_video, link_thumbnail, tahun_proyek } = req.body;
    // Validasi sederhana
    if (!judul || !kategori) {
        return res.status(400).json({ message: "Judul dan kategori tidak boleh kosong." });
    }
    try {
        const [result] = await db.query('INSERT INTO Works (judul, deskripsi, kategori, klien, link_video, link_thumbnail, tahun_proyek) VALUES (?, ?, ?, ?, ?, ?, ?)', [judul, deskripsi, kategori, klien, link_video, link_thumbnail, tahun_proyek]);
        // Mengirim kembali data yang baru dibuat beserta ID-nya
        res.status(201).json({ id: result.insertId, ...req.body });
    }
    catch (error) {
        console.error("Error creating work:", error);
        res.status(500).json({ message: "Server error while creating work." });
    }
};
// --- UPDATE WORK (UPDATE) ---
// Fungsi ini hanya untuk admin.
export const updateWork = async (req, res) => {
    const { id } = req.params;
    const { judul, deskripsi, kategori, klien, link_video, link_thumbnail, tahun_proyek } = req.body;
    try {
        await db.query('UPDATE Works SET judul = ?, deskripsi = ?, kategori = ?, klien = ?, link_video = ?, link_thumbnail = ?, tahun_proyek = ? WHERE id = ?', [judul, deskripsi, kategori, klien, link_video, link_thumbnail, tahun_proyek, id]);
        res.json({ id: Number(id), ...req.body });
    }
    catch (error) {
        console.error("Error updating work:", error);
        res.status(500).json({ message: "Server error while updating work." });
    }
};
// --- DELETE WORK (DELETE) ---
// Fungsi ini hanya untuk admin.
export const deleteWork = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Works WHERE id = ?', [id]);
        res.json({ message: 'Work deleted successfully.' });
    }
    catch (error) {
        console.error("Error deleting work:", error);
        res.status(500).json({ message: "Server error while deleting work." });
    }
};
