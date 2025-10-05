import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

interface User {
  role: string;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      if (user.role !== "admin") {
        alert("Akses ditolak. Halaman ini hanya untuk admin.");
        navigate("/");
      } else {
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-gray-300 font-poppins">
        <div className="px-6 py-4 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-lg">
          <p>Memeriksa akses admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex font-poppins text-gray-100">
      {/* Sidebar Desktop */}
      <div
        className={`hidden lg:flex fixed top-0 left-0 h-full z-40 transition-[width] duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <Sidebar
          isMobileOpen={false}
          isCollapsed={isCollapsed}
          toggleSidebar={() => {}}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Sidebar Mobile + Overlay */}
      <div className="lg:hidden">
        <Sidebar
          isMobileOpen={isMobileOpen}
          isCollapsed={false}
          toggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
          toggleCollapse={() => {}}
        />
      </div>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
        />
      )}

      {/* Konten Utama */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-[margin] duration-300 ease-in-out
        ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <Header
          toggleSidebar={() => setIsMobileOpen(true)}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
        />

        <main className="flex-1 p-6">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl p-6 min-h-[calc(100vh-120px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
