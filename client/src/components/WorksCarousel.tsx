import { useRef, useEffect } from "react";

const works1 = "https://i.ibb.co.com/FbdXnzc4/DSCF8479.webp";
const works2 = "https://i.ibb.co.com/gbV5x0m0/DSCF0706.webp";
const works3 = "https://i.ibb.co.com/0RTQMRtf/DSCF2910.webp";
const works4 = "https://i.ibb.co.com/7N6fzKYT/20250424-IMG-7814.webp";
const works5 = "https://i.ibb.co.com/gMcLJddc/DSCF8542.webp";
const works6 = "https://i.ibb.co.com/fYXR3VDB/DSCF0664.webp";
const works7 = "https://i.ibb.co.com/Ngh2L158/DSCF2958.webp";
const works8 = "https://i.ibb.co.com/60CRNpDS/20250424-DSC01559.webp";

const images = [works1, works2, works3, works4, works5, works6, works7, works8];

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
      className="w-full py-8 overflow-hidden cursor-grab select-none"
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