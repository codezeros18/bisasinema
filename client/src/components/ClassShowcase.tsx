import { motion } from "framer-motion";
import { Calendar, Laptop } from "lucide-react";

const works1 = "https://i.ibb.co.com/XZktpkt1/20250423-IMG-7491.webp";
const works2 = "https://i.ibb.co.com/NdNfPhZZ/20250424-DSC01568.webp";

const classes = [
  {
    title: "Creative Affair",
    subtitle: "with Celine Song & Eva Victor",
    category: "Podcast",
    description:
      "A creative class exploring cross-disciplinary collaboration and the discovery of new ideas in the world of art and media.",
    format: "Offline Workshop",
    schedule: "Every Saturday, 10.00 – 13.00 WIB",
    img: works1,
  },
  {
    title: "Design Dialogues",
    subtitle: "Exploring Modern Aesthetics",
    category: "Talk Series",
    description:
      "An open discussion with design practitioners about the direction of modern aesthetics, visual storytelling, and conceptual approaches.",
    format: "Online via Zoom",
    schedule: "Thursday, 19.00 – 21.00 WIB",
    img: works2,
  },
];

export default function ClassShowcase() {
  return (
    <section
      className="w-full text-white overflow-x-hidden 
                 px-5 sm:px-16 py-4 md:py-20 space-y-28"
    >
      {classes.map((item, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-10 lg:gap-20 items-center ${
              isReversed ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* TEXT SIDE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-5 max-w-xl mx-auto md:mx-0"
            >
              <motion.p
                className="text-white/50 uppercase text-xs font-medium tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={{ once: false }}
              >
                {item.category}
              </motion.p>

              {/* Title + Subtitle */}
              <motion.h2
                className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                viewport={{ once: false }}
              >
                {item.title}
                <br />
                <motion.span
                  className="font-normal opacity-90"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  viewport={{ once: false }}
                >
                  {item.subtitle}
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: false }}
              >
                {item.description}
              </motion.p>

              {/* DETAILS */}
              <motion.div
                className="mt-6 flex flex-col gap-2 text-sm text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-2">
                  <Laptop size={16} className="text-white/50 shrink-0" />
                  <span>
                    <span className="font-semibold text-white/90">Format:</span>{" "}
                    {item.format}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-white/50 shrink-0" />
                  <span>
                    <span className="font-semibold text-white/90">
                      Schedule:
                    </span>{" "}
                    {item.schedule}
                  </span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: false }}
                className="mt-8 inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all text-sm tracking-wide"
              >
                <span className="text-lg">→</span> Join Now
              </motion.button>
            </motion.div>

            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="relative w-full max-w-2xl mx-auto md:mx-0 group"
            >
              <div className="relative overflow-hidden border border-white/10">
                {/* Image */}
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover brightness-[0.95] transition-all duration-700 ease-out group-hover:brightness-110 group-hover:scale-[1.03]"
                />

                {/* Subtle glow animation */}
                <motion.div
                  className="absolute inset-0 rounded-none pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 8px rgba(255,255,255,0.1)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
