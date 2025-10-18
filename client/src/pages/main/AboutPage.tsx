import React from 'react';
import { Users, Video, Lightbulb } from 'lucide-react';
import missionPhoto from '../../assets/DSCF0689.jpg';
import bgImage from '../../assets/DSCF0644.jpg';
import lintang1 from '../../assets/lintang1.jpg';
import lintang2 from '../../assets/lintang2.jpg';
import lintang3 from '../../assets/lintang3.jpg';

const teamData = [
  {
    name: "S. Taufiqur Rahman",
    role: "CEO / Content Creator",
    image: lintang1,
    bio: "The visionary behind bìsasínema, responsible for creative direction and strategic partnerships."
  },
  {
    name: "Nimas R. Prameswari",
    role: "Marketing & Partnership",
    image: lintang2,
    bio: "Leads communication and partnership strategies to expand bìsasínema’s reach and collaborations."
  },
  {
    name: "Rizky Dwi Putra",
    role: "Event & Production Lead",
    image: lintang3,
    bio: "Oversees production teams and ensures every project runs smoothly with cinematic quality standards."
  },
];

// --- SERVICES DATA ---
const servicesData = [
  {
    title: "Educational Content",
    icon: Lightbulb,
    description:
      "Workshops, training sessions, and film classes with a practical and professional approach.",
  },
  {
    title: "Event Documentation",
    icon: Video,
    description:
      "Cinematic-style event and concert coverage with bìsasínema’s signature storytelling.",
  },
  {
    title: "Branded Content",
    icon: Users,
    description:
      "Creative collaborations for brand and company storytelling through visual art.",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white font-poppins relative overflow-hidden">
      {/* Background */}
      <img
        src={bgImage}
        alt="Cinematic Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white"
              style={{ textShadow: '0 0 10px rgba(240, 239, 235, 1)' }}
            >
              BEYOND THE CLASSROOM
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-4xl font-light">
              The official platform showcasing the branding, identity, and core information of bìsasínema.
            </p>
          </div>
        </section>

        {/* GENERAL INFO */}
        <section className="py-20 bg-black/60 border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <h2
                className="text-4xl font-bold text-white mb-4"
                style={{ textShadow: '0 0 10px rgba(240, 239, 235, 1)' }}
              >
                What is bìsasínema?
              </h2>
              <p className="text-lg text-gray-300 mb-6 border-l-4 border-white pl-4">
                We are an educational platform in cinema and videography, dedicated to nurturing creative talent.
              </p>
              <p className="text-gray-400">
                Founded in 2020, bìsasínema serves as a collaborative and learning space for young creators to grow within the film and creative content industry.
              </p>
            </div>
            <div className="md:col-span-6 h-64 overflow-hidden">
              <img
                src={missionPhoto}
                alt="bìsasínema team discussing a film project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-4xl font-bold text-center text-white mb-12"
              style={{ textShadow: '0 0 10px rgba(240, 239, 235, 1)' }}
            >
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:shadow-white/30 shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <service.icon
                    size={32}
                    className="text-white mb-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                  />
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
            <h2
              className="text-4xl font-bold text-center text-white mb-12"
              style={{ textShadow: '0 0 10px rgba(240, 239, 235, 1)' }}
            >
              Meet the Core Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.map((member, index) => (
                <div
                  key={index}
                 className="bg-black/40 backdrop-blur-md rounded-xl p-5 transition group hover:shadow-2xl hover:shadow-white/50"

                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover rounded-lg mb-4 grayscale group-hover:grayscale-0 transition duration-500"
                  />
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-sm font-medium text-white-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {member.bio}
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
  