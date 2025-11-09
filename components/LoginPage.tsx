import React, { useState } from 'react';
import { User } from '../types';
import { PawPrint, User as UserIcon, Lock } from './Icons';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

type FormMode = 'login' | 'register';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [mode, setMode] = useState<FormMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            
            if (mode === 'login') {
                if (users[email] && users[email] === password) {
                    onLogin({ email });
                } else {
                    setError('Invalid email or password.');
                }
            } else { // register
                if (users[email]) {
                    setError('User with this email already exists.');
                } else {
                    const newUsers = { ...users, [email]: password };
                    localStorage.setItem('users', JSON.stringify(newUsers));
                    onLogin({ email });
                }
            }
        } catch (e) {
            setError('An error occurred. Please try again.');
        }
    };
    
    const toggleMode = () => {
        setError('');
        setEmail('');
        setPassword('');
        setMode(mode === 'login' ? 'register' : 'login');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 animate-fade-in">
            <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl text-center">
                <PawPrint className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                    {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {mode === 'login' ? 'Log in to see your pack.' : 'Your smart companion for pet care.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                     <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-600 transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {mode === 'login' ? 'Log In' : 'Register'}
                    </button>
                </form>
                
                <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleMode} className="font-semibold text-indigo-500 hover:text-indigo-400 ml-1">
                        {mode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
