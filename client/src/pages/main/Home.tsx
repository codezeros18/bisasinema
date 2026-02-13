//import { useState} from 'react';
import LandingPage from '../../components/LandingPage';
// import WorkCardPublic from '../../components/WorkCardPublic'; // Tidak digunakan di sini
import WorksCarousel from '../../components/WorksCarousel';
import WorksBar from '../../components/WorksBar';
//import ClassBar from '../../components/ClassBar';
import ClassShowcase from '../../components/ClassShowcase';
import MediaContentShowcase from '../../components/MediaContentShowcase';
import MediaContentBar from '../../components/MediaContentBar';
import BrandsShowcase from '../../components/BrandsShowcase';
import BisasinemaShowcase from '../../components/BisasinemaShowcase';
// import type { Work } from '../../types'; // Tidak digunakan di sini

const HomePage = () => {
  // State untuk filter kelas, dikelola oleh HomePage
  //const [classFilter, setClassFilter] = useState('All');

  return (
    <div className='bg-black'>
      <LandingPage />
      <BisasinemaShowcase />
      <WorksBar />
      <WorksCarousel />
      
      {/* Meneruskan state dan fungsi ke komponen anak */}
      {/* <ClassBar 
        activeFilter={classFilter}
        onFilterChange={setClassFilter}
      /> */}
      <ClassShowcase 
        // activeFilter={classFilter}
      />
      
      <MediaContentBar />
      <MediaContentShowcase />
      <BrandsShowcase />
    </div>
  );
};

export default HomePage;

