import { useEffect, useState } from "react";
import FeaturedSection from "../../components/registration/FeaturedSection";
import ClassesGrid from "../../components/registration/ClassesGrid";
import ClassModal from "../../components/registration/ClassModal";
import type { Class, ClassItem } from "../../components/registration/types";
import { mapClassToItem } from "../../components/registration/types";

const Registrations = () => {
  const [scrollY, setScrollY] = useState(0);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [featured, setFeatured] = useState<ClassItem | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Parallax effect listener
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);
        const data: Class[] = await res.json();

        const sorted = data.sort((a, _b) =>
          a.status === "Pendaftaran Dibuka" ? -1 : 1
        );

        setFeatured(mapClassToItem(sorted[0]));
        setClasses(sorted.slice(1).map(mapClassToItem));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading || !featured) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Memuat data kelas...
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full min-h-[160vh] overflow-hidden flex items-center">
        {/* Background featured image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${featured.image})`,
            transform: `translateY(${scrollY * 0.2}px)`,
            filter: "brightness(60%)",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col justify-center gap-20">
          
          {/* FEATURED SECTION — NOW WITH JOIN NOW MODAL */}
          <FeaturedSection 
            data={featured}
            onJoin={() => setSelectedClass(featured)}  // <-- UPDATE PENTING
          />

          {/* GRID OF OTHER CLASSES */}
          <ClassesGrid 
            data={classes} 
            onSelect={(c) => setSelectedClass(c)} 
          />
        </div>
      </div>

      {/* CLASS MODAL */}
      <ClassModal 
        data={selectedClass} 
        onClose={() => setSelectedClass(null)} 
      />
    </>
  );
};

export default Registrations;
