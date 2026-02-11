import { useState, useEffect, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Work } from "../../types";
import CustomSelect from "../admin/CustomSelect"; // 🔹 import komponen reusable

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (work: Work) => void;
  workToEdit: Work | null;
}

const initialWorkState: Work = {
  judul: "",
  deskripsi: "",
  kategori: "Branded Content",
  klien: "",
  link_video: "",
  link_thumbnail: "",
  tahun_proyek: new Date().getFullYear(),
};

const kategoriOptions = ["Branded Content", "Project", "Media"];

export default function WorkModal({
  isOpen,
  onClose,
  onSave,
  workToEdit,
}: WorkModalProps) {
  const [workData, setWorkData] = useState<Work>(initialWorkState);

  useEffect(() => {
    if (isOpen) {
      if (workToEdit) {
        setWorkData(workToEdit);
      } else {
        setWorkData(initialWorkState);
      }
    }
  }, [workToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(workData);
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex justify-center items-center p-4">
    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl 
                    border border-gray-700 shadow-2xl p-6 w-full max-w-lg z-[9999]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-300">
          {workToEdit ? "Edit Work" : "Add New Work"}
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
        className="space-y-4 max-h-[70vh] overflow-y-auto px-2 py-2 text-gray-100"
      >
        <input
          name="judul"
          value={workData.judul}
          onChange={handleChange}
          placeholder="Judul Karya"
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <textarea
          name="deskripsi"
          value={workData.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi singkat karya..."
          rows={3}
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />

        <CustomSelect
          value={workData.kategori}
          options={kategoriOptions}
          onChange={(val) =>
            setWorkData((prev) => ({ ...prev, kategori: val as Work["kategori"] }))
          }
        />

        <input
          name="klien"
          value={workData.klien || ""}
          onChange={handleChange}
          placeholder="Nama Klien (Opsional)"
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700 
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <input
          type="number"
          name="tahun_proyek"
          value={workData.tahun_proyek || ""}
          onChange={handleChange}
          placeholder="Tahun Proyek"
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <input
          name="link_video"
          value={workData.link_video || ""}
          onChange={handleChange}
          placeholder="Link Video (YouTube, Vimeo, dll.)"
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700 
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
        />
        <input
          name="link_thumbnail"
          value={workData.link_thumbnail || ""}
          onChange={handleChange}
          placeholder="URL Thumbnail"
          className="w-full p-3 rounded-lg bg-gray-800/70 border border-gray-700 
                     placeholder-gray-400 text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-transparent  py-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:from-purple-500 hover:to-pink-500
                       text-white shadow-md shadow-purple-900/40 transition-all"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
