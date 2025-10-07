import { motion } from "framer-motion";
import { Calendar, Laptop } from "lucide-react";
import works1 from "../assets/dossguavaxr/DSCF0578.jpg";
import works2 from "../assets/sae/20250424-DSC08625.jpg";

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
      className="w-full bg-black text-white overflow-x-hidden 
                 px-5 sm:px-8 lg:px-20 py-20 space-y-28"
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
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5 max-w-xl mx-auto md:mx-0"
            >
              <p className="text-white/50 uppercase text-xs font-medium tracking-widest">
                {item.category}
              </p>

              <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight">
                {item.title}
                <br />
                <span className="font-normal opacity-90">{item.subtitle}</span>
              </h2>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                {item.description}
              </p>

              {/* DETAILS */}
              <div className="mt-6 flex flex-col gap-2 text-sm text-white/70">
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
                    <span className="font-semibold text-white/90">Schedule:</span>{" "}
                    {item.schedule}
                  </span>
                </div>
              </div>

              <button className="mt-8 inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all text-sm tracking-wide">
                <span className="text-lg">→</span> Join Now
              </button>
            </motion.div>

            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-2xl mx-auto md:mx-0"
            >
              <div className="rounded-none overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover brightness-[0.95] hover:brightness-110 transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
