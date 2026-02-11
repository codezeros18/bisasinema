import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useNotification } from './context/NotificationContext';
import Notification from './components/Notification';

// --- Layouts & Pages (Impor Anda tetap sama) ---
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/main/Home';
import About from './pages/main/About';
import Events from './pages/main/Events';
import Registrations from './pages/main/Registrations';
import Education from './pages/main/Education';
import Contact from './pages/main/Contact';
import ProfilePage from './pages/main/ProfilePage';
import Media from './pages/main/Media';
import EventsDetail from "./pages/main/EventsDetail";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import ManageWorksPage from './pages/admin/ManageWorksPage';
import ManageClassesPage from './pages/admin/ManageClassesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import EventRegistrationPage from './pages/admin/EventRegistrationPage';


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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/media" element={<Media />} />
          <Route path="/events/:slug" element={<EventsDetail />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="works" element={<ManageWorksPage />} />
          <Route path="classes" element={<ManageClassesPage />} />
          <Route path="users" element={<ManageUsersPage />} />
          <Route path="registrations" element={<EventRegistrationPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;

