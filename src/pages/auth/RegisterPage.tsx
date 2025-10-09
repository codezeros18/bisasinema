import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../../components/auth/RegisterCard'; // <-- Impor komponen Card

const RegisterPage = () => {
    // State dan logika tetap di sini
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Gagal untuk registrasi.');
            }
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    // Render komponen Card dan kirim semua state dan fungsi sebagai props
    return (
        <RegisterCard
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
        />
    );
};

export default RegisterPage;

