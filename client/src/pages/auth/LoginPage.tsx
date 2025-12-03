import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../../components/auth/LoginCard';
import { useNotification } from '../../context/NotificationContext'; // <-- 1. Impor hook notifikasi

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { addNotification } = useNotification(); // <-- 2. Gunakan hook

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal untuk login.');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('userId', String(data.user.id)); // ← FIX PALING PENTING
            
            // 3. Ganti alert dengan notifikasi sukses
            addNotification('Login berhasil!', 'success');

            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err: any) {
            setError(err.message);
            // 4. Ganti alert dengan notifikasi error
            addNotification(err.message, 'error');
        }
    };

    return (
        <LoginCard 
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default LoginPage;

