import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";


interface WorkDetailLayoutProps {
  title: string;
  image: string;
  category: string;
  description: string;
  descriptionHeader?: string; 
  features?: string[];
  images?: string[];
}

const WorkDetailLayout: React.FC<WorkDetailLayoutProps> = ({
  title,
  image,
  category,
  description,
  descriptionHeader, 
  features = [],
  images = []
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#111] min-h-screen py-16 px-6 flex flex-col items-center text-white">
      {/* === HEADER TITLE === */}
      <h1
        className="font-extrabold mb-4 pt-20 text-center leading-[1.1] break-words"
        style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
        >
        {title}
      </h1>
      <p className="text-base text-white mb-3 text-center">{category}</p>

      {/* === IMAGE === */}
      <div className="relative w-screen -mx-6 md:mx-0 md:w-full flex justify-center my-8">
        <img
          src={image}
          alt={title}
          className="w-screen md:w-[1400px] md:h-[700px] object-cover bg-[#222]"
        />
      </div>

      {/* === DESCRIPTION SECTION === */}
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-gray-700 pt-10">
        {/* LEFT - Header Label */}
        <div className="lg:col-span-2 text-gray-400 uppercase tracking-wider text-sm pl-3">
         • About
        </div>

        {/* MIDDLE - Description */}
        <div className="lg:col-span-7 text-gray-100 text-lg leading-relaxed">
          {/* Description Header */}
          {descriptionHeader && (
            <h2 className="text-4xl sm:text-6xl font-bold mb-7">
              {descriptionHeader}
            </h2>
          )}

          {/* Description Text */}
          {description
            ?.split(/\r?\n\s*\r?\n/)
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>

        {/* RIGHT - Features */}
        <div className="lg:col-span-3 text-gray-300 text-right">
          <div className="text-gray-400 uppercase text-sm tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Features
          </div>
          <div className="space-y-2 border-t border-gray-700 pt-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex justify-between text-sm uppercase tracking-wide border-b border-gray-800 pb-3"
              >
                <span></span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === IMAGE SLIDER SECTION === */}
<div className="w-full max-w-[1600px] mt-30 relative">
  {/* Tombol Navigasi Kiri & Kanan */}
  <button
    className="swiper-button-prev absolute top-1/2 left-4 z-50 -translate-y-1/2 bg-white/70 backdrop-blur-md hover:bg-white text-black rounded-full p-3 shadow-md transition"
    style={{
      border: "1px solid #ddd",
      cursor: "pointer",
    }}
  >
    ❮
  </button>
  <button
    className="swiper-button-next absolute top-1/2 right-4 z-50 -translate-y-1/2 bg-white/70 backdrop-blur-md hover:bg-white text-black rounded-full p-3 shadow-md transition"
    style={{
      border: "1px solid #ddd",
      cursor: "pointer",
    }}
  >
    ❯
  </button>

  <Swiper
    modules={[Navigation, Pagination]}
    navigation={{
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }}
    pagination={{ clickable: true }}
    spaceBetween={30}
    slidesPerView={3}
    loop={true}
    className="overflow-hidden"
    breakpoints={{
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
  >
    {images && images.length > 0 ? (
      images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
            <img
              src={src}
              alt={`${title}-slide-${i}`}
              className="w-full h-[350px] object-cover"
            />
          </div>
        </SwiperSlide>
      ))
    ) : (
      <SwiperSlide>
        <div className="w-full h-[500px] bg-gray-800 flex items-center justify-center text-gray-400 text-lg">
          No images available
        </div>
      </SwiperSlide>
    )}
  </Swiper>
</div>


    </div>
  );
};

export default WorkDetailLayout;
