import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Laptop, Users, DollarSign } from "lucide-react";
import type { Class } from "../types";

// --- PERUBAHAN DI SINI: Menerima props 'activeFilter' ---
interface ClassShowcaseProps {
  activeFilter: string;
}

export default function ClassShowcase({ activeFilter }: ClassShowcaseProps) {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);
        if (!response.ok) throw new Error("Gagal memuat data kelas.");
        const data: Class[] = await response.json();
        setAllClasses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // --- LOGIKA FILTER BARU ---
  const filteredClasses = allClasses
    .filter(c => c.status === 'Pendaftaran Dibuka' || c.status === 'Segera Hadir')
    .filter(c => {
        if (activeFilter === 'All') return true;
        return c.format === activeFilter;
    })
    .slice(0, 2);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Akan diumumkan";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white/50">
        <p>Memuat kelas...</p>
      </div>
    );
  }

  if (filteredClasses.length === 0) {
    return (
      <div className="text-center py-20 text-white/50">
        <p>Tidak ada kelas yang tersedia untuk filter ini.</p>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-x-hidden px-5 sm:px-16 py-20 text-white bg-[#101010]">
      <div className="relative space-y-32">
        {filteredClasses.map((classItem, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className={`grid md:grid-cols-2 gap-16 items-center ${
                isReversed ? "md:[&>*:first-child]:order-last" : ""
              }`}
            >
              {/* GAMBAR */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative group rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-white/5 to-transparent opacity-90 transition-opacity duration-700"></div>
                <motion.img
                  src={
                    classItem.link_thumbnail ||
                    "https://placehold.co/600x400/101010/FFFFFF?text=Class"
                  }
                  alt={classItem.nama_kelas}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out"
                />
              </motion.div>

              {/* TEKS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 max-w-xl"
              >
                <p className="text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase">
                  {classItem.status}
                </p>

                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  {classItem.nama_kelas}
                </h2>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {classItem.deskripsi}
                </p>

                {/* DETAIL GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-6">
                  {[ 
                    { icon: <DollarSign size={16} />, text: `Rp ${classItem.harga.toLocaleString("id-ID")}` },
                    { icon: <Laptop size={16} />, text: classItem.format },
                    { icon: <Calendar size={16} />, text: formatDate(classItem.tanggal_mulai) },
                    { icon: <Users size={16} />, text: `${classItem.kuota || "Terbatas"} Peserta` },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-xl p-3 flex items-center gap-2 text-sm border border-white/10"
                    >
                      <span className="text-gray-300">{item.icon}</span>
                      <span className="text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {classItem.status === "Pendaftaran Dibuka" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold 
                    bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-200 hover:to-white transition-all text-sm tracking-wide shadow-lg"
                  >
                    Daftar Sekarang →
                  </motion.button>
                ) : (
                  <div className="mt-8">
                    <p className="inline-block px-4 py-2 bg-white/[0.07] border border-white/10 rounded-lg text-gray-300 text-sm">
                      Segera Hadir
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// rawr