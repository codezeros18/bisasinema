import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, PanelRight, PanelLeft } from "lucide-react";

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
}

export default function Header({
  toggleSidebar,
  toggleCollapse,
  isCollapsed,
}: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);

  return (
    <div className="sticky top-0 z-30 font-poppins">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border bg-gray-900/90 border-gray-800 shadow-lg mx-4 my-4 rounded-2xl backdrop-blur-xl">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Collapse button (desktop) */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <PanelRight size={22} /> : <PanelLeft size={22} />}
          </button>
          {/* Open sidebar (mobile) */}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-5">
          {/* Search Bar */}
          <div className="relative w-full max-w-[150px] md:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari..."
              className="w-full rounded-full border border-gray-700 bg-gray-800 text-gray-200 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
            />
          </div>

          {/* Profile Section */}
          <Link
            to="/profile"
            className="flex items-center gap-3 cursor-pointer group"
          >
            {user ? (
              <>
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    Admin
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              // Skeleton loader
              <>
                <div className="hidden md:flex flex-col text-right">
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-12 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse"></div>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
