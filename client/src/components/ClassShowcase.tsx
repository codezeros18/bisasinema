import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Class } from "../types";
import img1 from "../assets/DSCF0568.jpg";

/* ========= MOTION VARIANTS ========= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function HomeCinematicEditorial() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/classes`
        );
        const data: Class[] = await res.json();
        setClasses(data.slice(0, 2));
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <section className="relative w-full bg-black text-white px-6 sm:px-10 lg:px-16 py-28 overflow-hidden">
      <div className="max-w-8xl mx-auto space-y-16">

        {/* ================= ROW 1 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* IMAGE + FOOTNOTE */}
          <motion.div
            variants={fadeScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="md:col-span-3 space-y-3"
          >
            <img
              src={img1}
              alt="Bisasinema Studio"
              className="w-full aspect-square object-cover"
            />

            <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/60">
              <span>BÌSASÍNEMA</span>
              <span>©2023</span>
            </div>
          </motion.div>

          {/* TITLE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-9"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/50 mb-6">
              <motion.span
                whileHover={{ rotate: 20, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20"
              >
                <Sparkles size={14} />
              </motion.span>
              Incredible Agency
            </div>

            <h1 className="
              text-[38px]
              sm:text-[56px]
              lg:text-[72px]
              leading-[1.1]
              font-semibold
              tracking-tight
            ">
              BEYOND THE CLASSROOM
              WHO NEVER
              <br />
              STOP LEARNING.
            </h1>
          </motion.div>
        </div>


        {/* ================= ROW 2 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* LEFT TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="md:col-span-4 space-y-5"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/50">
              <Sparkles size={14} />
              Our Perspective
            </div>

            <p className="text-white/70 leading-relaxed text-base max-w-sm">
              We shape creative minds through cinematic language,
              visual discipline, and intentional storytelling.
            </p>
          </motion.div>

          {/* RIGHT VISUALS */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.4 }}
  transition={{ duration: 1.1 }}
  className="
    md:col-span-8
    grid
    grid-cols-2
    md:grid-cols-12
    gap-6
  "
>
  {/* LANDSCAPE — 2/3 WIDTH */}
  <div className="col-span-2 md:col-span-6">
    <img
      src={
        classes[0]?.link_thumbnail ||
        'https://placehold.co/800x400/111/fff'
      }
      alt="Class Landscape"
      className="w-full h-[220px] object-cover"
    />
  </div>

  {/* PORTRAIT — 1/3 WIDTH */}
  <div className="col-span-1 md:col-span-3">
    <img
      src={
        classes[1]?.link_thumbnail ||
        'https://placehold.co/400x600/111/fff'
      }
      alt="Class Portrait"
      className="w-full h-[220px] object-cover"
    />
  </div>

  {/* CTA */}
  <motion.a
    href="/registrations"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    className="
      col-span-1
      md:col-span-3
      h-[220px]
      bg-orange-500
      text-black
      p-6
      flex
      flex-col
      justify-between
      touch-manipulation
    "
  >
    <span className="text-xs font-semibold uppercase tracking-widest">
      Explore
      <br />
      More Classes
    </span>
    <ArrowUpRight />
  </motion.a>
</motion.div>

        </div>
      </div>
    </section>
  );
}
