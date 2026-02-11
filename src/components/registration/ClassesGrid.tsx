import React from "react";
import type { ClassItem } from "./types";
import ClassCard from "./ClassCard";

interface Props {
  data: ClassItem[];
  onSelect: (item: ClassItem) => void;
}

const ClassesGrid: React.FC<Props> = ({ data, onSelect }) => {
  return (
    <div className="w-full">
      <h2 className="text-white text-lg font-semibold mb-3">More Classes</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <ClassCard key={item.id} item={item} onClick={() => onSelect(item)} />
        ))}
      </div>
    </div>
  );
};

export default ClassesGrid;
