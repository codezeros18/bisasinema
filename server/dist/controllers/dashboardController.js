import db from '../config/database.js';
// Fungsi untuk mengambil statistik ringkas untuk dashboard admin
export const getDashboardStats = async (req, res) => {
    try {
        // 1. Hitung total karya (Works)
        const [worksResult] = await db.query('SELECT COUNT(*) AS count FROM Works');
        const worksCount = worksResult[0].count;
        // 2. Hitung total kelas (Classes)
        const [classesResult] = await db.query('SELECT COUNT(*) AS count FROM Classes');
        const classesCount = classesResult[0].count;
        // 3. Hitung total pengguna (Users)
        const [usersResult] = await db.query('SELECT COUNT(*) AS count FROM Users');
        const usersCount = usersResult[0].count;
        // 4. Hitung total pendaftar kelas yang sudah bayar (ClassRegistrations)
        const [registrationsResult] = await db.query("SELECT COUNT(*) AS count FROM ClassRegistrations WHERE status_pembayaran = 'Paid'");
        const registrationsCount = registrationsResult[0].count;
        // Kirim semua data statistik sebagai satu objek JSON
        res.json({
            worksCount,
            classesCount,
            usersCount,
            registrationsCount
        });
    }
    catch (error) {
        console.error("Error getting dashboard stats:", error);
        res.status(500).json({ message: "Server error while fetching stats." });
    }
};
