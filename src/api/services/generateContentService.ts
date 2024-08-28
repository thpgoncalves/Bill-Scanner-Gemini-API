import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateContentWithImage(imageUri: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: "image/jpeg",
          fileUri: imageUri,
        },
      },
      { text: "Descreva como este produto pode ser fabricado." },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error('Failed to generate content');
  }
}
