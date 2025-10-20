import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

// Pastikan secret key ada, jika tidak, hentikan aplikasi
if (!secret) {
    throw new Error('FATAL ERROR: JWT_SECRET tidak didefinisikan di dalam file .env');
}

// Tipe data untuk payload di dalam token
interface JwtPayload {
  id: number; // ID pengguna biasanya berupa angka
  role: string;
}

// Menambahkan properti 'user' ke tipe Request dari Express
// Ini agar TypeScript tahu bahwa req.user itu ada dan apa tipenya
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// 1. Middleware 'protect': Memverifikasi token & menempelkan data user ke request
export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil token dari header (setelah kata "Bearer ")
      token = req.headers.authorization.split(' ')[1];
      
      // Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, secret) as JwtPayload;
      
      // Tempelkan payload yang sudah di-decode ke objek request agar bisa diakses di controller
      req.user = decoded;
      
      next(); // Lanjutkan ke middleware atau controller berikutnya
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Otentikasi gagal, token tidak valid.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Otentikasi gagal, tidak ada token.' });
  }
};

// 2. Middleware 'admin': Memeriksa apakah pengguna adalah admin
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Lanjutkan jika user adalah admin
  } else {
    res.status(403).json({ message: 'Akses ditolak. Rute ini hanya untuk admin.' });
  }
};

