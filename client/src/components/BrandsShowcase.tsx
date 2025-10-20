import { motion } from "framer-motion";

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
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
  { name: "Insta360", logo: "https://i.ibb.co.com/4ZfQRPfS/insta360-seeklogo.png" },
  { name: "Universitas Multimedia Nusantara", logo: "https://i.ibb.co.com/mYCK12n/universitas-multimedia-nusantara-umn-seeklogo.png" },
  { name: "Aputure", logo: "https://i.ibb.co.com/N0L4x2X/aputure-seeklogo.png" },
];

export default function BrandsShowcase() {
  return (
    <section className="relative w-full text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* subtle cinematic glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] bg-white/10 blur-[120px] rounded-full opacity-30"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-sm uppercase tracking-widest text-gray-400 mb-3"
        >
          Brands We Collaborate With
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-3xl sm:text-4xl lg:text-6xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
        >
          Trusted by Leading Global Brands
        </motion.h1>
      </div>

      <motion.div
        className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-12 items-center justify-items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name + i}
            className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            viewport={{ once: false }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-20 w-20 md:h-24 md:w-24 object-contain invert brightness-0 saturate-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
