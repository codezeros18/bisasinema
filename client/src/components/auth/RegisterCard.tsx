import React from 'react';
import { Link } from 'react-router-dom';

// Tipe data untuk props, termasuk 'error'
interface RegisterCardProps {
  name: string;
  email: string;
  password: string;
  error: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  name, email, password, error, setName, setEmail, setPassword, onSubmit
}) => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex items-center justify-center p-6 font-poppins">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-6 tracking-tight">
          Create Your Account
        </h1>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="pt-2 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-md hover:scale-[1.02] transition-transform duration-300"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-pink-400 hover:text-pink-300 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;

