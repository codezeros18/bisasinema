import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { User } from "../types";

import logo from "../assets/logowhite.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Registrations", path: "/registrations" },
  { name: "Education", path: "/education" },
  { name: "Media", path: "/media" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("user");

    if (token && userDataString) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userDataString));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location.pathname]);

  // Scroll hide/show navbar
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
    <header className="fixed top-0 left-0 w-full z-50 font-poppins bg-transparent">
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-transparent my-4 mx-0 md:mx-8 md:my-8">

        {/* LEFT: Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-white relative z-[70] cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="uppercase text-sm tracking-wider">
            {isOpen ? "Close" : "Menu"}
          </span>
        </motion.button>

        {/* CENTER: Logo with fade in/out */}
        <AnimatePresence mode="wait">
          {showTopBar && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <Link to="/">
                <motion.img
                  src={logo}
                  alt="BÌSASÍNEMA"
                  className="h-9 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT: User/Login */}
        <AnimatePresence mode="wait">
          {showTopBar && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {isLoggedIn && user ? (
                <Link
                  to="/profile"
                  className="px-4 py-2 text-sm text-white hover:text-yellow-300 transition-all duration-300"
                >
                  {user.name}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-white border border-white/40 rounded-md hover:bg-white hover:text-black transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SIDEBAR MENU */}
      <AnimatePresence>
        {isOpen && (
        <motion.aside
        className="fixed top-0 left-0 h-full w-full md:w-1/2 lg:w-1/3 bg-black z-50 px-8 md:px-14 pt-24 overflow-y-auto"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="space-y-8 text-left"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-4xl md:text-5xl font-bold text-white hover:text-gray-300 transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
