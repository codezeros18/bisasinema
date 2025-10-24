import mysql from "mysql2/promise";
import dotenv from "dotenv";
// HANYA jalankan dotenv jika BUKAN di produksi
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
let pool;
// --- Deteksi apakah kita di Railway (produksi) atau lokal (Laragon) ---
if (process.env.MYSQLHOST &&
    process.env.MYSQLUSER &&
    process.env.MYSQLPASSWORD &&
    process.env.MYSQLDATABASE &&
    process.env.MYSQLPORT) {
    // 🔹 Railway (production)
    console.log("🌐 Mendeteksi variabel Railway, menggunakan koneksi produksi...");
    pool = mysql.createPool({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        port: Number(process.env.MYSQLPORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
}
else {
    // 🔹 Laragon (development lokal)
    console.log("💻 Menggunakan koneksi lokal dari .env (Laragon)...");
    pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "bisasinema_db",
        port: Number(process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
}
// --- Fungsi untuk cek koneksi database ---
export const checkDbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Berhasil terhubung ke database MySQL!");
        connection.release();
        return true;
    }
    catch (err) {
        console.error("❌ Gagal terhubung ke database:", err.message);
        return false;
    }
};
export default pool;
