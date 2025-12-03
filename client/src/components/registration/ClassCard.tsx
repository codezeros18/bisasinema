import React from "react";
import { motion } from "framer-motion";
import type { ClassItem } from "./types";

interface Props {
  item: ClassItem;
  onClick: () => void;
}

const ClassCard: React.FC<Props> = ({ item, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        relative cursor-pointer rounded-2xl overflow-hidden 
        shadow-lg group 
        aspect-video
      "
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black/70 via-black/30 to-transparent 
        opacity-100
      " />

      <div
        className="
          absolute bottom-0 left-0 w-full p-5
          translate-y-6 opacity-0 
          group-hover:translate-y-0 group-hover:opacity-100 
          transition-all duration-300
        "
      >
        <p className="text-gray-300 text-sm mt-1 line-clamp-2">
          {item.desc}
        </p>
      </div>

      <div className="absolute top-3 left-3 text-white font-semibold text-base drop-shadow">
        {item.title}
      </div>
    </motion.div>
  );
};

export default ClassCard;
