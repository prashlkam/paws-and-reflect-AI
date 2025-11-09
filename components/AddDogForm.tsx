
import React, { useState, useCallback } from 'react';
import { Dog } from '../types';
import { X } from './Icons';

interface AddDogFormProps {
  onAddDog: (dog: Dog) => void;
  onClose: () => void;
}

const AddDogForm: React.FC<AddDogFormProps> = ({ onAddDog, onClose }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female'>('Male');
  const [picture, setPicture] = useState<string | null>(null);

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && breed && age) {
      const newDog: Dog = {
        id: new Date().toISOString(),
        name,
        breed,
        age: parseInt(age, 10),
        sex,
        ...(picture && { picture }),
      };
      onAddDog(newDog);
      onClose();
    }
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in" onClick={handleBackdropClick}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 animate-slide-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add a New Dog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="text" placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required min="0" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="sex" value="Male" checked={sex === 'Male'} onChange={() => setSex('Male')} className="form-radio text-indigo-500"/>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Male</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="sex" value="Female" checked={sex === 'Female'} onChange={() => setSex('Female')} className="form-radio text-indigo-500"/>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Female</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dog's Picture (Optional)</label>
            <input type="file" accept="image/*" onChange={handlePictureUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            {picture && <img src={picture} alt="Preview" className="mt-4 rounded-md h-32 w-32 object-cover"/>}
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">Add Dog</button>
        </form>
      </div>
    </div>
  );
};

export default AddDogForm;