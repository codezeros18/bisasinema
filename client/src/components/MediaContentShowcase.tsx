import { motion } from "framer-motion";

const img1 = "https://i.ibb.co.com/xqLTYTp4/6.webp";
const img2 = "https://i.ibb.co.com/39jfDjKT/5.webp";
const img3 = "https://i.ibb.co.com/bMsxhXCp/4.webp";
const img4 = "https://i.ibb.co.com/fG4b19Sx/3.webp";

// ✅ Ganti dengan video Cloudinary dan link Instagram-nya
const media = [
  { type: "image", src: img1, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img2, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img3, link: "https://www.instagram.com/bisasinema/" },
  { type: "image", src: img4, link: "https://www.instagram.com/bisasinema/" },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759829687/Untitled_video_-_Made_with_Clipchamp_xfg5mu.mp4",
    link: "https://www.instagram.com/reel/DOarCMECQmm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dn5lgf4o9/video/upload/v1759830708/b_vhpaax.mp4",
    link: "https://www.instagram.com/reel/DPQ4TIYCS7j/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==e",
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

// ✅ Randomize order
function shuffleArray(array: { type: string; src: string; link: string }[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MediaContentShowcase() {
  const shuffledMedia = shuffleArray(media);

  return (
    <section className="w-full bg-black text-white px-6 sm:px-10 lg:px-20 py-20 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {shuffledMedia.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="overflow-hidden border border-white/10 rounded-none aspect-[3/4] block"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`media-${index}`}
                className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
