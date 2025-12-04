import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EducationPage: React.FC = () => {
  const educationSections = [
    {
      id: 1,
      number: "01",
      title: "WORKSHOPS & TRAINING",
      description:
        "We design and facilitate hands-on workshops covering cinematography, visual storytelling, and creative production techniques.",
      image: "https://i.ibb.co.com/pjMjqrx4/DSCF8464.webp",
      slug: "workshops-training",
      featured: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
      ],
    },
    {
      id: 2,
      number: "02",
      title: "LAB & EXPERIMENTATION",
      description:
        "Creative spaces where students explore new technologies, techniques, and push the boundaries of visual expression.",
      image: "https://i.ibb.co.com/q3gMTf6Y/20250424-VS-2273.webp",
      slug: "lab-experimentation",
      featured: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
      ],
    },
    {
      id: 3,
      number: "03",
      title: "MENTORSHIP & GUIDANCE",
      description:
        "One-on-one and group mentoring sessions connecting aspiring creators with industry professionals and experienced filmmakers.",
      image: "https://i.ibb.co.com/LDWfY30v/20250423-IMG-7482.webp",
      slug: "mentorship-guidance",
      featured: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
      ],
    },
    {
      id: 4,
      number: "04",
      title: "PORTFOLIO DEVELOPMENT",
      description:
        "Comprehensive guidance in building professional portfolios that showcase creative work and industry-ready projects.",
      image: "https://i.ibb.co.com/bMsxhXCp/4.webp",
      slug: "portfolio-development",
      featured: [
        "https://i.ibb.co.com/CshRXrRx/DSCF3167.webp",
        "https://i.ibb.co.com/ch2swK05/DSCF2645.webp",
        "https://i.ibb.co.com/2YMvzMKR/20250425-CPC02305.webp",
      ],
    },
    {
      id: 5,
      number: "05",
      title: "FESTIVAL & COMPETITIONS",
      description:
        "Opportunities to participate in prestigious film festivals and creative competitions, gaining recognition and industry exposure.",
      image: "https://i.ibb.co.com/cKS42FXQ/DSCF2861.webp",
      slug: "festival-competitions",
      featured: [
        "https://i.ibb.co.com/VptL0vnV/DSCF0669.webp",
        "https://i.ibb.co.com/xS6vFWTv/DSCF2710.webp",
        "https://i.ibb.co.com/ymgDfHp7/DSCF8541.webp",
      ],
    },
    {
      id: 6,
      number: "06",
      title: "COLLABORATIVE PROJECTS",
      description:
        "Team-based initiatives where students collaborate on real-world projects, learning industry workflows and teamwork dynamics.",
      image: "https://i.ibb.co.com/99qwvwG7/DSCF0565.webp",
      slug: "collaborative-projects",
      featured: [
        "https://i.ibb.co.com/TMpG1kZx/DSCF3145.webp",
        "https://i.ibb.co.com/C3QWMqWQ/DSCF8466.webp",
        "https://i.ibb.co.com/zjYtdmw/DSCF0562.webp",
      ],
    },
  ];

  const [currentIndexes, setCurrentIndexes] = useState(
    educationSections.map(() => 0)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((curr, idx) => (curr + 1) % educationSections[idx].featured.length)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* === Intro Section === */}
      <section className="text-center pt-28 pb-8 bg-black px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Creative Learning
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-white text-base md:text-lg leading-relaxed">
          We explore and document what happens inside our classrooms.{" "}
          <br className="hidden md:block" />
          From creative practice to mentorship moments, delivering a visual
          record <br className="hidden md:block" />
          of how each story of learning is shaped.
        </p>
      </section>

      {/* === Education Sections === */}
      <section className="bg-black text-white pt-12 pb-8 md:pt-24 md:pb-16 border-t border-gray-800 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1600px] mx-auto flex flex-col divide-y divide-gray-800">
          {educationSections.map((section, idx) => (
            <div
              key={section.slug}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-start py-12 md:py-16 lg:py-20 border-b border-gray-800 last:border-b-0 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left - Number & Title */}
              <div className="flex flex-col justify-start">
                <p className="text-xs md:text-sm text-gray-400 tracking-widest mb-2">
                  {section.number}
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Middle-Left - Description */}
              <div className="text-sm md:text-base text-gray-300 leading-relaxed">
                <p>{section.description}</p>
                <Link
                  to={`/education/${section.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-white hover:text-gray-300 transition font-semibold text-sm"
                >
                  Learn More ↗
                </Link>
              </div>

              {/* Middle-Right - Main Image */}
              <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-lg group">
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Right - Featured Image Slider */}
              <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-lg bg-gray-900">
                {section.featured.map((img, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={img}
                    alt={`featured-${imgIdx}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      imgIdx === currentIndexes[idx] ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                ))}
                {/* Slider Indicators */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                  {section.featured.map((_, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={`h-1 rounded-full transition-all ${
                        imgIdx === currentIndexes[idx]
                          ? "bg-white w-4"
                          : "bg-gray-600 w-1.5"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default EducationPage;