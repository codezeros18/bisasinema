import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Youtube, Music2, Send, Phone, MapPin } from 'lucide-react';

import img1 from '../../assets/DSCF0669.jpg';
import img2 from '../../assets/DSCF0681.jpg';
import img3 from '../../assets/DSCF3203.jpg';
import img4 from '../../assets/DSCF0568.jpg';
import img5 from '../../assets/DSCF0593.jpg';

const backgroundImages = [img1, img2, img3, img4, img5];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
      alert(`Message from ${formData.name} (${formData.email}) has been sent successfully!`);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  // Style input minimalis (hanya garis bawah)
  const inputStyle =
    'w-full px-4 py-3 rounded-none bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors';

  return (
    <div className="min-h-screen text-white font-poppins bg-black">

      {/* --- BAGIAN 1: HEADER (Gambar Full Width) --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white mb-4" style={{ textShadow: '0 0 30px rgba(0,0,0,0.8)' }}>
            Let’s Talk Cinema
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            Collaborate • Create • Inspire
          </p>
        </div>
      </div>

      {/* --- BAGIAN 2: 3 KOLOM SEJAJAR (Map - Info - Form) --- */}
      <div className="w-full bg-black border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          
          {/* KOLOM 1 (KIRI): MAPS */}
          <div className="relative w-full h-[400px] lg:h-auto border-r border-gray-800 overflow-hidden">
            <iframe 
              width="100%" 
              height="100%" 
              id="gmap_canvas" 
              // URL ini menggunakan query alamat lengkap agar pin-nya akurat
              src="https://maps.google.com/maps?q=Jalan%20Boulevard%20Allogio%2C%20Ruko%20New%20Melody%202%20MLDE%20No.2%2C%20Medang%2C%20Pagedangan%2C%20Tangerang&t=&z=16&ie=UTF8&iwloc=&output=embed"
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0}
              title="Bisasinema Studio Location"
              className="grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-500 block w-full h-full"
              style={{ filter: 'grayscale(100%) invert(90%) contrast(85%)' }}
            ></iframe>
          </div>

          {/* KOLOM 2 (TENGAH): MEET US (Info Kontak) */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-zinc-900/50 border-r border-gray-800">
            <h2 className="text-4xl font-bold mb-10 text-white">Meet Us</h2>
            
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-green-600 transition-colors">
                    <Phone size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Phone / WhatsApp</p>
                    <a href="https://wa.me/6282277726485" target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-green-400 transition-colors">
                        +62 822-7772-6485 <br/>
                        <span className="text-sm font-normal text-gray-500">(Fransiska)</span>
                    </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-colors">
                    <Mail size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:admin@bisasinema.id" className="text-lg font-medium hover:text-red-400 transition-colors">
                        admin@bisasinema.id
                    </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                 <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-blue-600 transition-colors">
                    <MapPin size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Our Studio</p>
                    <p className="text-lg font-medium leading-relaxed text-gray-200">
                      Jalan Boulevard Allogio, <br />
                      Ruko New Melody 2 MLDE No.2, <br />
                      Medang, Pagedangan, <br />
                      Tangerang Regency, Banten 15334
                    </p>
                </div>
              </div>

               {/* Social Media */}
               <div className="pt-8 flex gap-6">
                 <a href="https://instagram.com/bisasinema" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors"><Instagram size={28}/></a>
                 <a href="http://www.youtube.com/@bisasinema" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-red-500 transition-colors"><Youtube size={28}/></a>
                 <a href="https://www.tiktok.com/@bisasinema" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Music2 size={28}/></a>
               </div>
            </div>
          </div>

          {/* KOLOM 3 (KANAN): PITCH US (Formulir) */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-black">
            <h2 className="text-4xl font-bold mb-2 text-white">Pitch Us</h2>
            <p className="text-gray-400 mb-10">
              Hello, my name is <span className="text-blue-400 font-medium">...</span> and I would like to discuss about this project.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputStyle} required />
              </div>
              <div>
                 <label className="block text-sm text-gray-500 mb-1">Your Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputStyle} required />
              </div>
              <div>
                 <label className="block text-sm text-gray-500 mb-1">What can we help you with?</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Question, Comment or Issue?" rows={3} className={inputStyle} required />
              </div>  
              
              <button 
  type="submit" 
  disabled={isSubmitting} 
  className="w-fit px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:scale-105 transition-transform disabled:opacity-50"
>
  {isSubmitting ? 'Sending...' : (
    <span className="flex items-center gap-2">
      <Send size={20} />
      Send Message
    </span>
  )}
</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;