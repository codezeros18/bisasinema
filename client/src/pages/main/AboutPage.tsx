import React from 'react';
import { Users, Video, Lightbulb } from 'lucide-react';
import missionPhoto from '../../assets/DSCF0689.jpg';
import bgImage from '../../assets/DSCF2958.jpg';
import lintang1 from '../../assets/lintang1.jpg';
import lintang2 from '../../assets/lintang2.jpg';
import lintang3 from '../../assets/lintang3.jpg';



const teamData = [
  {
    name: "S. Taufiqur Rahman",
    role: "CEO / Content Creator",
    image: lintang1,
    bio: "Visioner di balik bìsasínema, bertanggung jawab atas arah konten dan kemitraan strategis."
  },
  {
    name: "Nimas R. Prameswari",
    role: "Marketing & Partnership",
    image: lintang2,
    bio: "Mengelola strategi komunikasi dan kemitraan untuk memperluas jangkauan serta kolaborasi bìsasínema."
  },
  {
    name: "Rizky Dwi Putra",
    role: "Event & Production Lead",
    image: lintang3,
    bio: "Memimpin tim produksi dan memastikan setiap proyek berjalan lancar dengan standar sinematik tinggi."
  },
];

// --- DATA LAYANAN ---
const servicesData = [
  { title: "Konten Edukasi", icon: Lightbulb, description: "Workshop, pelatihan, dan kelas sinema dengan pendekatan praktis dan profesional." },
  { title: "Dokumentasi Event", icon: Video, description: "Peliputan dan dokumentasi acara atau konser dengan gaya sinematik khas bìsasínema." },
  { title: "Branded Content", icon: Users, description: "Kolaborasi kreatif untuk branding produk dan perusahaan melalui karya visual." },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white font-poppins relative overflow-hidden">

      {/* Background */}
      <img
        src={bgImage}
        alt="Background Sinematik"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Konten utama */}
      <div className="relative z-20">

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-yellow-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.6)]"
            >
              BEYOND THE CLASSROOM
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-4xl font-light">
              Menjadi platform resmi yang menampilkan branding, identitas, dan informasi utama bìsasínema.
            </p>
          </div>
        </section>

        {/* GENERAL INFO */}
        <section className="py-20 bg-black/60 border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(255,165,0,0.6)]">
                Apa Itu Bìsasínema?
              </h2>
              <p className="text-lg text-gray-300 mb-6 border-l-4 border-yellow-500 pl-4">
                Kami adalah wadah edukasi sinema dan videografi yang berkomitmen mencetak kreator berbakat.
              </p>
              <p className="text-gray-400">
                Berdiri sejak 2020, bìsasínema hadir sebagai ruang pembelajaran dan kolaborasi untuk mengembangkan talenta muda dalam industri film dan konten kreatif.
              </p>
            </div>
            <div className="md:col-span-6 h-64 rounded-xl border border-yellow-500/30 shadow-2xl overflow-hidden">
              <img
                src={missionPhoto}
                alt="Tim Bìsasínema sedang berdiskusi tentang proyek film"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12 drop-shadow-[0_0_15px_rgba(255,140,0,0.6)]">
              Layanan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-yellow-400/20 p-6 rounded-xl hover:shadow-yellow-400/30 shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <service.icon size={32} className="text-yellow-400 mb-4 drop-shadow-[0_0_10px_rgba(255,165,0,0.6)]" />
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-20 bg-black/60 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12 drop-shadow-[0_0_15px_rgba(255,140,0,0.6)]">
              Meet The Core Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.map((member, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-md border border-yellow-400/20 rounded-xl p-5 hover:shadow-2xl hover:shadow-yellow-400/20 transition group"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover rounded-lg mb-4 grayscale group-hover:grayscale-0 transition duration-500"
                  />
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-sm font-medium text-yellow-400 drop-shadow-[0_0_10px_rgba(255,140,0,0.6)]">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {member.role === "CEO / Content Creator"
                      ? "Visioner di balik bìsasínema, bertanggung jawab atas arah konten dan kemitraan strategis."
                      : "Bio singkat peran dan tanggung jawab utama tim."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
