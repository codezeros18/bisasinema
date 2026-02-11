import { useState } from "react";
import { motion } from "framer-motion";

export default function MediaContentBar() {
  const [isOn, setIsOn] = useState(false);

  const words = "STORIES TOLD THROUGH FRAMES AND MOTION.".split(" ");

  return (
    <header className="w-full text-white py-0 md:py-8 my-8 md:my-14">
      {/* Border top + wrapper dengan jarak kanan kiri */}
      <div className="border-t border-white/10 mx-4 sm:mx-8 lg:mx-16 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          {/* Left: Sound toggle */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 text-xs uppercase tracking-widest opacity-70 flex items-center gap-2">
            <span>SOUND [{isOn ? "ON" : "OFF"}]</span>

            <motion.div
              onClick={() => setIsOn(!isOn)}
              className={`relative w-10 h-5 rounded-full cursor-pointer ${
                isOn ? "bg-yellow-400" : "bg-white/20"
              }`}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                layout
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white"
                animate={{ x: isOn ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.div>
          </div>

          {/* Right: Animated title */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-9 mt-6 sm:mt-0 overflow-hidden">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="text-3xl sm:text-4xl lg:text-[60px] xl:text-[89px] 
                         leading-[30px] md:leading-[50px] lg:leading-[80px]
                         tracking-[-1px] lg:tracking-[-2px]
                         font-extrabold uppercase flex flex-wrap gap-x-3 gap-y-2"
            >
              {words.map((word, wi) => (
                <motion.span key={wi} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        delay: wi * 0.25 + ci * 0.03,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="inline-block text-white"
                      style={{
                        textShadow: `
                          0 0 3px rgba(255,255,255,0.25),
                          0 0 6px rgba(255,255,255,0.15)
                        `,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>
    </header>
  );
}
