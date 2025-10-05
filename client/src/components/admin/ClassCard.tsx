import { Edit, Trash2, Tag, Calendar, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import type { Class } from "../../types";

interface ClassCardProps {
  classItem: Class;
  onEdit: (classItem: Class) => void;
  onDelete: (id?: number) => void;
  isReversed?: boolean; // zigzag layout
}

export default function ClassCard({
  classItem,
  onEdit,
  onDelete,
  isReversed = false,
}: ClassCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[400px] 
      bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden`}
    >
      {/* Thumbnail */}
      <div
        className={`w-full h-64 md:h-full ${isReversed ? "md:order-last" : ""}`}
      >
        <img
          src={
            classItem.link_thumbnail ||
            "https://placehold.co/1200x800/171717/FFFFFF?text=Class"
          }
          alt={classItem.nama_kelas}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-6 md:p-8 space-y-4 md:space-y-6 text-white">
        {/* Header: Title + Actions */}
        <div className="flex justify-between items-start">
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight font-montserrat drop-shadow">
            {classItem.nama_kelas}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(classItem)}
              className="p-2 text-gray-300 hover:text-blue-400 hover:bg-white/10 rounded-full transition"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(classItem.id)}
              className="p-2 text-gray-300 hover:text-red-400 hover:bg-white/10 rounded-full transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`w-fit px-3 py-1 text-xs font-semibold rounded-full ${
            classItem.status === "Pendaftaran Dibuka"
              ? "bg-green-500/20 text-green-300"
              : classItem.status === "Penuh"
              ? "bg-red-500/20 text-red-300"
              : "bg-gray-500/20 text-gray-300"
          }`}
        >
          {classItem.status}
        </span>

        {/* Description */}
        {classItem.deskripsi && (
          <p className="text-sm text-gray-300 font-inter line-clamp-3">
            {classItem.deskripsi}
          </p>
        )}

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 font-inter border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400" />
            <span>Rp {classItem.harga.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-gray-400" />
            <span>{classItem.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>{formatDate(classItem.tanggal_mulai)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span>Kuota: {classItem.kuota || "Tidak terbatas"}</span>
          </div>
        </div>

        {/* Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-4 py-2 bg-pink-500/80 hover:bg-pink-500 text-white rounded-md w-fit text-sm font-medium shadow-md"
        >
          Lihat Detail
        </motion.button>
      </div>
    </div>
  );
}
