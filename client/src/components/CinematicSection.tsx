import type { ReactNode } from "react";

interface CinematicSectionProps {
  children: ReactNode;
  height?: string;
}

export default function CinematicSection({
  children,
  height = "120vh",
}: CinematicSectionProps) {
  return (
    <section
      className="snap-start flex items-center"
      style={{ minHeight: height }}
    >
      {children}
    </section>
  );
}
