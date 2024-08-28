import { GoogleAIFileManager } from "@google/generative-ai/server";
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not set in the environment variables');
}

const fileManager = new GoogleAIFileManager(apiKey);

export async function uploadImage(imagePath: string): Promise<string> {
  try {
    const resolvedImagePath = path.resolve(imagePath);

    const uploadResponse = await fileManager.uploadFile(resolvedImagePath, {
      mimeType: "image/jpeg",
      displayName: "Uploaded Image",
    });

    console.log(`Arquivo enviado com sucesso: ${uploadResponse.file.displayName}`);
    console.log(`URI do arquivo: ${uploadResponse.file.uri}`);

    return uploadResponse.file.uri;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error('Failed to upload image');
  }
}
