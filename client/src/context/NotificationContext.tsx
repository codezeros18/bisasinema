import { createContext, useState, useContext, type ReactNode } from 'react';

// Tipe data untuk setiap notifikasi
interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
}

// Tipe untuk nilai yang akan disediakan oleh context
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: 'success' | 'error') => void;
}

// Buat context dengan nilai default
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Buat Provider: komponen yang akan "membungkus" aplikasi Anda
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Atur notifikasi agar hilang secara otomatis setelah 4 detik
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Buat Custom Hook: cara mudah untuk menggunakan context ini di komponen lain
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
