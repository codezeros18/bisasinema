import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext'; // <-- 1. Impor hook notifikasi
import type { User } from '../../types';

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const { addNotification } = useNotification(); // <-- 2. Gunakan hook

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        } else {
            // Jika tidak ada data user (belum login), arahkan ke halaman login
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // 3. Ganti alert dengan notifikasi kustom
        addNotification('Anda telah berhasil logout.', 'success');
        
        // Arahkan ke halaman utama setelah notifikasi muncul
        setTimeout(() => {
            window.location.href = '/';
        }, 1000); // Beri sedikit jeda agar notifikasi terlihat
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-gray-300">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-4 py-12 font-poppins">
            <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8">
                
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 blur-md opacity-75"></div>
                        <div className="relative w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-700">
                            <svg
                                className="w-14 h-14 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* User Info */}
                    <h1 className="text-3xl font-extrabold tracking-tight">{user.name}</h1>
                    <p className="text-gray-400 mt-1">{user.email}</p>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-700 my-8"></div>

                {/* Buttons */}
                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

