import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../../components/auth/RegisterCard';
import { useNotification } from '../../context/NotificationContext';
import { apiFetch } from '../../utils/api'; // <-- 1. Impor apiFetch

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // 2. Gunakan apiFetch, perhatikan bagaimana kodenya menjadi jauh lebih sederhana
            await apiFetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            addNotification('Registrasi berhasil! Silakan login.', 'success');
            navigate('/login');

        } catch (error: any) {
            setError(error.message);
            addNotification(error.message, 'error');
        }
    };

    return (
        <RegisterCard
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default RegisterPage;

