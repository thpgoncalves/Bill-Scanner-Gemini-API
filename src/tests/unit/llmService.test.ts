import { extractValueFromImage } from '../../api/services/llmService';

describe('extractValueFromImage', () => {
  it('should return a value when given a valid image URI', async () => {
    const result = await extractValueFromImage('https://example.com/image.png');
    expect(result).toBeDefined();
  });

  it('should throw an error when the image URI is invalid', async () => {
    await expect(extractValueFromImage('invalid_uri')).rejects.toThrow('Failed to process the image.');
  });
});
