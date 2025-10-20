import { useState, useEffect, useRef } from "react";
import type { Work } from "../types"; // Impor tipe data Work

// Tipe data yang digunakan secara internal oleh komponen ini
interface MovieItem {
  title: string;
  img: string;
  year: string | number;
}

const LandingPage = () => {
  const [works, setWorks] = useState<MovieItem[]>([]); // State untuk menyimpan data yang sudah diformat
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [blur, setBlur] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Efek untuk mengambil data dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/works`);
        if (!response.ok) throw new Error('Gagal memuat data karya.');
        const data: Work[] = await response.json();

        // Batasi hingga 5 karya terbaru dan format datanya
        const formattedWorks = data.slice(0, 5).map(work => ({
          title: work.judul,
          img: work.link_thumbnail || '', // Pastikan ada fallback jika link thumbnail kosong
          year: work.tahun_proyek || '',
        }));
        
        setWorks(formattedWorks);
        if (formattedWorks.length > 0) {
          setHovered(formattedWorks[0].title); // Set item pertama sebagai yang aktif
        }
      } catch (error) {
        console.error("Error fetching works for landing page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, []);

  // blur efek (tidak berubah)
  useEffect(() => {
    if (!hovered) return;
    setBlur(true);
    const timeout = setTimeout(() => setBlur(false), 1000);
    return () => clearTimeout(timeout);
  }, [hovered]);

  // auto slide hanya untuk mobile (tidak berubah)
  useEffect(() => {
    if (works.length === 0) return; // Jangan jalankan jika tidak ada data

    const setupAutoSlide = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (window.innerWidth < 768) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % works.length);
        }, 4000);
      }
    };
    setupAutoSlide();
    window.addEventListener("resize", setupAutoSlide);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("resize", setupAutoSlide);
    };
  }, [works]); // Bergantung pada 'works'

  useEffect(() => {
    if (works.length > 0) {
        setHovered(works[currentIndex].title);
    }
  }, [currentIndex, works]);

  // Tampilkan loading jika data belum siap
  if (isLoading) {
    return <section className="relative h-screen w-full bg-[#101010] flex items-center justify-center"><p className="text-white">Loading...</p></section>;
  }

  // Tampilkan jika tidak ada data
  if (works.length === 0) {
     return <section className="relative h-screen w-full bg-[#101010] flex items-center justify-center"><p className="text-white">Tidak ada karya untuk ditampilkan.</p></section>;
  }

  return (
    <section className="relative h-screen w-full bg-[#101010] overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          blur ? "blur-[12px] scale-105" : "blur-0 scale-100"
        }`}
        style={{
          backgroundImage: `url(${works.find((m) => m.title === hovered)?.img})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* DESKTOP: semua list */}
      <div className="hidden md:block absolute bottom-16 left-10 z-10 space-y-2">
        {works.map((work) => (
          <div
            key={work.title}
            className="flex items-start gap-3 group cursor-pointer"
            onMouseEnter={() => setHovered(work.title)}
          >
            <h1
              className={`text-5xl md:text-[78px] leading-[68px] font-bold tracking-[-3px] transition-colors ${
                hovered === work.title
                  ? "text-gray-300"
                  : "text-white group-hover:text-gray-300"
              }`}
            >
              {work.title}
            </h1>
            <span
              className={`text-xs sm:text-sm md:text-base -translate-y-2 transition-colors ${
                hovered === work.title
                  ? "text-gray-300"
                  : "text-white group-hover:text-gray-300"
              }`}
            >
              {work.year}
            </span>
          </div>
        ))}
      </div>

      {/* MOBILE: 1 judul + year di bawah */}
      <div className="block md:hidden absolute bottom-16 left-6 z-10 max-w-[85%]">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white break-words">
          {works[currentIndex].title}
        </h1>
        <span className="text-sm text-gray-300 mt-1 block">
          {works[currentIndex].year}
        </span>

        {/* pagination angka */}
        <div className="flex items-center gap-2 mt-5">
          {works.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all px-1 ${
                idx === currentIndex
                  ? "text-white font-bold text-lg"
                  : "text-gray-400 text-sm"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;