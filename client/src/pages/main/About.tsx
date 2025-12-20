import React from "react";
import { Users, Video, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import videoBg1 from "../../assets/koko.mp4";
import bgImage from "../../assets/DSCF0657.jpg";
import heroVideo from "../../assets/marko.mp4";
import lintang1 from "../../assets/lintang1.jpg";
import lintang2 from "../../assets/lintang2.jpg";
import lintang3 from "../../assets/lintang3.jpg";

const teamData = [
  {
    name: "S. Taufiqur Rahman",
    role: "CEO / Content Creator",
    image: lintang1, 
    video: videoBg1,
    bio: "The visionary behind bìsasínema, responsible for creative direction and strategic partnerships.",
  },
  {
    name: "Nimas R. Prameswari",
    role: "Marketing & Partnership",
    image: lintang2,
    bio: "Leads communication and partnership strategies to expand bìsasínema’s collaborations.",
  },
  {
    name: "Rizky Dwi Putra",
    role: "Event & Production Lead",
    image: lintang3,
    bio: "Ensures every event and production maintains cinematic storytelling standards.",
  },
];

const aboutCards = [
  {
    title: "Hands-On Learning",
    icon: Lightbulb,
    text: "Real production-based learning through workshops, labs, and camera simulations led by professionals.",
  },
  {
    title: "Industry Exposure",
    icon: Users,
    text: "Connecting emerging filmmakers with brands, networks, and portfolio opportunities.",
  },
  {
    title: "Creator Showcase",
    icon: Video,
    text: "Film screenings, projects, and creator highlights that bring works into the spotlight.",
  },
];

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

const AboutPage: React.FC = () => {
  /** ✅ STATE FOR SOUND CONTROL */
  const [isMuted, setIsMuted] = React.useState(true);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const spawnRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const circle = document.createElement("span");
    const size = Math.max(card.clientWidth, card.clientHeight);

    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - card.getBoundingClientRect().left - size / 2}px`;
    circle.style.top = `${e.clientY - card.getBoundingClientRect().top - size / 2}px`;
    circle.className = "ripple";

    card.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const scrollToAboutStart = () => {
    document.getElementById("about-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen font-poppins relative overflow-hidden bg-center bg-cover text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20">

        {/* HERO SECTION */}
        <section className="h-screen w-full flex justify-center items-center relative overflow-hidden border-b border-gray-700">
          <motion.video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <motion.div
            className="relative z-30 text-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-[6px]">
              Who We Are
            </h1>

            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              A cinema learning ecosystem powered by practice & collaboration.
            </p>

            <button
              onClick={scrollToAboutStart}
              className="mt-10 px-8 py-3 border-2 border-white rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all"
            >
              Learn more about us
            </button>
          </motion.div>
        </section>

        {/* ABOUT CARDS */}
        <section
          id="about-start"
          className="min-h-screen w-full flex flex-col justify-center items-center bg-black border-b border-gray-700 py-24"
        >
          <motion.div
            className="text-center px-6 mb-14"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-[6px]">
              Beyond the Classroom
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto mt-4">
              We take film education into real experiences — empowering creators to grow through practice, exposure, and collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl w-full px-6">
            {aboutCards.map((c, i) => (
              <motion.div
                key={c.title}
                onClick={spawnRipple}
                initial={{ opacity: 0, y: 70, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.3, duration: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white/5 backdrop-blur-xl p-6 border border-gray-800 cursor-pointer overflow-hidden"
              >
                <div className="flex justify-center mb-5 text-white/60 group-hover:text-white transition">
                  <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i }}>
                    <c.icon size={50} />
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold uppercase text-center tracking-[3px]">
                  {c.title}
                </h3>

                <p className="text-gray-400 text-center mt-3 font-light text-sm md:text-base">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT PLATFORM */}
        <section className="py-20 bg-black/40 border-b border-gray-600">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <h2 className="text-4xl font-bold uppercase tracking-[4px] mb-4">
                What is bìsasínema?
              </h2>
              <p className="text-lg text-gray-300 pl-4 border-l-2 border-gray-500">
                A film-creator driven education platform and growing creative community.
              </p>
              <p className="text-gray-200 font-light mt-4">
                We shape young storytellers into real creators through production, collaboration, and audience exposure.
              </p>
            </div>

            {/* ✅ VIDEO CARD WITH UNMUTE */}
            <div className="md:col-span-6 h-72 overflow-hidden border border-gray-700 relative">
              <motion.video
                src={videoBg1}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/80 text-white p-2 transition z-40"
              >
                {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 bg-black/60 border-b border-gray-600">
          <motion.h2
            className="text-4xl md:text-7xl font-bold text-center mb-14 uppercase tracking-[6px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What We Deliver
          </motion.h2>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {servicesData.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                whileHover={{ scale: 1.04 }}
                className="group bg-white/5 p-7 border border-gray-800 text-center"
              >
                <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i }} className="flex justify-center mb-4 opacity-60 group-hover:opacity-100 transition">
                  <s.icon size={48}/>
                </motion.div>

                <h3 className="text-2xl font-bold uppercase mb-3 tracking-[4px]">
                  {s.title}
                </h3>
                <p className="text-gray-400 font-light">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        
        <section className="py-28 bg-black">
          <motion.h2
            className="text-4xl md:text-7xl font-bold text-center mb-14 uppercase tracking-[6px]"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            Meet the Vision Forgers
          </motion.h2>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

           {/* ✅ CARD 1 = IMAGE ONLY */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9 }}
  whileHover={{ scale: 1.04 }}
  className="group bg-white/5 p-6 border border-gray-800 shadow-xl text-center"
>
  <div className="relative w-full h-64 overflow-hidden border border-gray-700 mb-5">
    <img
      src={teamData[0].image}
      alt={teamData[0].name}
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
    />
  </div>

  <h3 className="text-2xl font-bold uppercase tracking-[4px]">
    {teamData[0].name}
  </h3>
  <p className="text-xs uppercase font-semibold text-gray-500 tracking-[3px] mb-3">
    {teamData[0].role}
  </p>
  <p className="text-gray-400 font-light text-sm">
    {teamData[0].bio}
  </p>
</motion.div>

{/* ✅ CARD 2 & 3 = IMAGE */}
{teamData.slice(1).map((m, i) => (
  <motion.div
    key={m.name}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: i * 0.15 }}
    whileHover={{ scale: 1.03 }}
    className="group bg-white/5 p-6 border border-gray-800 shadow-xl text-center"
  >
    <div className="w-full h-64 overflow-hidden border border-gray-700 mb-5">
      <img
        src={m.image}
        alt={m.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />
    </div>

    <h3 className="text-2xl font-bold uppercase tracking-[4px]">
      {m.name}
    </h3>
    <p className="text-xs uppercase font-semibold text-gray-500 tracking-[3px] mb-3">
      {m.role}
    </p>
    <p className="text-gray-400 font-light text-sm">
      {m.bio}
    </p>
  </motion.div>
))}

            

          </div>
        </section>

      </div>

      {/* RIPPLE STYLE */}
      <style>{`
        .ripple {
          position: absolute;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>

    </div>
  );
};

export default AboutPage;