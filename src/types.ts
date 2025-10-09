// File ini akan menjadi pusat untuk semua tipe data di aplikasi Anda

// Tipe untuk data Pengguna (Users)
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

// Tipe untuk data Karya (Works)
export interface Work {
  id?: number;
  judul: string;
  deskripsi: string;
  kategori: 'Branded Content' | 'Project' | 'Media';
  klien?: string;
  link_video?: string;
  link_thumbnail?: string;
  tahun_proyek?: number | string; // Menggunakan string untuk input form
  createdAt?: string;
}

// Tipe untuk data Kelas (Classes)
export interface Class {
  id?: number;
  nama_kelas: string;
  deskripsi: string;
  harga: number;
  format: 'Online' | 'Offline' | 'Hybrid';
  tanggal_mulai?: string;
  jadwal_detail?: string;
  kuota?: number;
  status: 'Pendaftaran Dibuka' | 'Penuh' | 'Selesai' | 'Segera Hadir';
  link_thumbnail?: string;
  createdAt?: string;
}

// Tipe untuk data Pendaftaran Kelas (ClassRegistrations)
export interface ClassRegistration {
    id: number;
    classId: number;
    userId: number;
    tanggal_pendaftaran: string;
    status_pembayaran: 'Pending' | 'Paid' | 'Cancelled';
    bukti_pembayaran?: string;
}

