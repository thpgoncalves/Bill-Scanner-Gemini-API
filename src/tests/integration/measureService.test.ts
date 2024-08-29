import { saveMeasurement, checkExistingMeasurement } from '../../api/services/measureService';
import  connectDB, { disconnectDB }  from '../../api/models/database';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('measureService integration tests', () => {
  it('should save and retrieve a measurement', async () => {
    const measurementData = {
      measure_uuid: 'test-uuid',
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      value: 100,
      image_link: 'https://example.com/image.png',
      confirmed: false,
    };

    await saveMeasurement(measurementData);

    const result = await checkExistingMeasurement('123', measurementData.measure_datetime, 'WATER');
    expect(result).toBeDefined();
    expect(result?.value).toBe(100);
  });
});