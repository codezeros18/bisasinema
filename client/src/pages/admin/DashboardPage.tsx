import { useState, useEffect } from 'react';
import { Users, Video, Calendar } from "lucide-react";
import StatCard from '../../components/admin/StatCard';
import QuickAction from '../../components/admin/QuickAction';
import WorkModal from '../../components/admin/WorksModal';
import ClassModal from '../../components/admin/ClassModal';
import type { Work, Class } from '../../types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    worksCount: 0,
    classesCount: 0,
    usersCount: 0,
    registrationsCount: 0,
  });
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/stats`, { // <-- URL sudah diubah
           headers: { 'Authorization': `Bearer ${token}` }
        });

        // Cek .ok SEBELUM .json()
        if (!response.ok) {
            // Jika 404 atau 500, coba baca error message jika ada, jika tidak, lempar status
            let errorMessage = `Gagal mengambil data statistik. Status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (e) {
              // Ini terjadi jika responsnya HTML (404 Not Found)
              console.error("Respons bukan JSON:", e);
            }
            throw new Error(errorMessage);
        }

        const data = await response.json(); // <-- Sekarang aman untuk dipanggil
        setStats(data);

    } catch (error: any) {
        console.error("Error fetching dashboard stats:", error);
        alert(`Gagal memuat statistik: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  // Fungsi untuk menyimpan Karya baru
  const handleSaveWork = async (work: Work) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(work)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan data karya.');
      
      setIsWorkModalOpen(false);
      fetchStats(); // Muat ulang statistik setelah berhasil
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  
  // Fungsi untuk menyimpan Kelas baru
  const handleSaveClass = async (classItem: Class) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(classItem)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan data kelas.');

      setIsClassModalOpen(false);
      fetchStats(); // Muat ulang statistik setelah berhasil
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-8 font-poppins">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Admin Dashboard</h1>

      {/* Statistik Ringkas */}
      {/* Statistik Ringkas */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Total Karya" value={stats.worksCount} icon={Video} />
    <StatCard title="Total Kelas" value={stats.classesCount} icon={Calendar} />
    <StatCard title="Total Pengguna" value={stats.usersCount} icon={Users} />
    {/* <StatCard title="Pendaftar Lunas" value={stats.registrationsCount} icon={UserCheck} /> */}
  </div>

      {/* Aksi Cepat */}
  <div>
    <h2 className="text-xl font-bold mt-8 mb-4">Quick Action</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <QuickAction 
        onClick={() => setIsWorkModalOpen(true)}
        title="+ Tambah Karya Baru"
        description="Upload karya atau proyek terbaru ke galeri portofolio."
      />
      <QuickAction 
        onClick={() => setIsClassModalOpen(true)}
        title="+ Buat Kelas Baru"
        description="Atur jadwal, harga, dan detail untuk program 'Beyond The Classroom'."
      />
    </div>
  </div>

      {/* Render Modals */}
      <WorkModal 
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        onSave={handleSaveWork}
        workToEdit={null}
      />
      <ClassModal 
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSave={handleSaveClass}
        classToEdit={null}
      />
    </div>
  );
}

