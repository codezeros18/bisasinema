import { useRef, useEffect } from "react";

import works1 from "../assets/dossguavaxr/DSCF0578.jpg";
import works2 from "../assets/sae/20250424-DSC08625.jpg";
import works3 from "../assets/bahari/DSCF2871.jpg";
import works4 from "../assets/umncinema/20250425-_VS_0247.jpg";
import works5 from "../assets/anniversary/DSCF4763.jpg";

const images = [works1, works2, works3, works4, works5];

const WorksCarousel = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const animationFrameRef = useRef(0);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // nilai dasar
  const DEFAULT_SPEED = -0.5;
  const MAX_SPEED = 5;
  const ACCELERATION = 1;
  const SMOOTHNESS = 0.1; // semakin kecil, semakin lembut transisinya

  const currentSpeed = useRef(DEFAULT_SPEED);
  const targetSpeed = useRef(DEFAULT_SPEED);
  const defaultDirection = useRef(DEFAULT_SPEED); // simpan arah terakhir

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);

    // Scroll atas → kanan
    if (e.deltaY < 0) {
      defaultDirection.current = Math.abs(DEFAULT_SPEED); // ubah default ke kanan
      targetSpeed.current = Math.min(MAX_SPEED, targetSpeed.current + ACCELERATION);
    }
    // Scroll bawah → kiri
    else {
      defaultDirection.current = -Math.abs(DEFAULT_SPEED); // ubah default ke kiri
      targetSpeed.current = Math.max(-MAX_SPEED, targetSpeed.current - ACCELERATION);
    }

    // setelah 400ms tanpa scroll → kembali ke arah default tapi pelan
    idleTimeout.current = setTimeout(() => {
      targetSpeed.current = defaultDirection.current;
    }, 400);
  };

  useEffect(() => {
    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const animate = () => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      // haluskan transisi ke targetSpeed
      currentSpeed.current = lerp(currentSpeed.current, targetSpeed.current, SMOOTHNESS);
      positionRef.current += currentSpeed.current;

      const width = marquee.scrollWidth / 2;
      if (positionRef.current <= -width) positionRef.current += width;
      if (positionRef.current >= 0) positionRef.current -= width;

      marquee.style.transform = `translateX(${positionRef.current}px)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  return (
    <div
      className="w-full bg-black py-8 overflow-hidden cursor-grab select-none"
      onWheel={handleWheel}
    >
      <div ref={marqueeRef} className="flex will-change-transform">
        {[...images, ...images].map((src, i) => (
          <div key={i} className="flex-shrink-0 mx-2">
            <img
              src={src}
              alt={`work-${i}`}
              className="h-80 w-auto object-cover rounded-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksCarousel;
