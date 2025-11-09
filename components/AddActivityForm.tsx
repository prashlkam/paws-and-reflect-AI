
import React, { useState } from 'react';
import { Activity, ActivityType } from '../types';
import { X } from './Icons';

interface AddActivityFormProps {
  dogId: string;
  onAddActivity: (dogId: string, activity: Activity) => void;
  onClose: () => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ dogId, onAddActivity, onClose }) => {
  const [type, setType] = useState<ActivityType>(ActivityType.Walk);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description) {
      const newActivity: Activity = {
        id: new Date().toISOString(),
        dogId,
        timestamp: new Date().toISOString(),
        type,
        description,
        photo,
      };
      onAddActivity(dogId, newActivity);
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Log a New Activity</h2>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Type</label>
            <select value={type} onChange={e => setType(e.target.value as ActivityType)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
              {Object.values(ActivityType).map(activityType => (
                <option key={activityType} value={activityType}>{activityType}</option>
              ))}
            </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea placeholder="What happened?" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none h-28" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add a Photo (Optional)</label>
             <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            {photo && <img src={photo} alt="Preview" className="mt-4 rounded-md h-32 w-32 object-cover"/>}
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">Add Activity</button>
        </form>
      </div>
    </div>
  );
};

export default AddActivityForm;
