import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Youtube, Twitter, Send } from 'lucide-react';

import img1 from '../../assets/DSCF2797.jpg';
import img2 from '../../assets/DSCF3012.jpg';
import img3 from '../../assets/DSCF3203.jpg';
import img4 from '../../assets/DSCF0568.jpg';
import img5 from '../../assets/DSCF0593.jpg';

const backgroundImages = [img1, img2, img3, img4, img5];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // --- PRELOAD semua gambar agar tidak flicker ---
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  // -------------------------------------------------

  // Ganti gambar tiap 5 detik dengan efek fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Pesan dari ${formData.name} (${formData.email}) telah terkirim!`);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const inputStyle =
    'w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white-400 transition';

  return (
    <div className="min-h-screen text-white font-poppins pt-32 pb-20 relative overflow-hidden">

      {/* --- Layer Gambar dengan Fade Halus --- */}
      {backgroundImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 0 }}
        />
      ))}

      {/* Overlay gelap agar teks tetap terbaca */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start relative z-20">
        {/* Kolom kiri */}
        <div className="space-y-8 pt-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase text-white">
            Let's Talk Cinema
          </h1>
          <p className="text-lg text-gray-400 max-w-lg">
            Hubungi kami untuk kolaborasi, kemitraan <em>brand</em>, atau pertanyaan umum.
          </p>

          <div className="space-y-6 pt-6 ">
            <h2 className="text-xl font-semibold text-cyan-400"
            style={{ textShadow: '0 0 10px rgba(255, 191, 0, 1)' }}>Official Contact</h2>

            <a
              href="mailto:official@bisasinema.com"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition"
            >
              <Mail
  size={22}
  className="text-white-400 hover:text-red-500 transition-colors transform hover:scale-110"
/>

              <span className="text-lg font-medium">official@bisasinema.com</span>
            </a>

            <div className="flex gap-6 pt-4">
              <a
                href="https://instagram.com/bisasinema"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors transform hover:scale-110"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://youtube.com/bisasinema"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
              >
                <Youtube size={28} />
              </a>
              <a
                href="https://twitter.com/bisasinema"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transition-colors transform hover:scale-110"
              >
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Kolom kanan: Form */}
       <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">

          <h2 className="text-2xl font-bold text-white-400 mb-6"
          style={{ textShadow: '0 0 10px rgba(240, 239, 235, 1)' }}>Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Anda"
              className={inputStyle}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Pesan Anda"
              rows={5}
              className={inputStyle}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md hover:scale-[1.02] transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mengirim...' : (
                <span className="inline-flex items-center gap-2">
                  <Send size={20} />
                  Kirim Pesan
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
