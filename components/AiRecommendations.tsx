// Fix: Populating file with AiRecommendations component implementation.
import React, { useState, useCallback } from 'react';
import { Dog, Activity } from '../types';
import { getAIRecommendations } from '../services/geminiService';
import { BrainCircuit, Sparkles } from './Icons';

interface AiRecommendationsProps {
  dog: Dog;
  activities: Activity[];
}

const AiRecommendations: React.FC<AiRecommendationsProps> = ({ dog, activities }) => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations('');
    try {
      const result = await getAIRecommendations(dog, activities);
      setRecommendations(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get recommendations. Please try again later. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dog, activities]);
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-fade-in">
      <div className="flex items-center mb-4">
        <Sparkles className="w-8 h-8 text-indigo-500 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI-Powered Insights for {dog.name}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Get personalized recommendations based on {dog.name}'s profile and recent activities. Our AI will analyze the data to provide helpful tips for your furry friend.
      </p>

      <button
        onClick={fetchRecommendations}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-indigo-500 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <BrainCircuit className="w-5 h-5 mr-2 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <BrainCircuit className="w-5 h-5 mr-2" />
            <span>Generate Recommendations</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {recommendations && !isLoading && !error && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
           <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{recommendations}</div>
        </div>
      )}

      {!recommendations && !isLoading && !error && (
         <div className="mt-6 text-center py-10 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <BrainCircuit className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Ready for Insights?</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Click the button above to generate AI recommendations for {dog.name}.</p>
          </div>
      )}
    </div>
  );
};

export default AiRecommendations;
