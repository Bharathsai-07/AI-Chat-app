import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export const generateResult = async (prompt) => {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  const text =
    response?.text ||
    response?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || '')
      .join('') ||
    'No response from Gemini';

  return text;
};