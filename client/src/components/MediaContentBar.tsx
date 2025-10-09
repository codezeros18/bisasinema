import { useState } from "react";
import { motion } from "framer-motion";

export default function MediaContentBar() {
  const [isOn, setIsOn] = useState(false);

  return (
    <header className="w-full bg-black text-white py-0 md:py-8 my-8 md:my-14">
      {/* Border top + wrapper dengan jarak kanan kiri */}
      <div className="border-t border-white/10 mx-4 sm:mx-8 lg:mx-16 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          {/* Kiri */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 text-xs uppercase tracking-widest opacity-70 flex items-center gap-2">
            <span>SOUND [{isOn ? "ON" : "OFF"}]</span>

            {/* Toggle */}
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

          {/* Kanan */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-9 mt-6 sm:mt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-[60px] xl:text-[89px] leading-[40px] md:leading-[50px] lg:leading-[80px] tracking-[-1px] lg:tracking-[-2px] font-extrabold uppercase">
              Stories Told Through Frames and Motion.
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
