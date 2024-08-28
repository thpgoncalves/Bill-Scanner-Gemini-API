import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables');
}

const fileManager = new GoogleAIFileManager(apiKey);

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

export async function uploadImage(base64Image: string): Promise<string> {
  try {
    const mimeTypeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    if (!mimeTypeMatch) {
      throw new Error('Invalid base64 image format.');
    }
    
    const mimeType = mimeTypeMatch[1]; // Obtém o tipo MIME
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove o prefixo

    const buffer = Buffer.from(base64Data, 'base64');

    const tempFilePath = path.join(__dirname, `temp_image.${mimeType.split('/')[1]}`);

    await writeFileAsync(tempFilePath, buffer);

    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: mimeType,
      displayName: path.basename(tempFilePath),
    });

    console.log(`Arquivo enviado com sucesso: ${uploadResponse.file.displayName}`);
    console.log(`URI do arquivo: ${uploadResponse.file.uri}`);

    await unlinkAsync(tempFilePath);

    return uploadResponse.file.uri;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao fazer upload da imagem:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error('Failed to upload image');
  }
}