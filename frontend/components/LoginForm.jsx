import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate,Link } from 'react-router-dom';
const LoginForm = ({onLoginSuccess}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginUser(name, password);
            if (data) {
                localStorage.setItem('token', data);
                onLoginSuccess(data);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Błąd logowania: Sprawdź dane lub połączenie z serwerem.');
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Zaloguj się!</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <div className="relative mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 pt-3 pb-1 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6"                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-2 -top-2 bg-white px-1 text-sm text-gray-600"
                                >Email</label>
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
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="mt-5 text-center text-sm/6 text-gray-400">
                                    Zapomniales hasla?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                            >
                                Sign in
                            </button>
                            {error && <p className="font-semibold text-xs text-red-700">{error}</p>}
                        </div>
                    </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Nie masz jeszcze konta?{' '}
                                <Link to="/register" className="font-semibold text-gray-500 hover:text-gray-600">
                            Zarejestruj się!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginForm;