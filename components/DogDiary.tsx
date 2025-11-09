
import React, { useState } from 'react';
import { Dog, Activity, ActivityType } from '../types';
import AddActivityForm from './AddActivityForm';
import { PlusCircle, Utensils, Footprints, ToyBrick, Bed, Stethoscope, Scissors, GraduationCap, Info } from './Icons';

interface DogDiaryProps {
  dog: Dog;
  activities: Activity[];
  onAddActivity: (dogId: string, activity: Activity) => void;
}

const ActivityIcon: React.FC<{ type: ActivityType, className?: string }> = ({ type, className = "w-6 h-6" }) => {
    switch(type) {
        case ActivityType.Food: return <Utensils className={className} />;
        case ActivityType.Walk: return <Footprints className={className} />;
        case ActivityType.Play: return <ToyBrick className={className} />;
        case ActivityType.Sleep: return <Bed className={className} />;
        case ActivityType.Vet: return <Stethoscope className={className} />;
        case ActivityType.Grooming: return <Scissors className={className} />;
        case ActivityType.Training: return <GraduationCap className={className} />;
        default: return <Info className={className} />;
    }
}

const DogDiary: React.FC<DogDiaryProps> = ({ dog, activities, onAddActivity }) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Activity Log</h2>
        <button
          onClick={() => setIsAddingActivity(true)}
          className="flex items-center space-x-2 bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Log Activity</span>
        </button>
      </div>

      <div className="space-y-8">
        {activities.length > 0 ? (
          activities.map(activity => (
            <div key={activity.id} className="flex space-x-4">
              <div className="flex flex-col items-center">
                  <div className="bg-indigo-500 rounded-full p-3 text-white">
                      <ActivityIcon type={activity.type} />
                  </div>
                  <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div className="pb-8 w-full">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">{activity.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{activity.description}</p>
                  {activity.photo && (
                    <img src={activity.photo} alt="Activity" className="mt-4 rounded-lg max-h-64 object-cover" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Activities Logged</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Start logging activities to build {dog.name}'s diary!</p>
          </div>
        )}
      </div>

      {isAddingActivity && (
        <AddActivityForm
          dogId={dog.id}
          onAddActivity={onAddActivity}
          onClose={() => setIsAddingActivity(false)}
        />
      )}
    </div>
  );
};

export default DogDiary;
