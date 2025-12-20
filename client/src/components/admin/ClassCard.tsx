import { Edit, Trash2, Calendar, Users, Tag, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import type { Class } from "../../types";

interface ClassCardProps {
  classItem: Class;
  onEdit: (classItem: Class) => void;
  onDelete: (id?: number) => void;
}

export default function ClassCard({ classItem, onEdit, onDelete }: ClassCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group flex flex-col md:flex-row bg-gray-900/80 backdrop-blur-xl 
        border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative w-full md:w-1/2 h-56 md:h-full overflow-hidden">
        <img
          src={
            classItem.link_thumbnail ||
            "https://placehold.co/600x400/171717/FFFFFF?text=Class"
          }
          alt={classItem.nama_kelas}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/171717/FFFFFF?text=Error";
          }}
        />

        {/* Tombol Aksi */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(classItem)}
            className="p-2 bg-white/10 backdrop-blur rounded-full text-gray-200 hover:text-blue-400 hover:bg-white/20 shadow"
            title="Edit Class"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(classItem.id)}
            className="p-2 bg-white/10 backdrop-blur rounded-full text-gray-200 hover:text-red-400 hover:bg-white/20 shadow"
            title="Delete Class"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col w-full md:w-1/2">
        <h3 className="text-lg font-bold text-white mb-2">{classItem.nama_kelas}</h3>

        {/* Status Badge */}
        {classItem.status && (
          <span
            className={`inline-block text-xs px-3 py-1 mb-2 rounded-full ${
              classItem.status === "Pendaftaran Dibuka"
                ? "bg-green-500/20 text-green-300"
                : classItem.status === "Penuh"
                ? "bg-red-500/20 text-red-300"
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            {classItem.status}
          </span>
        )}

        {/* Deskripsi */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">{classItem.deskripsi}</p>

        {/* Meta Info */}
        <div className="mt-auto text-xs text-gray-300 space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-gray-400" />
            <span>Rp {classItem.harga.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-gray-400" />
            <span>{classItem.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span>{formatDate(classItem.tanggal_mulai)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            <span>Kuota: {classItem.kuota || "Tidak terbatas"}</span>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            Lihat Detail
          </motion.button>
        </div> */}
      </div>
    </motion.div>
  );
}
