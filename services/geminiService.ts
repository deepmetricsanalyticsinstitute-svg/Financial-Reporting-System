import { GoogleGenAI } from "@google/genai";
import { FinancialContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFinancialInsights = async (data: FinancialContext): Promise<string> => {
  try {
    const prompt = `
      Act as a senior CFO. Analyze the following financial dashboard data for ${data.companyName} (Date: ${data.reportingDate}).
      
      Metrics:
      ${data.metrics.map(m => `- ${m.title}: ${m.value} (Trend: ${m.trend || 'N/A'})`).join('\n')}
      
      Ratios:
      ${data.ratios.map(r => `- ${r.title}: ${r.value} (Target: ${r.target})`).join('\n')}
      
      Instructions:
      1. Provide a concise, high-impact executive summary (max 3 sentences).
      2. If Profit Margin or Net Income is negative or low, provide 1 specific recommendation.
      3. Use a professional but encouraging tone.
      4. Do not use markdown headers (like ##), just plain text or bullet points if necessary.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Unable to connect to AI service. Please ensure your API key is configured correctly.";
  }
};
