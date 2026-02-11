import React from "react";
import type { ClassItem } from "./types";

interface Props {
  data: ClassItem;
  onJoin: () => void;  // <-- Tambahkan ini
}

const FeaturedSection: React.FC<Props> = ({ data, onJoin }) => {
  return (
    <div className="max-w-xl">
      <span className="text-sm px-3 py-1 rounded-full bg-white/20 text-white">
        {data.status}
      </span>

      <h1 className="text-5xl font-bold text-white mt-4 drop-shadow-2xl">
        {data.title}
      </h1>

      <p className="text-gray-200 text-lg mt-4 leading-relaxed">
        {data.desc}
      </p>

      <div className="text-gray-300 mt-4 space-y-1 text-sm">
        <p>💰 Harga: Rp {data.price.toLocaleString()}</p>
        <p>📍 Mode: {data.mode}</p>
        <p>👥 Kuota: {data.quota} peserta</p>
      </div>

      {/* JOIN NOW triggers modal */}
      <button
        onClick={onJoin}
        className="
          mt-6 bg-white text-black px-7 py-3
          rounded-full font-semibold hover:bg-gray-100 transition
        "
      >
        Join Now
      </button>
    </div>
  );
};

export default FeaturedSection;
