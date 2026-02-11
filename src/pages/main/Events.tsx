import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WorksPage: React.FC = () => {
  const works = [
    {
      title: "Bahari On Screen",
      category: "Short Film Competition & Festival",
      image: "https://i.ibb.co.com/cKS42FXQ/DSCF2861.webp",
      slug: "bahari-on-screen",
    },
    {
      title: "Doss Guava XR",
      category: "XR & Interactive Experience",
      image: "https://i.ibb.co.com/99qwvwG7/DSCF0565.webp",
      slug: "doss-guava-xr",
    },
    {
      title: "SAE Workshop 2025",
      category: "Workshop & Training",
      image: "https://i.ibb.co.com/PZMKwQfP/DSCF8469.webp",
      slug: "sae-workshop-2025",
    },
    {
      title: "UMN Cinematography Lab",
      category: "Practical Lab & Creative Experimentation",
      image: "https://i.ibb.co.com/q3gMTf6Y/20250424-VS-2273.webp",
      slug: "umn-cinematography-lab",
    },
    {
      title: "UMN Workshop 2025",
      category: "Workshop & Training",
      image: "https://i.ibb.co.com/LDWfY30v/20250423-IMG-7482.webp",
      slug: "workshop-umn-2025",
    },
    {
      title: "Content and Media Portfolio",
      category: "The things that bisasinema has made",
      image: "https://i.ibb.co.com/bMsxhXCp/4.webp",
      slug: "content-and-media-portfolio",
    },
  ];

  const sliderGroups = [
    [
      "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
      "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
      "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
    ],
    [
      "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
      "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
      "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
    ],
    [
      "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
      "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
      "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
    ],
  ];

  const [currentIndexes, setCurrentIndexes] = useState([0, 0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((curr, idx) => (curr + 1) % sliderGroups[idx].length)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* === Intro Section === */}
      <section className="text-center pt-28 pb-8 bg-black px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Our Events
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-white text-base md:text-lg leading-relaxed">
          We partner with communities, brands, and creators to capture meaningful moments,<br className="hidden md:block" />
from intimate sessions to major celebrations. Through thoughtful documentation <br className="hidden md:block" />
and creative execution.

        </p>
      </section>

      {/* === Works Grid Section === */}
      <section className="bg-black py-8 px-6 md:px-10 border-t border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {works.map((work) => (
            <div
              key={work.title}
              className="relative group h-[400px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden cursor-pointer transform transition duration-500 hover:scale-[1.02]"
            >
              <img
                src={work.image}
                alt={work.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-sm text-gray-300">{work.category}</p>
                <h2 className="text-xl font-semibold text-white mt-1">
                  {work.title}
                </h2>
              </div>
              <Link
                to={`/works/${work.slug}`}
                className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition"
              >
                ↗ Expand
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* === Value Sections === */}
      <section className="bg-black text-white pt-12 pb-8 md:pt-24 md:pb-16 border-t border-gray-800 px-10 md:px-14">
        <div className="max-w-[1600px] mx-auto flex flex-col divide-y divide-gray-800">
          {["Branded Content", "Project", "Media"].map((title, i) => (
            <div
              key={title}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center py-20 border-b border-gray-800 last:border-b-0"
            >
              {/* Left - Title */}
              <div className="text-4xl md:text-5xl font-extrabold text-center md:text-left border-b md:border-b-0 md:border-r border-gray-800 pr-0 md:pr-10 pb-4 md:pb-0 pl-0 md:pl-24">
                {title}
              </div>

              {/* Middle - Description */}
              <div className="text-gray-300 text-base md:text-lg leading-relaxed text-center md:text-left border-b md:border-b-0 md:border-r border-gray-800 pr-0 md:pr-10 pb-4 md:pb-0">
                {i === 0 && (
                  <>
                    Showcases our collaborations with brands — such as Hollyland, 7artisans, Sony, Canon, Aputure
                    and more. Highlighting storytelling, driven visual productions designed to
                    strengthen brand identity.
                  </>
                )}
                {i === 1 && (
                  <>
                    Documents our involvement in film projects, creative productions, and screening
                    events — capturing the process, creativity, and people behind every story.
                  </>
                )}
                {i === 2 && (
                  <>
                    As a content-driven platform, bìsasínema actively publishes
                    educational, informative and engaging content across
                    social media platform, such as TikTok, Instagram, and
                    YouTube
                  </>
                )}
              </div>

              {/* Right - Image Slider */}
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-none">
                {sliderGroups[i].map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${title}-slide-${idx}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === currentIndexes[i] ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WorksPage;