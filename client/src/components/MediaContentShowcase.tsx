import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const img1 = "https://i.ibb.co.com/xqLTYTp4/6.webp";
const img2 = "https://i.ibb.co.com/39jfDjKT/5.webp";
const img3 = "https://i.ibb.co.com/bMsxhXCp/4.webp";
const img4 = "https://i.ibb.co.com/fG4b19Sx/3.webp";

const media = [
  { type: "image", src: img1, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img2, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img3, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img4, link: "https://www.instagram.com/bisasinema/" },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759829687/Untitled_video_-_Made_with_Clipchamp_xfg5mu.mp4",
    link: "https://www.instagram.com/reel/DOarCMECQmm/",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759830708/b_vhpaax.mp4",
    link: "https://www.instagram.com/reel/DPQ4TIYCS7j/",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759831140/a_ga2uds.mp4",
    link: "https://www.instagram.com/bisasinema/",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759831941/e_rkzzhk.mp4",
    link: "https://www.instagram.com/bisasinema/",
  },
];

function shuffleArray(array: { type: string; src: string; link: string }[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MediaContentShowcase() {
  const shuffledMedia = shuffleArray(media);

  // 🧩 Ref array to ensure autoplay works on all videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true; // force mute to allow autoplay
        video.play().catch(() => {}); // ignore any promise rejection
      }
    });
  }, []);

  return (
    <section className="w-full text-white px-6 sm:px-10 lg:px-20 py-4 md:py-20 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {shuffledMedia.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.05,
            }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden border border-white/10 rounded-none aspect-[3/4] block group"
          >
            {/* Media */}
            {item.type === "image" ? (
              <motion.img
                src={item.src}
                alt={`media-${index}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <motion.video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
            )}

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Glow */}
            <motion.div
              className="absolute inset-0 border border-white/10 rounded-none"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 10px rgba(255,255,255,0.1)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
