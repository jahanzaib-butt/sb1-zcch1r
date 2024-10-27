import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // WARNING: This is not secure for production use
});

export const generateChatResponse = async (messages: { role: string; content: string }[], model: string) => {
  try {
    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};