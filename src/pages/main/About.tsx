import React, { useState } from "react";
import { Users, Video, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// ==========================================
// IMPORT ASSETS (Pastikan path ini sesuai dengan struktur folder Anda)
// ==========================================
import videoBg1 from "../../assets/koko.mp4";
import heroVideo from "../../assets/marko.mp4";

// Import Gambar untuk About Us
import aboutUsImg from "../../assets/aboutus.jpg"; 

// Import 10 Gambar untuk Collage CTA
import img1 from "../../assets/About1.jpg";
import img2 from "../../assets/About2.jpg";
import img3 from "../../assets/About3.jpg";
import img4 from "../../assets/About4.png";
import img5 from "../../assets/About5.png";
import img6 from "../../assets/About6.png";
import img7 from "../../assets/About7.png";
import img8 from "../../assets/About8.jpg";
import img9 from "../../assets/About9.jpg";
import img10 from "../../assets/About10.png";

// ==========================================
// DATA
// ==========================================
const servicesData = [
  {
    title: "Educational Content",
    icon: Lightbulb,
    description: "Practical based film & videography classes, workshops, and training programs.",
  },
  {
    title: "Event Documentation",
    icon: Video,
    description: "Cinematic coverage for events, concerts, talks, and creative showcases.",
  },
  {
    title: "Branded Content",
    icon: Users,
    description: "Creative storytelling & video production for brands and community partners.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const AboutPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  // Setup Logic Parallax
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 1000], [0, 400]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const scrollToAboutStart = () => {
    document.getElementById("about-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-poppins relative overflow-hidden bg-black text-white">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative z-20">
        <section className="h-screen w-full flex justify-center items-center relative overflow-hidden border-b border-gray-800">
          
          <motion.video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{ y: videoY }} 
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <motion.div
            className="relative z-30 text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-[6px] drop-shadow-lg">
              Who We Are
            </h1>

            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto font-light tracking-wide drop-shadow-md">
              A cinema learning ecosystem powered by practice & collaboration.
            </p>

            <button
              onClick={scrollToAboutStart}
              className="mt-10 px-12 py-4 border border-white/40 text-white uppercase tracking-[6px] text-sm hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
            >
              Learn more about us
            </button>
          </motion.div>
        </section>
      </div>

      {/* ================= ZIG-ZAG LAYOUT ================= */}
      <section id="about-start" className="w-full flex flex-col py-28 md:py-36 border-b border-gray-800 bg-black relative z-30 space-y-32 md:space-y-40">
        
        {/* BARIS 1: Gambar Kiri, Teks Kanan */}
        <div className="w-full px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <motion.div 
            className="w-full md:w-[45%] relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <img
              src={aboutUsImg}
              alt="About Bisasinema"
              className="w-full h-auto aspect-[21/9] md:aspect-[16/9] object-cover  shadow-2xl relative z-10 grayscale hover:grayscale-0 transition duration-700 border border-gray-800"
            />
          </motion.div>

          <motion.div 
            className="w-full md:w-[45%] flex flex-col items-start text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h4 className="text-white-600 font-bold uppercase tracking-[4px] text-sm mb-4">
              About Us
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[2px] leading-tight mb-8 text-white uppercase">
              What is<br />Bìsasínema?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light border-l-2 border-gray-700 pl-5">
              Founded on August 9, 2024, bìsasínema is an educational media platform dedicated to the art and industry of filmmaking. Our mission is to make film education accessible, engaging, and highly relevant for students, film enthusiasts, and aspiring creatives. By leveraging digital content, interactive workshops, and creative collaborations, we strive to connect professional industry insights with grassroots learning.
            </p>
          </motion.div>

        </div>

        {/* BARIS 2: Teks Kiri, Video Kanan */}
        <div className="w-full px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <motion.div 
            className="w-full md:w-[45%] flex flex-col items-start text-left order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[2px] leading-tight mb-8 text-white uppercase">
              Beyond the<br />Classroom
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-4 border-l-2 border-gray-700 pl-5">
              We take film education into real experiences — empowering creators to grow through practice, exposure, and collaboration. More than just a class, we provide an environment where ideas grow with care, protecting the creative intent behind every project.
            </p>
          </motion.div>

          <motion.div 
            className="w-full md:w-[45%] relative order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-full aspect-video md:aspect-[16/9] relative overflow-hidden shadow-2xl border border-gray-800">
              <video
                src={videoBg1}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full transition z-40 backdrop-blur-md"
              >
                  {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
              </button>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ================= SERVICES (DESAIN BARU REFERENSI ANTELOPE) ================= */}
      <section className="py-28 md:py-36 border-b border-gray-800 relative z-30 bg-black">
          {/* UBAH: Menggunakan w-full agar layout grid membentang melebar */}
          <div className="max-w-8xl mx-auto px-8 lg:px-24">
            
            {/* Header Section */}
            <motion.div
                className="text-center mb-20 flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h4 className="text-white-600 font-bold uppercase tracking-[4px] text-1xl mb-4">
                  Our Focus
                </h4>
                <h2 className="text-7xl md:text-7xl font-bold uppercase tracking-[2px] text-white">
                  What We Deliver
                </h2>
            </motion.div>

            {/* Grid 3 Kolom - UBAH: Mengurangi gap agar teks di kolom bisa memanjang */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                {servicesData.map((s, i) => (
                <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className="flex flex-col items-start text-left"
                >
                    {/* Icon */}
                    <div className="mb-6 text-white">
                      <s.icon size={65} strokeWidth={1.5} />
                    </div>

                    {/* Judul */}
                    <h3 className="text-4xl lg:text-3xl font-bold mb-4 tracking-[1px] text-white">
                      {s.title}
                    </h3>
                    
                    {/* Deskripsi - UBAH: Ditambahkan w-full dan perbaikan tipe class lg:text-xl */}
                    <p className="w-full text-gray-400 font-light text-xl lg:text-xl leading-relaxed">
                      {s.description}
                    </p>
                </motion.div>
                ))}
            </div>

          </div>
      </section>

      {/* ================= CALL TO ACTION (COLLAGE) ================= */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-black border-t border-gray-800">
        
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-5 gap-0 opacity-70 pointer-events-none">
          {[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].map((src, index) => (
            <div key={index} className="w-full h-full relative border border-black/50">
              <img
                src={src}
                alt={`Bisasinema Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/50 z-10" />

        <motion.div
          className="relative z-20 text-center px-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[8px] text-white drop-shadow-2xl">
            For Further Information
          </h2>
          
          <p className="mt-6 mb-12 text-gray-100 font-light tracking-[4px] text-sm md:text-base opacity-90">
            LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER.
          </p>

          <a
            href="/contact"
            className="px-12 py-4 border-2 border-white text-white uppercase tracking-[6px] text-sm font-bold hover:bg-white hover:text-black transition-all duration-500 ease-in-out shadow-lg"
          >
            Contact
          </a>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;