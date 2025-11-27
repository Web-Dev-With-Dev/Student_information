
import { GoogleGenAI } from "@google/genai";

// FIX: As per guidelines, assume API_KEY is present in environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateReport = async (query: string, data: any): Promise<string> => {
  // FIX: Removed API key check as it's assumed to be available.
  const model = 'gemini-2.5-flash';

  const dataString = JSON.stringify(data, null, 2);
  const truncatedData = dataString.length > 30000 ? dataString.substring(0, 30000) + '...' : dataString;

  const prompt = `
    You are an expert data analyst for a university's Student Information System.
    Your task is to answer questions based on the provided JSON data.
    The data contains arrays of objects for different entities like students, courses, departments, etc.
    Provide a clear, concise, and helpful answer. You can use markdown for formatting (e.g., lists, bold text).
    If the question cannot be answered with the given data, state that clearly.

    Here is the available data:
    \`\`\`json
    ${truncatedData}
    \`\`\`

    Please answer the following question: "${query}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text ?? "No response text found.";
  } catch (error) {
    console.error("Error generating report with Gemini:", error);
    return "Sorry, I couldn't generate the report. An error occurred. Please check the browser console for more details.";
  }
};
