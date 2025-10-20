import { useState, useEffect, type FormEvent } from "react";
import { X, Calendar } from "lucide-react";
import type { Class } from "../../types";
import CustomSelect from "../admin/CustomSelect"; 

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classItem: Class) => void;
  classToEdit: Class | null;
}

const initialClassState: Class = {
  nama_kelas: "",
  deskripsi: "",
  harga: 0,
  format: "Offline",
  tanggal_mulai: new Date().toISOString().split("T")[0],
  jadwal_detail: "",
  kuota: 0,
  status: "Segera Hadir",
  link_thumbnail: "",
};

export default function ClassModal({
  isOpen,
  onClose,
  onSave,
  classToEdit,
}: ClassModalProps) {
  const [classData, setClassData] = useState<Class>(initialClassState);

  useEffect(() => {
    if (isOpen) {
      if (classToEdit) {
        const formattedData = {
          ...classToEdit,
          tanggal_mulai: classToEdit.tanggal_mulai
            ? new Date(classToEdit.tanggal_mulai).toISOString().split("T")[0]
            : "",
        };
        setClassData(formattedData);
      } else {
        setClassData(initialClassState);
      }
    }
  }, [classToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setClassData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(classData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex justify-center items-center p-4">
      <div className="relative bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-lg z-[9999]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-pink-400">
            {classToEdit ? "Edit Class" : "Add New Class"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto px-2 py-2"
        >
          <input
            name="nama_kelas"
            value={classData.nama_kelas}
            onChange={handleChange}
            placeholder="Nama Kelas"
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            required
          />

          <textarea
            name="deskripsi"
            value={classData.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi Kelas"
            rows={3}
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <input
            type="number"
            name="harga"
            value={classData.harga}
            onChange={handleChange}
            placeholder="Harga (misal: 500000)"
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            required
          />

          {/* Custom Select Format */}
          <CustomSelect
            label="Format"
            value={classData.format}
            options={["Offline", "Online", "Hybrid"]}
            onChange={(val: any) =>
              setClassData((prev) => ({ ...prev, format: val }))
            }
            ringColor="#fa4b94"
          />

          {/* Date Input */}
          <div className="relative">
            <input
              type="date"
              name="tanggal_mulai"
              value={classData.tanggal_mulai}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
            />
            <Calendar
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <input
            name="jadwal_detail"
            value={classData.jadwal_detail || ""}
            onChange={handleChange}
            placeholder="Detail Jadwal (misal: Setiap Sabtu, 10:00-12:00)"
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="number"
            name="kuota"
            value={classData.kuota || ""}
            onChange={handleChange}
            placeholder="Kuota Peserta (kosongkan jika tidak terbatas)"
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          {/* Custom Select Status */}
          <CustomSelect
            label="Status"
            value={classData.status}
            options={["Segera Hadir", "Pendaftaran Dibuka", "Penuh", "Selesai"]}
            onChange={(val: any) =>
              setClassData((prev) => ({ ...prev, status: val }))
            }
            ringColor="#fe9135"
          />

          <input
            name="link_thumbnail"
            value={classData.link_thumbnail || ""}
            onChange={handleChange}
            placeholder="Link Thumbnail"
            className="w-full p-3 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-gray-transparent py-2 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700/70 text-gray-200 rounded-lg hover:bg-gray-600/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
