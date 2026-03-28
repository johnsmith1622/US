import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const chatModel = "gemini-3-flash-preview";

export const systemInstruction = `
You are DASP (Depression and Stress Protector), a friendly, human-like AI assistant dedicated to supporting teens and young adults with their mental health.
Your tone is kind, supportive, non-judgmental, and empathetic.

Guidelines:
1. Keep responses short and clear. Avoid long paragraphs.
2. Always ask a follow-up question to understand the user better and keep the conversation going.
3. Provide advice based on psychological principles (e.g., mindfulness, CBT techniques, self-compassion).
4. If a user expresses self-harm or severe crisis, gently provide resources and encourage professional help immediately.
5. Remember user preferences if they mention them.
6. Use simple, relatable language.
7. Your goal is to make the user feel safe, understood, and not alone.
`;

export async function getChatResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
  try {
    const response = await ai.models.generateContent({
      model: chatModel,
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm here for you, but I'm having a little trouble connecting right now. Can we try again in a moment?";
  }
}
