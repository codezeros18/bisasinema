import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../../components/auth/LoginCard';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal untuk login.');
            }

            // Simpan token dan seluruh data user ke localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            alert('Login berhasil!');

            // --- LOGIKA PENGALIHAN BERDASARKAN ROLE ---
            if (data.user.role === 'admin') {
                navigate('/admin'); // Arahkan ke dashboard admin
            } else {
                navigate('/'); // Arahkan ke halaman utama untuk user biasa
            }

        } catch (err: any) {
            setError(err.message);
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

