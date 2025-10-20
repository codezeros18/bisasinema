import mysql from 'mysql2/promise';

let pool: mysql.Pool;

// Periksa apakah variabel-variabel individual dari Railway ada
if (process.env.MYSQLHOST && process.env.MYSQLUSER && process.env.MYSQLPASSWORD && process.env.MYSQLDATABASE && process.env.MYSQLPORT) {
    // --- Kode ini akan berjalan di Railway (Produksi) ---
    console.log("Mendeteksi variabel Railway, menggunakan koneksi produksi.");
    pool = mysql.createPool({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        port: Number(process.env.MYSQLPORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    // --- Kode ini akan berjalan di komputer Anda (Development) ---
    console.log("Variabel Railway tidak ditemukan, menggunakan koneksi lokal dari .env.");
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Fungsi untuk mengecek koneksi (tidak berubah)
export const checkDbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Berhasil terhubung ke database MySQL.");
        connection.release();
        return true;
    } catch (err: any) {
        console.error("❌ Gagal terhubung ke database:", err.message);
        return false;
    }
};

export default pool;

