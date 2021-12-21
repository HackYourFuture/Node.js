import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /', () => {
  it('Quick test', () => {
    expect(1).toBe(1);
  });

  it('Status code is 200', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'Amsterdam' });

    expect(response.statusCode).toBe(200);
  });

  it('Test if user gives incorrect cityName', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'Amsterdam' });

    expect(response.body.weatherText).toContain('cityName');
  });
});
