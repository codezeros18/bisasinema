import { useState, useEffect } from 'react';
import LandingPage from '../../components/LandingPage';
import WorkCardPublic from '../../components/WorksCard';
import WorksCarousel from '../../components/WorksCarousel'; // <-- Impor carousel
import WorksBar from '../../components/WorksBar';
import ClassBar from '../../components/ClassBar';
import ClassShowcase from '../../components/ClassShowcase';
import type { Work } from '../../types';

const HomePage = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/works');
        if (!response.ok) throw new Error('Gagal memuat data karya.');
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, []);

  return (
    <div>
      {/* Bagian Hero Section */}
      <LandingPage />

      {/* Bagian Galeri Karya Utama */}
      {/* <section className="bg-black font-poppins">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
              Karya Terbaru
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-inter">
              Lihat beberapa proyek dan kolaborasi terbaru dari kami.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-500">
              <p>Memuat karya...</p>
            </div>
          ) : works.length > 0 ? (
            <div className="flex flex-col space-y-12">
              {works.map((work, index) => (
                <WorkCardPublic
                  key={work.id}
                  work={work}
                  isReversed={index % 2 !== 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-md">
              <p>Belum ada karya yang ditambahkan saat ini.</p>
            </div>
          )}
        </div>
      </section> */}

      {/* Panggil komponen carousel di sini */}
      <WorksBar />
      <WorksCarousel />
      <ClassBar />
      <ClassShowcase />
    </div>
  );
};

export default HomePage;

