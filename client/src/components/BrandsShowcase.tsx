import React from "react";

const brands = [
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
];

export default function BrandsShowcase() {
  return (
    // bg-[#0a0a0a]
    <section className="w-full bg-black text-white py-24 px-6 md:px-12 lg:px-24"> 
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          Brands We Collaborate With
        </h2>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold">
          Trusted by Leading Global Brands
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-12 items-center justify-items-center">
        {brands.map((brand) => (
          <div key={brand.name} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-28 w-28 md:h-32 md:w-32 object-contain invert brightness-0 saturate-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
