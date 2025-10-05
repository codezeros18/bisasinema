import { Routes, Route } from 'react-router-dom';

// --- Layouts ---
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// --- Main Pages (Halaman Publik) ---
import HomePage from './pages/main/HomePage';
import AboutPage from './pages/main/AboutPage';
import WorksPage from './pages/main/WorksPage';
import ClassesPage from './pages/main/ClassesPage';
import ContactPage from './pages/main/ContactPage';
import ProfilePage from './pages/main/ProfilePage';
import CommunityPage from './pages/main/CommunityPage';

// --- Auth Pages (Halaman Otentikasi) ---
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// --- Admin Pages (Halaman Admin) ---
import DashboardPage from './pages/admin/DashboardPage';
import ManageWorksPage from './pages/admin/ManageWorksPage';
import ManageClassesPage from './pages/admin/ManageClassesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
// import ClassRegistrationsPage from './pages/admin/ClassRegistrationsPage';


function App() {
  return (
    <Routes>
      {/* --- Rute Publik dengan Navbar & Footer --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Route>

      {/* --- Rute Admin dengan Sidebar & Header --- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="works" element={<ManageWorksPage />} />
        <Route path="classes" element={<ManageClassesPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        {/* <Route path="registrations" element={<ClassRegistrationsPage />} /> */}
      </Route>

      {/* --- Rute Tanpa Layout (Polosan) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />

    </Routes>
  );
}

export default App;

