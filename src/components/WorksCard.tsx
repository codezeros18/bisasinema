import { PlayCircle, Tag, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Work } from "../types";

interface WorkCardPublicProps {
  work: Work;
  isReversed?: boolean; // Properti untuk layout zigzag
}

export default function WorkCardPublic({
  work,
  isReversed = false,
}: WorkCardPublicProps) {

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[400px] bg-white rounded-lg shadow-md overflow-hidden`}>
      {/* Bagian Gambar */}
      <div className={`w-full h-64 md:h-full ${isReversed ? 'md:order-last' : ''}`}>
        <img
          src={
            work.link_thumbnail ||
            "https://placehold.co/1200x800/171717/FFFFFF?text=Work"
          }
          alt={`Thumbnail for ${work.judul}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian Konten */}
      <div className="flex flex-col justify-center p-6 md:p-8 space-y-4 md:space-y-6">
        <p className="text-xs sm:text-sm text-gray-500 font-medium flex items-center gap-2 font-inter uppercase tracking-wide">
          <Tag size={14} />
          {work.kategori}
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight font-montserrat">
          {work.judul}
        </h3>

        <p className="text-base text-gray-600 flex items-center gap-2 font-inter">
          <Calendar size={16} />
          {work.tahun_proyek}
        </p>
        
        {work.deskripsi && (
            <p className="text-sm text-gray-500 font-inter line-clamp-3">
                {work.deskripsi}
            </p>
        )}

        {/* Link untuk menonton video dengan animasi */}
        <motion.a
          href={work.link_video || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base font-semibold text-black cursor-pointer w-fit"
          whileHover="hover"
          initial="initial"
        >
          <motion.span
            variants={{
              initial: { x: 0 },
              hover: { x: 5 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Watch Video
          </motion.span>
          <motion.div
            variants={{
              initial: { x: -5, opacity: 0 },
              hover: { x: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PlayCircle size={18} />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
}
