import { motion } from "framer-motion";

interface PublicFilterSwitchProps {
  options: string[];
  activeOption: string;
  onFilterChange: (option: string) => void;
}

export default function PublicFilterSwitch({
  options,
  activeOption,
  onFilterChange,
}: PublicFilterSwitchProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-1 rounded-lg flex items-center space-x-1 w-full shadow-lg">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className="relative px-4 py-2 text-sm font-medium transition-colors w-full text-center text-gray-300 hover:text-white"
        >
          {activeOption === option && (
            <motion.div
              layoutId="activeFilterPill"
              className="absolute inset-0 bg-white rounded-md"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative z-10 mix-blend-exclusion">{option}</span>
        </button>
      ))}
    </div>
  );
}
