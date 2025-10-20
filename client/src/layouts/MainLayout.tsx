import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <-- Mengimpor Navbar asli
import Footer from '../components/Footer'; // <-- Mengimpor Footer asli

const MainLayout = () => {
  return (
    // Menggunakan flexbox untuk memastikan footer menempel di bawah jika konten pendek
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      {/* Konten utama akan mengisi ruang yang tersedia */}
      <main className="flex-grow">
        {/* Outlet adalah tempat di mana komponen halaman (HomePage, etc.) akan dirender */}
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;

