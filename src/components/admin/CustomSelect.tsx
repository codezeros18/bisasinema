import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  ringColor?: string; // biar bisa custom warna fokus
}

export default function CustomSelect({
  label,
  value,
  options,
  onChange,
  ringColor = "#a855f7", // default ungu neon
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-3 rounded-lg 
                   bg-gray-800/70 border border-gray-700 text-gray-100
                   focus:outline-none transition"
        style={{
          boxShadow: open ? `0 0 0 2px ${ringColor}` : undefined,
        }}
      >
        <span>{value}</span>
        <ChevronDown
          size={18}
          className={`transition-transform text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute mt-1 w-full rounded-lg shadow-lg z-50
                     bg-gray-900/95 backdrop-blur-xl border border-gray-700"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition
                          hover:bg-purple-600/40 hover:text-white
                          ${
                            value === option
                              ? "bg-purple-600/60 text-white font-medium"
                              : "text-gray-200"
                          }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
