import supertest from 'supertest';
import app from '../app.js';

const request = supertest(app);

describe("POST /weather", () => {
  it("Should return an error when no cityName is provided", async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required!");
  });

  it("Should return a city not found error for invalid city", async () => {
    const response = await request.post('/weather').send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("Should return temperature for a valid city", async () => {
    const response = await request.post('/weather').send({ cityName: "Amsterdam" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("The temperature in Amsterdam");
  });
});