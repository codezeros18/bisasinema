import { useState, useEffect, useRef } from "react";

// import assets
import bg1 from "../assets/bgrawr.jpg";
import bg2 from "../assets/bgrawr1.jpg";
import bg3 from "../assets/bgrawr2.jpg";
import bg4 from "../assets/bgrawr3.jpg";
import bg5 from "../assets/bgrawr4.jpg";

const movies = [
  { title: "Star Wars Andor", img: bg1, year: "2022" },
  { title: "Tron Ares", img: bg2, year: "2025" },
  { title: "Ballerina", img: bg3, year: "2024" },
  { title: "Avatar Fire and Ash", img: bg4, year: "2026" },
  { title: "Ironheart", img: bg5, year: "2025" },
];

const LandingPage = () => {
  const [hovered, setHovered] = useState(movies[0].title);
  const [blur, setBlur] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // blur efek
  useEffect(() => {
    if (!hovered) return;
    setBlur(true);
    const timeout = setTimeout(() => setBlur(false), 1000);
    return () => clearTimeout(timeout);
  }, [hovered]);

  // auto slide hanya untuk mobile
  useEffect(() => {
    const setupAutoSlide = () => {
      // clear interval lama
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // cek apakah mobile
      if (window.innerWidth < 768) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 4000);
      }
    };

    setupAutoSlide();

    window.addEventListener("resize", setupAutoSlide);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("resize", setupAutoSlide);
    };
  }, []);

  useEffect(() => {
    setHovered(movies[currentIndex].title);
  }, [currentIndex]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          blur ? "blur-[12px] scale-105" : "blur-0 scale-100"
        }`}
        style={{
          backgroundImage: `url(${movies.find((m) => m.title === hovered)?.img})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* DESKTOP: semua list */}
      <div className="hidden md:block absolute bottom-16 left-10 z-10 space-y-2">
        {movies.map((movie) => (
          <div
            key={movie.title}
            className="flex items-start gap-3 group cursor-pointer"
            onMouseEnter={() => setHovered(movie.title)}
          >
            <h1
              className={`text-5xl md:text-[78px] leading-[68px] font-bold tracking-[-3px] transition-colors ${
                hovered === movie.title
                  ? "text-gray-300"
                  : "text-white group-hover:text-gray-300"
              }`}
            >
              {movie.title}
            </h1>
            <span
              className={`text-xs sm:text-sm md:text-base -translate-y-2 transition-colors ${
                hovered === movie.title
                  ? "text-gray-300"
                  : "text-white group-hover:text-gray-300"
              }`}
            >
              {movie.year}
            </span>
          </div>
        ))}
      </div>

      {/* MOBILE: 1 judul + year di bawah */}
      <div className="block md:hidden absolute bottom-16 left-6 z-10 max-w-[85%]">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white break-words">
          {movies[currentIndex].title}
        </h1>
        <span className="text-sm text-gray-300 mt-1 block">
          {movies[currentIndex].year}
        </span>

        {/* pagination angka */}
        <div className="flex items-center gap-2 mt-5">
          {movies.map((_, idx) => (
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
