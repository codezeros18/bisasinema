import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useNotification } from './context/NotificationContext';
import Notification from './components/Notification';

// --- Layouts & Pages (Impor Anda tetap sama) ---
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/main/HomePage';
import AboutPage from './pages/main/AboutPage';
import WorksPage from './pages/main/WorksPage';
import ClassesPage from './pages/main/ClassesPage';
import ContactPage from './pages/main/ContactPage';
import ProfilePage from './pages/main/ProfilePage';
import CommunityPage from './pages/main/CommunityPage';
import WorksDetailPage from "./pages/main/WorksDetailPage";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageWorksPage from './pages/admin/ManageWorksPage';
import ManageClassesPage from './pages/admin/ManageClassesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';


function App() {
  // Ambil daftar notifikasi dari context
  const { notifications } = useNotification();

  return (
    <>
      {/* --- WADAH UNTUK NOTIFIKASI --- */}
      <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification
              key={n.id}
              message={n.message}
              type={n.type}
              onClose={() => { /* Logika remove sudah otomatis di context */ }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* --- RUTE APLIKASI ANDA (TIDAK BERUBAH) --- */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/works/:slug" element={<WorksDetailPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="works" element={<ManageWorksPage />} />
          <Route path="classes" element={<ManageClassesPage />} />
          <Route path="users" element={<ManageUsersPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;

