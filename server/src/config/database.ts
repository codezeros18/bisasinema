import mysql from "mysql2/promise";
import dotenv from "dotenv";

// HANYA jalankan dotenv jika BUKAN di produksi
if (process.env.NODE_ENV !== "production") {
  console.log("💻 Memuat .env untuk development...");
  dotenv.config();
}

let pool: mysql.Pool;

// --- Deteksi lingkungan HANYA berdasarkan NODE_ENV ---
if (process.env.NODE_ENV === "production") {
  // 🔹 Railway (production)
  // Variabel-variabel ini HARUS ada di Railway dashboard
  console.log("🌐 Menggunakan koneksi PRODUKSI (Railway)...");
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
} else {
  // 🔹 Laragon (development lokal)
  // Variabel-variabel ini HARUS ada di file .env
  console.log("💻 Menggunakan koneksi LOKAL (Laragon)...");
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
  } catch (err: any) {
    console.error("❌ Gagal terhubung ke database:", err.message);
    return false;
  }
};

export default pool;