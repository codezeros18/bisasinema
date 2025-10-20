import { motion } from "framer-motion";

const videoUrl =
  "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1760012984/Untitled_video_-_Made_with_Clipchamp_1_1_d6awwn.mp4";

export default function BisasinemaShowcase() {
  return (
    <section className="w-full text-white pt-20 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
          className="mb-8"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/50">
            About Us
          </h2>
        </motion.div>

        {/* Wrapper video dengan cinematic glow */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden rounded-none"
        >
          {/* Glow halus di belakang video */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 50px rgba(255,255,255,0.07)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <div className="w-[85%] h-[85%] bg-white/10 blur-[120px] opacity-30"></div>
          </motion.div>

          {/* Video */}
          <motion.video
            className="relative w-full h-full object-cover brightness-[0.9]"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false }}
          />

          {/* Overlay text di kiri bawah */}
          <motion.div
            className="absolute bottom-10 left-8 md:left-14 max-w-3xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false }}
          >
            <motion.h1
              className="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 8px rgba(255,255,255,0.25)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              An educational media platform established on{" "}
              <span className="font-bold text-white/90">August 9, 2024</span>,{" "}
              <span className="text-gray-300">
                with a focus on cinema and the filmmaking industry.
              </span>
            </motion.h1>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
