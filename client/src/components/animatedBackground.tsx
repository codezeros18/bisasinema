import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const offset = scrollY * 0.03; // scroll ringan
      bgRef.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={bgRef} className="animated-bg">
        {/* God Rays */}
        <div className="god-rays">
          <span className="ray" style={{ left: '10%', width: '200px', height: '800px' }} />
          <span className="ray" style={{ left: '40%', width: '250px', height: '900px' }} />
          <span className="ray" style={{ left: '70%', width: '180px', height: '850px' }} />
        </div>

        {/* Gradient */}
        <div className="gradient" />

        {/* Particles */}
        <div className="particles">
          {Array.from({ length: 72 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * -20}s`,
                animationDuration: `${14 + Math.random() * 14}s`,
                opacity: Math.random() * 0.25 + 0.05,
                transform: `scale(${Math.random() * 0.9 + 0.3})`,
              }}
            />
          ))}
        </div>

        {/* Noise */}
        <div className="noise" />
      </div>

      <style>{`
        /* ================= ANIMATED BACKGROUND ================= */
        .animated-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          will-change: transform;
        }

        /* ================= GOD RAYS ================= */
        .god-rays {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          overflow: hidden;
        }

        .ray {
          position: absolute;
          bottom: -100px;
          background: linear-gradient(to top, rgba(255,255,255,0.12), transparent);
          filter: blur(40px);
          transform: rotate(-20deg);
          animation: moveRay 60s linear infinite;
          mix-blend-mode: screen;
        }

        @keyframes moveRay {
          0% { transform: translateX(0) rotate(-20deg); }
          50% { transform: translateX(30px) rotate(-18deg); }
          100% { transform: translateX(0) rotate(-20deg); }
        }

        /* ================= GRADIENT ================= */
        .gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.09), transparent 45%),
            linear-gradient(120deg, #0b0b0b, #111827, #0b0b0b);
          background-size: 200% 200%;
          animation: gradientMove 20s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ================= PARTICLES ================= */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          bottom: -15vh;
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.4);
          border-radius: 999px;
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: blur(0.3px);
        }

        @keyframes floatUp {
          from { transform: translateY(0); }
          to { transform: translateY(-140vh); }
        }

        /* ================= NOISE ================= */
        .noise {
          position: absolute;
          inset: 0;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.035;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}