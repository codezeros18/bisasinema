// server/src/config/database.ts

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Memuat variabel dari file .env
dotenv.config();

// Membuat 'pool' koneksi ke database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi saat aplikasi pertama kali berjalan
pool.getConnection()
    .then(connection => {
        console.log("✅ Berhasil terhubung ke database MySQL.");
        connection.release(); // Melepaskan koneksi kembali ke pool
    })
    .catch(err => {
        console.error("❌ Gagal terhubung ke database:", err.message);
    });

export default pool;