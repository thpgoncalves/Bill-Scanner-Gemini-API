import axios from 'axios';

export const extractValueFromImage = async (base64Image: string) => {
  try {
    const response = await axios.post('https://api.gemini.com/llm/extract', {
      image: base64Image
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.extracted_value;
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    throw new Error('Failed to process the image.');
  }
};