import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Home, Video, Calendar, Users, ChevronDown, X, Menu} from "lucide-react";

// 1. Impor logo dari folder assets
import logoFull from '../../assets/logowhite.png'; // Ganti 'logo-panjang.png' jika nama file berbeda
import logoIcon from '../../assets/logoicon.png';   // Ganti 'logo-icon.png' jika nama file berbeda

interface SidebarProps {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
}

const adminMenuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
    { name: "Manage Works", icon: <Video size={18} />, path: "/admin/works" },
    { name: "Manage Classes", icon: <Calendar size={18} />, path: "/admin/classes" },
    { name: "Manage Users", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Registrations", icon: <Menu size={18} />, path: "/admin/registrations" }, // Path disesuaikan
];

export default function Sidebar({ isMobileOpen, isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const activePath = location.pathname;
  const [openSections, setOpenSections] = useState<string[]>(["Admin"]);

  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionName) ? prev.filter((s) => s !== sectionName) : [...prev, sectionName]
    );
  };

  const renderDesktopMenu = () => (
    <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2 font-poppins">
      <div>
        <button
          onClick={() => !isCollapsed && toggleSection("Admin")}
          className={`flex items-center w-full px-3 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors ${isCollapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center gap-3">
            <Users size={20} />
            {!isCollapsed && <span className="font-medium">Admin</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown size={16} className={`transition-transform ${openSections.includes("Admin") ? "rotate-180" : ""}`} />
          )}
        </button>

        {!isCollapsed && openSections.includes("Admin") && (
          <ul className="mt-2 space-y-2 pl-8">
            {adminMenuItems.map(item => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activePath === item.path
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );

  const renderMobileMenu = () => (
     <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
       {adminMenuItems.map(item => (
           <Link
               key={item.name}
               to={item.path}
               onClick={toggleSidebar}
               className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                   activePath === item.path
                     ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow"
                     : "text-gray-400 hover:bg-white/10 hover:text-white"
               }`}
           >
               {item.icon}
               <span>{item.name}</span>
           </Link>
       ))}
     </nav>
  );

  return (
    <>
      {/* Sidebar Desktop */}
      <div className={`hidden lg:flex flex-col bg-gray-900/90 backdrop-blur-xl border-r border-gray-800 h-full ${isCollapsed ? "w-20" : "w-64"} transition-all`}>
        <div className="flex items-center justify-center h-20 px-4 shrink-0">
            {/* --- PERUBAHAN DI SINI: Gunakan tag <img> --- */}
            <Link to="/">
              {isCollapsed ? (
                <img src={logoIcon} alt="Bisasinema Icon" className="h-8 w-auto" />
              ) : (
                <img src={logoFull} alt="Bisasinema Logo" className="h-10 w-auto" />
              )}
            </Link>
        </div>
        {renderDesktopMenu()}
      </div>

      {/* Sidebar Mobile */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-[9999] w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800">
            {/* --- PERUBAHAN DI SINI: Gunakan tag <img> --- */}
            <Link to="/">
                <img src={logoFull} alt="Bisasinema Logo" className="h-10 w-auto" />
            </Link>
          <button onClick={toggleSidebar} className="text-gray-300 hover:text-white"><X size={24} /></button>
        </div>
        {renderMobileMenu()}
      </div>
    </>
  );
}

