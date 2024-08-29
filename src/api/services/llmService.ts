import axios from 'axios';

export const extractValueFromImage = async (imageUri: string) => {
  try {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      instances: [
        {
          fileData: {
            mimeType: "image/png",  // ajuste conforme o tipo MIME da imagem
            fileUri: imageUri
          }
        },
        { text: "Get the measure value and the measure uuid." }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, 
        'Content-Type': 'application/json'
      }
    });

    return response.data.generated_text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error contacting Gemini API:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to process the image.');
  }
};