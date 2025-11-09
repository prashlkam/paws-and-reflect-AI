
import React, { useState } from 'react';
import { Dog, Activity } from '../types';
import DogDiary from './DogDiary';
import AiRecommendations from './AiRecommendations';
import { ArrowLeft, BookOpen, Sparkles, PawPrint } from './Icons';

interface DogDetailViewProps {
  dog: Dog;
  activities: Activity[];
  onAddActivity: (dogId: string, activity: Activity) => void;
  onBack: () => void;
}

type ViewTab = 'diary' | 'ai';

const DogDetailView: React.FC<DogDetailViewProps> = ({ dog, activities, onAddActivity, onBack }) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('diary');

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-2 text-indigo-500 font-semibold mb-6 hover:underline">
        <ArrowLeft className="w-5 h-5" />
        <span>All Dogs</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          {dog.picture ? (
            <img src={dog.picture} alt={dog.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700" />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md border-4 border-white dark:border-gray-700">
                <PawPrint className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{dog.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{dog.breed}</p>
            <p className="text-md text-gray-500 dark:text-gray-500 mt-1">{dog.age} years old, {dog.sex}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                  onClick={() => setActiveTab('diary')}
                  className={`${activeTab === 'diary' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}
                  flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Dog Diary
              </button>
              <button
                  onClick={() => setActiveTab('ai')}
                  className={`${activeTab === 'ai' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}
                  flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Recommendations
              </button>
          </nav>
      </div>

      <div>
        {activeTab === 'diary' && (
          <DogDiary dog={dog} activities={activities} onAddActivity={onAddActivity} />
        )}
        {activeTab === 'ai' && (
          <AiRecommendations dog={dog} activities={activities} />
        )}
      </div>

    </div>
  );
};

export default DogDetailView;