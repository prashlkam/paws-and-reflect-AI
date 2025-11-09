// Fix: Populating file with Gemini API service implementation.
import { GoogleGenAI } from "@google/genai";
import { Dog, Activity } from '../types';

// Per coding guidelines, API key must be from process.env.API_KEY.
// This variable is assumed to be pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (dog: Dog, activities: Activity[]): Promise<string> => {
  // Per coding guidelines, use a recommended model name. 'gemini-2.5-flash' is suitable for this task.
  const model = 'gemini-2.5-flash';

  // Summarize the most recent activities to provide context to the model.
  const activitySummary = activities.slice(0, 10).map(a => `- ${a.type}: ${a.description} at ${new Date(a.timestamp).toLocaleString()}`).join('\n');

  const prompt = `
    Based on the following information about a dog, provide some personalized recommendations for its owner.
    The recommendations should be helpful, friendly, and actionable. Focus on health, enrichment, and training.
    Format the output as simple text with bullet points or numbered lists.

    Dog Information:
    - Name: ${dog.name}
    - Breed: ${dog.breed}
    - Age: ${dog.age} years
    - Sex: ${dog.sex}

    Recent Activities (last 10):
    ${activitySummary || 'No recent activities logged.'}

    Provide 3-5 recommendations.
  `;

  try {
    // Per coding guidelines, use ai.models.generateContent
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Per coding guidelines, extract text output directly from the .text property.
    return response.text;
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return "Sorry, I couldn't fetch recommendations at this time. Please check your API key and try again.";
  }
};
