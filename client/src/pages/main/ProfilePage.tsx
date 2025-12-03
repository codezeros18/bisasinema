import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import type { User } from '../../types';

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [registrations, setRegistrations] = useState<any[]>([]);
    
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const fetchRegistrations = async (uid: number) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/class-registrations/${uid}`
            );
            const data = await res.json();
            setRegistrations(data);
        } catch (err) {
            console.error("Error loading registrations:", err);
        }
    };

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const parsed = JSON.parse(userDataString);
            setUser(parsed);

            fetchRegistrations(parsed.id); // <-- load tickets
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        addNotification('Anda telah berhasil logout.', 'success');

        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
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
                            <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight">{user.name}</h1>
                    <p className="text-gray-400 mt-1">{user.email}</p>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-700 my-8"></div>

                {/* TICKETS */}
                {/* TICKETS — hanya tampil untuk USER, bukan admin */}
                {user.role !== "admin" && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">Your Class Tickets</h2>

                        {registrations.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                Kamu belum mendaftar kelas apapun.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {registrations.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="
                                            bg-white/5 border border-white/10 backdrop-blur-xl
                                            rounded-xl p-5 shadow-lg transition hover:bg-white/10
                                        "
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">
                                                {ticket.nama_kelas}
                                            </h3>

                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-bold
                                                ${
                                                ticket.status_pembayaran === "paid"
                                                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                                    : ticket.status_pembayaran === "pending"
                                                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                                                }
                                            `}>
                                                {ticket.status_pembayaran.toUpperCase()}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm mt-1">
                                            Tanggal daftar:
                                            <span className="text-gray-300 ml-1">
                                                {new Date(ticket.tanggal_pendaftaran).toLocaleDateString("id-ID")}
                                            </span>
                                        </p>

                                        {ticket.bukti_pembayaran && (
                                            <div className="mt-4">
                                                <p className="text-gray-400 text-sm mb-2">Bukti Pembayaran:</p>
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${ticket.bukti_pembayaran}`}
                                                    className="w-40 rounded-lg border border-white/10 shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}


                {/* Logout Button */}
                <div className="mt-10">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
