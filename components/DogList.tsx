
import React, { useState } from 'react';
import { Dog } from '../types';
import AddDogForm from './AddDogForm';
import { PlusCircle, PawPrint } from './Icons';

interface DogListProps {
  dogs: Dog[];
  onAddDog: (dog: Dog) => void;
  onSelectDog: (dogId: string) => void;
}

const DogProfileCard: React.FC<{ dog: Dog, onSelect: () => void }> = ({ dog, onSelect }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-in-up"
      onClick={onSelect}
    >
      {dog.picture ? (
        <img className="w-full h-48 object-cover" src={dog.picture} alt={dog.name} />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <PawPrint className="w-24 h-24 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{dog.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{dog.breed}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{dog.age} years old, {dog.sex}</p>
      </div>
    </div>
  );
};


const DogList: React.FC<DogListProps> = ({ dogs, onAddDog, onSelectDog }) => {
  const [isAddingDog, setIsAddingDog] = useState(false);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogs.map(dog => (
          <DogProfileCard key={dog.id} dog={dog} onSelect={() => onSelectDog(dog.id)} />
        ))}
         <button
          onClick={() => setIsAddingDog(true)}
          className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-300 p-6 min-h-[280px]"
        >
          <PlusCircle className="w-12 h-12 mb-2" />
          <span className="font-semibold">Add New Dog</span>
        </button>
      </div>

      {isAddingDog && (
        <AddDogForm
          onAddDog={onAddDog}
          onClose={() => setIsAddingDog(false)}
        />
      )}
    </div>
  );
};

export default DogList;