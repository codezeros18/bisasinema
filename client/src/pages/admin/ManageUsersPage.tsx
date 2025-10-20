import { useState, useEffect } from 'react';
import UserCard from '../../components/admin/UserCard';

// Mengekspor tipe data User agar bisa digunakan oleh komponen lain (seperti UserCard)
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentAdminId, setCurrentAdminId] = useState<number | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Ambil ID admin yang sedang login dari localStorage
    // Ini berguna agar admin tidak bisa menghapus akunnya sendiri
    const adminDataString = localStorage.getItem('user');
    if (adminDataString) {
      const adminData = JSON.parse(adminDataString);
      setCurrentAdminId(adminData.id);
    }
    fetchUsers();
  }, []);

  // Fungsi untuk mengambil semua data pengguna dari API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal memuat data pengguna.');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Tidak dapat memuat data pengguna dari server.');
    }
  };

  // Fungsi untuk menghapus pengguna berdasarkan ID
  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini? Operasi ini tidak dapat dibatalkan.')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menghapus pengguna.');
      }
      // Muat ulang daftar pengguna setelah berhasil menghapus
      fetchUsers();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
  <div className="font-poppins text-white">
    <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

    {users.length > 1 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard 
            key={user.id}
            user={user}
            onDelete={handleDelete}
            currentUserId={currentAdminId || undefined}
          />
        ))}
      </div>
    ) : (
       <div className="text-center py-10 bg-gray-900/70 rounded-xl shadow-md backdrop-blur-xl">
          <p className="text-gray-400">Tidak ada pengguna lain yang terdaftar saat ini.</p>
      </div>
    )}
  </div>
);

}

