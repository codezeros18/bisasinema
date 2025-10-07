// const WorksPage = () => {
//   return (
//     <div>WorksPage</div>
//   )
// }

// export default WorksPage

import React, { useState, useEffect } from "react";

const WorksPage: React.FC = () => {
  const works = [
    {
      title: "Bahari On Screen",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      title: "Doss Guava XR",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
    },
    {
      title: "SAE Workshop 2025",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    },
    {
      title: "UMN Cinematography Lab",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    },
    {
      title: "Workshop UMN 2025",
      category: "Platform Design",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
    {
      title: "Content and Media Portfolio",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
  ];

  const sliderGroups = [
    [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    ],
    [
      "https://images.unsplash.com/photo-1506765515384-028b60a970df",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1515165562835-c7e66ec0d7f0",
    ],
    [
      "https://images.unsplash.com/photo-1542744173-05336fcc7ad4",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    ],
  ];

  const [currentIndexes, setCurrentIndexes] = useState([0, 0, 0]);

  useEffect(() => {
    const timers = sliderGroups.map((group, idx) =>
      setInterval(() => {
        setCurrentIndexes((prev) => {
          const updated = [...prev];
          updated[idx] = (prev[idx] + 1) % group.length;
          return updated;
        });
      }, 4000)
    );
    return () => timers.forEach((timer) => clearInterval(timer));
  }, [sliderGroups]);

  return (
    <>
      {/* === Intro Section === */}
      <section className="text-center pt-28 pb-8 bg-black px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Our Works
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-white text-base md:text-lg leading-relaxed">
          We collaborate with various brands and creators to craft <br className="hidden md:block" />
          meaningful visual works, from branded content to creative project <br className="hidden md:block" />
          documentation and media activities.
        </p>
      </section>

      {/* === Works Grid Section === */}
      <section className="bg-black py-8 px-6 md:px-10 border-t border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {works.map((work, index) => (
            <div
              key={index}
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
              <button className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition">
                ↗ Expand
              </button>
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
                    key={idx}
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







