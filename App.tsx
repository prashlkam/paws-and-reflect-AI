import React, { useState, useEffect } from 'react';
import { Dog, Activity, User } from './types';
import DogList from './components/DogList';
import DogDetailView from './components/DogDetailView';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { PawPrint } from './components/Icons';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [activities, setActivities] = useState<Record<string, Activity[]>>({});
  const [selectedDogId, setSelectedDogId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user-specific data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      try {
        const savedDogs = localStorage.getItem(`dogs_${currentUser.email}`);
        const savedActivities = localStorage.getItem(`activities_${currentUser.email}`);
        setDogs(savedDogs ? JSON.parse(savedDogs) : []);
        setActivities(savedActivities ? JSON.parse(savedActivities) : {});
      } catch {
        setDogs([]);
        setActivities({});
      }
    } else {
      localStorage.removeItem('currentUser');
      setDogs([]);
      setActivities({});
    }
  }, [currentUser]);

  // Save dogs to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`dogs_${currentUser.email}`, JSON.stringify(dogs));
    }
  }, [dogs, currentUser]);

  // Save activities to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`activities_${currentUser.email}`, JSON.stringify(activities));
    }
  }, [activities, currentUser]);

  // A small delay to show initial loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setSelectedDogId(null); // Reset view on login
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedDogId(null);
  };

  const handleAddDog = (dog: Dog) => {
    setDogs(prevDogs => [...prevDogs, dog]);
    setActivities(prevActivities => ({ ...prevActivities, [dog.id]: [] }));
  };

  const handleSelectDog = (dogId: string) => {
    setSelectedDogId(dogId);
  };

  const handleBackToList = () => {
    setSelectedDogId(null);
  };

  const handleAddActivity = (dogId: string, activity: Activity) => {
    setActivities(prevActivities => ({
      ...prevActivities,
      [dogId]: [activity, ...(prevActivities[dogId] || [])],
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center text-gray-500">
        <PawPrint className="w-16 h-16 animate-bounce" />
        <p className="mt-4 text-lg font-semibold">Loading Doggy Diary...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const selectedDog = dogs.find(dog => dog.id === selectedDogId);
  const selectedDogActivities = selectedDog ? (activities[selectedDog.id] || []) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-8">
        {selectedDog ? (
          <DogDetailView 
            dog={selectedDog}
            activities={selectedDogActivities}
            onAddActivity={handleAddActivity}
            onBack={handleBackToList}
          />
        ) : (
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">Your Pack</h1>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-6">Select a dog to view their diary or add a new member to your pack.</p>
            <DogList 
              dogs={dogs}
              onAddDog={handleAddDog}
              onSelectDog={handleSelectDog} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
