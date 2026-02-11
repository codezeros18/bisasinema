import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import WorkModal from '../../components/admin/WorksModal';
import WorkCard from '../../components/admin/WorksCard';
import FilterSwitch from '../../components/admin/FilterSwitch';
import type { Work } from '../../types';

export default function ManageWorksPage() {
  const [allWorks, setAllWorks] = useState<Work[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workToEdit, setWorkToEdit] = useState<Work | null>(null);
  const [filter, setFilter] = useState('All'); // State untuk filter
  const token = localStorage.getItem('token');

  const fetchWorks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/works`);
      if (!response.ok) throw new Error('Gagal memuat data karya.');
      const data = await response.json();
      setAllWorks(data);
    } catch (error) {
      console.error(error);
      alert('Tidak dapat memuat data karya dari server.');
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // Fungsi handleSave, handleEdit, dan handleDelete tidak berubah
  const handleSave = async (work: Work) => {
    const method = work.id ? 'PUT' : 'POST';
    const url = work.id 
      ? `${import.meta.env.VITE_API_BASE_URL}/api/works/${work.id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/api/works`;
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(work)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan data karya.');
      setIsModalOpen(false);
      fetchWorks();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  const handleEdit = (work: Work) => {
    setWorkToEdit(work);
    setIsModalOpen(true);
  };
  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm('Apakah Anda yakin ingin menghapus karya ini?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/works/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menghapus karya.');
      }
      fetchWorks();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  // Logika untuk memfilter karya
  const filteredWorks = allWorks.filter(work => {
    if (filter === 'All') return true;
    return work.kategori === filter;
  });

  const filterOptions = ['All', 'Branded Content', 'Project', 'Media'];

  return (
    <div className="font-poppins text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Manage Works</h1>
        <button
          onClick={() => { setWorkToEdit(null); setIsModalOpen(true); }}
          className="px-4 py-2 rounded-lg flex items-center gap-2 
            bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 
            hover:from-purple-500 hover:to-pink-500
            text-white shadow-lg shadow-purple-900/40 transition-all duration-300"
        >
          <Plus size={20} /> Add New Work
        </button>
      </div>


      {/* Filter Switch */}
      <div className="mb-6 max-w-sm">
          <FilterSwitch
              options={filterOptions}
              activeOption={filter}
              onFilterChange={setFilter}
          />
      </div>

      {/* List Works */}
      {filteredWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-900/70 backdrop-blur-xl 
          rounded-lg border border-gray-800 shadow-lg">
          <p className="text-gray-400">
            {filter === 'All' ? 'Belum ada karya yang ditambahkan.' : `Tidak ada karya dengan kategori "${filter}".`}
          </p>
        </div>
      )}

      <WorkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        workToEdit={workToEdit}
      />
    </div>
  );
}

