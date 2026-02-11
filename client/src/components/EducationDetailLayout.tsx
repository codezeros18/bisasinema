import React from "react";
import { useNavigate } from "react-router-dom";

interface EducationData {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  featured: string[];
  fullDescription?: string;
  gallery?: string[];
}

interface Props {
  education: EducationData;
}

const EducationDetailLayout: React.FC<Props> = ({ education }) => {
  const navigate = useNavigate();

  // ambil 2 foto untuk bagian kanan
  const leftImage = education.gallery?.[0] || education.featured[0];
  const rightImage = education.gallery?.[1] || education.featured[1];

  return (
    <div className="w-full min-h-screen bg-black text-white pt-20 px-6 md:px-20">

      {/* Back button */}
      <button
        onClick={() => navigate("/education")}
        className="text-gray-400 hover:text-white text-sm mb-10"
      >
        ← Back
      </button>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT TEXT */}
        <div className="flex flex-col gap-6 md:col-span-1">

          <p className="text-xs text-gray-500 tracking-widest">
            {education.number}
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {education.title}
          </h1>

          <p className="text-gray-300 leading-relaxed">
            {education.fullDescription || education.description}
          </p>

          <div className="flex flex-col gap-1 mt-6">
            <p className="text-sm text-gray-500">Category</p>
            <p className="text-lg">{education.title}</p>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">

          {/* Left Image */}
          <div className="w-full aspect-[3/4] overflow-hidden rounded-xl">
            <img
              src={leftImage}
              className="w-full h-full object-cover hover:scale-105 transition-all"
              alt="gallery"
            />
          </div>

          {/* Right Image */}
          <div className="w-full aspect-[3/4] overflow-hidden rounded-xl">
            <img
              src={rightImage}
              className="w-full h-full object-cover hover:scale-105 transition-all"
              alt="gallery"
            />
          </div>

        </div>
      </div>

      {/* Optional Gallery Grid */}
      {education.gallery && education.gallery.length > 2 && (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.gallery.slice(2).map((img, idx) => (
            <div
              key={idx}
              className="w-full aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={img}
                className="w-full h-full object-cover hover:scale-105 transition-all"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default EducationDetailLayout;
