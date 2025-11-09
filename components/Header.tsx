import React from 'react';
import { User } from '../types';
import { PawPrint, LogOut } from './Icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <PawPrint className="w-8 h-8 text-indigo-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Doggy Diary AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{user.email}</span>
          <button onClick={onLogout} className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
