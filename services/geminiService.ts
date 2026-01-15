
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getPetAdvice = async (prompt: string, history: { role: 'user' | 'model', content: string }[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any, // Cast for compatibility with expected message structure if needed
      config: {
        systemInstruction: "You are PawsomeCare AI, a professional and compassionate pet care expert. You provide advice on pet health, nutrition, behavior, and daily care. Always remind owners to consult a local veterinarian for medical emergencies or serious health concerns. Keep your tone warm, encouraging, and clear.",
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
  }
};
