import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ClassModal from '../../components/admin/ClassModal';
import ClassCard from '../../components/admin/ClassCard';
import FilterSwitch from '../../components/admin/FilterSwitch'; // <-- Impor komponen filter
import type { Class } from '../../types';

export default function ManageClassesPage() {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState<Class | null>(null);
  const [filter, setFilter] = useState('All'); // <-- State untuk melacak filter
  const token = localStorage.getItem('token');

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);
      if (!response.ok) throw new Error('Gagal memuat data kelas.');
      const data = await response.json();
      setAllClasses(data);
    } catch (error) {
      console.error(error);
      alert('Tidak dapat memuat data kelas dari server.');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fungsi handleSave, handleEdit, dan handleDelete tidak berubah
  const handleSave = async (classItem: Class) => {
    const method = classItem.id ? 'PUT' : 'POST';
    const url = classItem.id 
      ? `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classItem.id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/api/classes`;
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(classItem)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan data kelas.');
      setIsModalOpen(false);
      fetchClasses();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (classItem: Class) => {
    setClassToEdit(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menghapus kelas.');
      }
      fetchClasses();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  // Logika untuk memfilter kelas berdasarkan state 'filter'
  const filteredClasses = allClasses.filter(classItem => {
    if (filter === 'All') return true;
    return classItem.format === filter;
  });

  const filterOptions = ['All', 'Offline', 'Online', 'Hybrid'];

  return (
    <div className="font-poppins text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold drop-shadow">Manage Classes</h1>
        <button 
          onClick={() => { setClassToEdit(null); setIsModalOpen(true); }}
          className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg 
                    flex items-center gap-2 hover:bg-white/20 transition-all shadow-md"
        >
          <Plus size={20} /> Add New Class
        </button>
      </div>
      {/* Tambahkan komponen FilterSwitch di sini */}
      <div className="mb-6 max-w-sm">
        <FilterSwitch
            options={filterOptions}
            activeOption={filter}
            onFilterChange={setFilter}
        />
      </div>

      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gunakan 'filteredClasses' untuk me-render kartu */}
          {filteredClasses.map((classItem) => (
            <ClassCard 
              key={classItem.id} 
              classItem={classItem} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg shadow-md">
          <p className="text-gray-300">
            {filter === 'All' ? 'Belum ada kelas yang ditambahkan.' : `Tidak ada kelas dengan format "${filter}".`}
          </p>
        </div>
      )}
      
      <ClassModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        classToEdit={classToEdit}
      />
    </div>
  );
}

