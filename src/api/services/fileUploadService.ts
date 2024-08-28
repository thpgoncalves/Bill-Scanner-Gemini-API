import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables');
}

const uploadEndpoint = 'https://generativelanguage.googleapis.com/upload/v1beta/files';

export async function uploadImage(base64Image: string): Promise<string> {
  try {
    const response = await axios.post(
      uploadEndpoint,
      {
        file: {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg"
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    console.log(`Arquivo enviado com sucesso: ${response.data.file.displayName}`);
    console.log(`URI do arquivo: ${response.data.file.uri}`);

    return response.data.file.uri;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error('Failed to upload image');
  }
}
