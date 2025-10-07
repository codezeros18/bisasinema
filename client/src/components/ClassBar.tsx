import { useState } from "react";
import { motion } from "framer-motion";

export default function ClassBar() {
  const [isOn, setIsOn] = useState(false);

  return (
<header className="w-full bg-black text-white py-0 md:py-8 my-8 md:my-14">
  <div className="border-t border-white/10 mx-4 sm:mx-8 lg:mx-18 pt-6">
    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
      {/* Left Section: Headline */}
      <div className="col-span-12 md:col-span-8">
        <h1 className="
          text-4xl sm:text-5xl lg:text-[80px]
          leading-tight lg:leading-[75px]
          tracking-[-1px] lg:tracking-[-2px]
          font-extrabold uppercase
          max-w-[90%] sm:max-w-[750px] lg:max-w-[900px]
        ">
          DESIGNED FOR CREATORS WHO NEVER STOP LEARNING.
        </h1>
      </div>

{/* Right Section: Filter Switch */}
<div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-end gap-3 text-sm tracking-widest uppercase">
  <span className="opacity-70">Mode</span>

  {/* Toggle */}
  <motion.div
    onClick={() => setIsOn(!isOn)}
    className={`relative w-20 h-6 rounded-full cursor-pointer border border-white/20 
      ${isOn ? "bg-yellow-400/20" : "bg-white/10"}`}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <motion.div
      layout
      className="absolute top-[2px] left-[2px] w-[38px] h-[20px] rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold"
      animate={{ x: isOn ? 38 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {isOn ? "ONLINE" : "OFFLINE"}
    </motion.div>
  </motion.div>
</div>

    </div>
  </div>
</header>

  );
}
