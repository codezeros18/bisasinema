import { Edit, Trash2, Calendar, User, PlayCircle } from "lucide-react";
import type { Work } from "../../types";

interface WorkCardProps {
  work: Work;
  onEdit: (work: Work) => void;
  onDelete: (id?: number) => void;
}

export default function WorkCard({ work, onEdit, onDelete }: WorkCardProps) {
  return (
    <div className="group flex flex-col md:flex-row bg-gray-900/80 backdrop-blur-xl 
      border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden">
      
      {/* Thumbnail */}
      <div className="relative w-full md:w-1/2 h-56 md:h-64 overflow-hidden">
        <img
          src={
            work.link_thumbnail ||
            "https://placehold.co/600x400/171717/FFFFFF?text=Work"
          }
          alt={work.judul}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/171717/FFFFFF?text=Error";
          }}
        />

        {/* Tombol aksi */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(work)}
            className="p-2 bg-white/10 backdrop-blur rounded-full text-gray-200 hover:text-blue-400 hover:bg-white/20 shadow"
            title="Edit Work"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(work.id)}
            className="p-2 bg-white/10 backdrop-blur rounded-full text-gray-200 hover:text-red-400 hover:bg-white/20 shadow"
            title="Delete Work"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col w-full md:w-1/2">
        <h3 className="text-lg font-bold text-white mb-2">
          {work.judul}
        </h3>

        {/* Badge Kategori */}
        {work.kategori && (
          <span className="inline-block text-xs px-3 py-1 mb-2 rounded-full bg-gray-700/60 text-gray-200">
            {work.kategori}
          </span>
        )}

        {/* Deskripsi */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
          {work.deskripsi}
        </p>

        {/* Meta Info */}
        <div className="mt-auto text-xs text-gray-300 space-y-2">
          {work.klien && (
            <div className="flex items-center gap-2">
              <User size={14} className="text-gray-400" />
              <span>{work.klien}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span>{work.tahun_proyek}</span>
          </div>
        </div>

        {/* CTA */}
        {work.link_video && (
          <div className="pt-4">
            <a
              href={work.link_video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
              onClick={(e) => e.stopPropagation()}
            >
              <PlayCircle size={16} /> Watch Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
