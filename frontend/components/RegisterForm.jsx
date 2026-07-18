import React, { useState } from 'react';
import { registerUser } from '../api/api';
import {Link, useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await registerUser(name, email, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const msg = err.response?.data?.message || 'Błąd rejestracji. Może email jest zajęty?';
            setError(msg);
        }
    };

    if (success) {
        return <div style={{ textAlign: 'center' }}><h3>Zarejestrowano!</h3><p>Przekierowuję do logowania...</p></div>;
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Zarejestruj się!</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <div className="relative mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 pt-3 pb-1 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-2 -top-2 bg-white px-1 text-sm text-gray-600"
                                >Email</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="Wrong Name"
                                    className="block w-full rounded-md bg-white/5 px-3 pt-3 pb-1 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-2 -top-2 bg-white px-1 text-sm text-gray-600"
                                >Nazwa</label>
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 pt-3 pb-1 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-2 -top-2 bg-white px-1 text-sm text-gray-600"
                                >Haslo</label>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input id="link-checkbox" type="checkbox" value=""
                                   className="w-4 h-4 border accent-gray-500 border-default-medium rounded-xs bg-gray-500 focus:ring-2 focus:ring-gray-400"/>
                            <label htmlFor="link-checkbox"
                                   className="select-none ms-2 text-sm font-medium text-gray-500">I agree with the <a
                                href="#" className="text-black hover:underline">terms and conditions</a>.</label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                            >
                                Zarejestruj
                            </button>
                            {error && <p className="font-semibold text-xs text-red-700">{error}</p>}
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Masz juz konto??{' '}
                        <Link to="/login" className="font-semibold text-gray-500 hover:text-gray-600">
                            Zaloguj się!
                        </Link>
                    </p>
                </div>
            </div>
        </>
        /*<div style={{ maxWidth: '300px', margin: 'auto', textAlign: 'center' }}>
            <h3>Utwórz konto</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Imię" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
                <button type="submit">Zarejestruj się</button>
            </form>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
                Masz już konto? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>Zaloguj się</span>
            </p>
        </div>*/
    );
};

export default RegisterForm;