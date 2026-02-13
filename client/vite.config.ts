import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' 
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
  base: "/Bisasinema-Website-/", // 👈 INI PENTING: Agar halaman tidak blank putih saat dibuka
})