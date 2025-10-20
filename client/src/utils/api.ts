// File ini akan menjadi pusat kendali untuk semua panggilan API

// 1. Baca URL dasar API dari environment variable yang sudah Anda atur di Vercel.
//    Jika tidak ada (saat development di laptop), gunakan URL localhost.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// 2. Buat fungsi 'fetch' kustom yang sudah menyertakan token
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        // @ts-ignore
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan pada server.');
    }

    return data;
};
