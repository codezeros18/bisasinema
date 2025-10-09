import { useState, useEffect } from 'react';
import LandingPage from '../../components/LandingPage';
import WorkCardPublic from '../../components/WorksCard'; // <-- pake WorkCardPublic
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
      {/* Hero Section sama */}
      <LandingPage />

      {/* Section Works */}
      <section className="bg-gray-50 font-poppins">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Header Section */}
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
            // Pake grid dengan alternating layout (seperti event card)
            <div className="grid grid-cols-1 gap-12">
              {works.map((work, index) => (
                <WorkCardPublic
                  key={work.id}
                  work={work}
                  isReversed={index % 2 === 1} // setiap item genap dibalik layout
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-md">
              <p>Belum ada karya yang ditambahkan saat ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
