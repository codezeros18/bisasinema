interface FilterSwitchProps {
  options: string[];
  activeOption: string;
  onFilterChange: (option: string) => void;
}

export default function FilterSwitch({ options, activeOption, onFilterChange }: FilterSwitchProps) {
  return (
    <div className="
      bg-white/10 backdrop-blur-md border border-white/10 p-1 rounded-lg 
      grid grid-cols-2 md:flex shadow-lg w-full
    ">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 text-center ${
            activeOption === option
              ? "bg-white text-black shadow-md"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}