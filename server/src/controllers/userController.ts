import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import dotenv from 'dotenv';

// Panggil dotenv.config() di sini juga untuk memastikan variabel lingkungan tersedia
dotenv.config();

const secret = process.env.JWT_SECRET;

// Pastikan secret key ada, jika tidak, hentikan aplikasi
if (!secret) {
    throw new Error('FATAL ERROR: JWT_SECRET tidak didefinisikan di dalam file .env');
}

// --- FUNGSI REGISTRASI ---
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nama, email, dan password tidak boleh kosong." });
    }
    try {
        const [userExists]: any = await db.query('SELECT email FROM Users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(409).json({ message: "Email sudah terdaftar." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const [result]: any = await db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ 
            message: "Registrasi berhasil!",
            userId: result.insertId
        });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

// --- FUNGSI LOGIN ---
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password tidak boleh kosong." });
    }
    try {
        const [users]: any = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Email atau password salah." });
        }
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email atau password salah." });
        }
        
        // Buat token menggunakan secret yang sudah diverifikasi
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            secret,
            { expiresIn: '1d' }
        );
        
        res.json({
            message: "Login berhasil!",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Error saat login:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

// --- FUNGSI ADMIN: GET ALL USERS ---
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const [users] = await db.query('SELECT id, name, email, role, createdAt FROM Users ORDER BY createdAt DESC');
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// --- FUNGSI ADMIN: DELETE USER ---
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Users WHERE id = ?', [id]);
        const [remainingUsers] = await db.query('SELECT id, name, email, role, createdAt FROM Users ORDER BY createdAt DESC');
        res.json(remainingUsers);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error." });
    }
};

