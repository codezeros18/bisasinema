import React, { useState, useEffect, useRef } from "react";
import AnimatedBackground from "../../components/animatedBackground";

// Tambahkan CSS Custom Scrollbar di sini agar menyatu
const scrollbarStyles = `
  .custom-modal-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .custom-modal-scroll::-webkit-scrollbar-track {
    background: #141414;
  }
  .custom-modal-scroll::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
  .custom-modal-scroll::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

export default function MediaPage() {
  const [active, setActive] = useState<Media | null>(null);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Inject Style ke Head */}
      <style>{scrollbarStyles}</style>
      
      {/* HERO */}
      <section className="relative z-10 h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-[60px] md:text-[120px] font-extrabold tracking-widest uppercase">
            MEDIA
          </h1>
          <p className="mt-4 text-sm tracking-widest text-white/60 uppercase">
            Your newest bisasinema media
          </p>
        </div>

        <span className="absolute bottom-10 text-xs tracking-widest text-white/40">
          SCROLL
        </span>
      </section>

      {/* GRID */}
      <section className="relative z-10 px-6 md:px-24 pt-36 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] gap-x-14 gap-y-20 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-16">
            <Reveal delay={0}>
              <SmallCard {...media[0]} index="001" onClick={setActive} />
            </Reveal>
            <Reveal delay={120}>
              <SmallCard {...media[1]} index="002" onClick={setActive} />
            </Reveal>
            <Reveal delay={240}>
              <SocialContainer />
            </Reveal>
          </div>

          {/* CENTER */}
          <div className="flex flex-col gap-16">
            <Reveal delay={360}>
              <FeaturedCard {...media[2]} onClick={setActive} />
            </Reveal>
            <Reveal delay={480}>
              <WideCard {...media[4]} onClick={setActive} />
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-16">
            <Reveal delay={600}>
              <MediumCard {...media[3]} onClick={setActive} />
            </Reveal>
            <Reveal delay={720}>
              <SmallCard {...media[5]} index="003" onClick={setActive} />
            </Reveal>
          </div>
        </div>
      </section>

      {active && (
        <ArticleModal data={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

/* ===================== */
/* REVEAL COMPONENT */
/* ===================== */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
}

/* ===================== */
/* MODAL - UPDATED WITH SCROLL */
/* ===================== */

function ArticleModal({
  data,
  onClose,
}: {
  data: Media;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#141414] rounded-[32px] overflow-hidden max-h-[90vh] flex flex-col border border-white/5 shadow-2xl"
      >
        {/* Close Button Floating */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-white/10"
        >
          ✕
        </button>

        {/* Scrollable Area */}
        <div className="overflow-y-auto custom-modal-scroll">
          <div className="w-full h-[300px] md:h-[450px] relative">
             <img
              src={data.image}
              className="w-full h-full object-cover"
              alt={data.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
          </div>

          <div className="px-8 md:px-12 pb-12 -mt-12 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] tracking-[0.2em] text-white/60 uppercase mb-4">
              {data.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              {data.title}
            </h2>

            <div className="h-px w-full bg-white/10 mb-8" />

            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line font-light">
              {data.isi}
            </p>
            
            <button
              onClick={onClose}
              className="mt-12 py-3 px-8 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* CARDS & BASE */
/* ===================== */

function CardBase({
  title,
  category,
  image,
  onClick,
  isi,
  className,
  children,
}: CardProps & {
  className: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      onClick={() => onClick({ title, category, image, isi })}
      className={`
        group relative overflow-hidden bg-[#1c1c1c]
        cursor-pointer transition-all duration-500
        hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      <img
        src={image}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      {children}
      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase">
          {category}
        </span>
        <h3 className="mt-2 text-lg font-bold leading-tight group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}

// Fungsi pembantu untuk Cards agar tetap ringkas
function FeaturedCard(p: CardProps) { return <CardBase {...p} className="h-[550px] rounded-[32px]" /> }
function MediumCard(p: CardProps) { return <CardBase {...p} className="h-[500px] rounded-[30px]" /> }
function WideCard(p: CardProps) { return <CardBase {...p} className="h-[260px] w-full rounded-[34px]" /> }
function SmallCard({ index, ...p }: CardProps & { index: string }) {
  return (
    <CardBase {...p} className="h-[240px] rounded-[24px]">
      <span className="absolute top-6 left-6 text-[10px] tracking-widest text-white/30 font-mono italic">
        {index}
      </span>
    </CardBase>
  );
}

function SocialContainer() {
  return (
    <div className="mt-6 rounded-2xl bg-[#141414] border border-white/5 p-6 shadow-xl">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-6">
        Follow us
      </span>
      <div className="flex flex-col gap-4">
        <SocialLink 
          href="https://www.instagram.com/bisasinema/" 
          label="Instagram" 
          icon="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF" 
        />
        <SocialLink 
          href="https://twitter.com" 
          label="Twitter" 
          icon="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=FFFFFF" 
        />
      </div>
    </div>
  );
}

function SocialLink({ href, label, icon }: { href: string, label: string, icon: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
      <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
        {label}
      </span>
      <img src={icon} alt={label} className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-all group-hover:scale-110" />
    </a>
  );
}

/* ===================== */
/* TYPES & DATA */
/* ===================== */

type Media = {
  title: string;
  category: string;
  image: string;
  isi: string;
};

type CardProps = Media & {
  onClick: (data: Media) => void;
};

const media: Media[] = [
  {
    title: "Ngakunya si Jago Grading...",
    category: "bisa-talk",
    image: "https://lh3.googleusercontent.com/d/1Mt9W7hRSyv7SRVRki_sHMsI3d42IndyZ",
    isi: "Sebelum bicara mood, tone, atau look film, color correction menjadi tahap pertama dalam proses grading. \n\nColor correction bertujuan untuk menyamakan warna antar shot yang diambil di berbagai kondisi pencahayaan berbeda sehingga terlihat konsisten saat diputar berurutan. Tanpa konsistensi ini, penonton akan terdistraksi oleh perubahan warna yang mendadak.",
  },
  {
    title: "Garuda di Dadaku: Semangat Baru",
    category: "bisa-happening",
    image: "https://lh3.googleusercontent.com/d/16SS-_9rJtINk7ZJiVdH8sAjYaElO1CP5",
    isi:"Garuda di dadaku adalah sebuah ungkapan yang sering kita dengar, terutama dalam konteks olahraga. Ungkapan ini mencerminkan rasa bangga dan cinta yang mendalam terhadap Indonesia.\n\nDi mana Garuda, burung mitologi yang menjadi lambang negara, melambangkan semangat nasionalisme dan persatuan yang tak tergoyahkan bagi seluruh rakyat Indonesia dari Sabang sampai Merauke."
  },
  {
    title: "MTN AsahBakat x bìsasínema presents Workshop Film ‘Inside The Frame: Crocodile Tears",
    category: "MTN AsahBakat x bisasinema",
    image: "https://lh3.googleusercontent.com/d/1_39KP8deOlh2P-DQQF4ukXGeG7EH28sn",
    isi:"MTN AsahBakat kembali lagi. Kali ini menghadirkan workshop kolaborasi Sutradara dan Sinematografer dari film ‘Crocodile Tears’, yang sudah melanglang buana ke berbagai festival internasional."
  },
  {
    title: "bisascreening: Trio Qwek-Qwek +1!!",
    category: "bisascreening",
    image: "https://lh3.googleusercontent.com/d/1Q98_3iRnktdTpRp42OD9oO6ViYuN3N7q",
    isi:"Ini dia bisascreening pertama, bawain film-film host @bisasinema yang ternyata juga filmmaker😱. Spesialnya lagi, mereka akan ditemani oleh film pendek Gaze Into Abyss produksi bisasinema."
  },
  {
    title: "Introducing: bìsascreening!",
    category: "bìsascreening",
    image: "https://lh3.googleusercontent.com/d/1HyqMGb8gl8KKCHseUoD5KhfcO4O5Du70",
    isi: "Bukan Netflix, bukan festival… tapi bisalah buat nobar dan ngobrol-ngobrol. Welkam juga buat filmmaker untuk filmnya ditayangin, apa aja deh, pokoknya felem. (Titik!)"
  },
  {
    title: "Kenapa Film pertama kita sering gagal?",
    category: "Community",
    image: "https://lh3.googleusercontent.com/d/1UymfGMpR6GScTSkK_ezVme6k4jn-IWhy",
    isi: "Bangunlah “kaki-kaki” karirmu di industri melalui film pendek🤓🦶 \n@bisascreening Trio Qwek-Qwek +1"
  }
];