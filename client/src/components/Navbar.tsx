import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { User } from '../types';

import logo from '../assets/logowhite.png';

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "Classes", path: "/classes" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showTopBar, setShowTopBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDataString = localStorage.getItem('user');
        
        if (token && userDataString) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userDataString));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowTopBar(false);
            } else {
                setShowTopBar(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className="fixed top-0 left-0 w-full z-50 font-poppins">
            <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-transparent my-4 mx-0 md:mx-8 md:my-8">
                {/* Kiri: Menu */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-white relative cursor-pointer z-60"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                    <span className="uppercase text-sm">{isOpen ? "Close" : "Menu"}</span>
                </button>

                {/* Tengah: Logo */}
                <AnimatePresence>
                {showTopBar && (
                    <motion.div
                    key="logo"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 transform -translate-x-1/2"
                    >
                    <Link to="/">
                        <img 
                        src={logo} 
                        alt="BÌSASÍNEMA Logo" 
                        className="h-10 w-auto" // bisa diubah sesuai ukuran yang diinginkan
                        />
                    </Link>
                    </motion.div>
                )}
                </AnimatePresence>


                {/* Kanan: Login/User */}
                <AnimatePresence>
                    {showTopBar && (
                        <motion.div
                            key="user"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {isLoggedIn && user ? (
                                <Link
                                    to="/profile"
                                    className="px-4 py-2 text-sm text-white rounded-md transition-all duration-300 hover:text-orange-400"
                                >
                                    {user.name}
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm text-white border border-white transition-all duration-300 hover:bg-white hover:text-black"
                                >
                                    Login
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        className="fixed top-0 left-0 h-full w-full md:w-1/3 bg-black z-50 p-8 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="space-y-8 mt-24 ml-0 md:ml-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-4xl md:text-5xl font-bold text-white hover:text-gray-300 transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
