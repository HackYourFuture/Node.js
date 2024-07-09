const request = require('supertest');
const { app, server } = require('../server'); // Adjust path as needed

afterAll(async () => {
  await server.close(); // Close the server after all tests
});

describe('POST /weather', () => {
  it('should respond with weather data for a valid city', async () => {
    const response = await request(app)
      .post('/weather')
      .send({ cityName: 'Adana' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('weatherText');
    expect(response.body.weatherText).toMatch(/Current temperature in Adana is/);
  });

  it('should respond with an error message for an invalid city', async () => {
    const response = await request(app)
      .post('/weather')
      .send({ cityName: 'InvalidCityName' });

    expect(response.status).toBe(404); // Adjust status code based on your implementation
    expect(response.body).toHaveProperty('weatherText');
    expect(response.body.weatherText).toMatch(/City 'InvalidCityName' not found/);
  });
});
