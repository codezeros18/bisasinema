import { motion } from "framer-motion";
import PublicFilterSwitch from "./PublicFilterSwitch";

const words = "BEYOND THE CLASSROOM WHO NEVER STOP LEARNING.".split(" ");

// 1. Definisikan tipe untuk props yang akan diterima dari HomePage
interface ClassBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

// 2. Gunakan props yang diterima, bukan state lokal
export default function ClassBar({ activeFilter, onFilterChange }: ClassBarProps) {
  const filterOptions = ["All", "Offline", "Online", "Hybrid"];

  // 3. Logika state lokal dan handleFilterChange dihapus

  return (
    <header className="w-full text-white py-0 md:py-8 my-8 md:my-14">
      <div className="border-t border-white/10 mx-4 sm:mx-8 lg:mx-18 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          {/* Bagian Kiri: Judul Animasi (tidak berubah) */}
          <div className="col-span-12 md:col-span-8 overflow-hidden">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="text-4xl sm:text-5xl lg:text-[80px]
                         leading-[30px] lg:leading-[75px]
                         tracking-[-1px] lg:tracking-[-2px]
                         font-extrabold uppercase
                         flex flex-wrap gap-x-3 gap-y-2
                         max-w-[900px]"
            >
              {words.map((word, wi) => (
                <motion.span
                  key={wi}
                  className="inline-block whitespace-nowrap"
                >
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        delay: wi * 0.25 + ci * 0.03,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="inline-block text-white"
                      style={{
                        textShadow: `
                          0 0 3px rgba(255,255,255,0.25),
                          0 0 6px rgba(255,255,255,0.15)
                        `,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Bagian Kanan: Filter Switch (sekarang menggunakan props) */}
          <div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-end">
            <div className="w-full max-w-sm">
              <PublicFilterSwitch 
                options={filterOptions}
                activeOption={activeFilter}
                onFilterChange={onFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

