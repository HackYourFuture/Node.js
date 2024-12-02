import { server } from "../server.js";
import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);


describe("POST /", () => {
  it("check if city name is valid", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": "London"});
    expect(response.status).toBe(200);
  });

  it("check if city name is missing", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": ""});
    expect(response.status).toBe(400)
  });

  it("check if city name is wrong", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": "Londondondon"});
    expect(response.body).toEqual({ error: "API error" });
  });

  it("check if request body is a string", async () => {
    const response = await request
      .post("/weather")
      .send({"cityName": "London"}) 
      .set("Content-Type", "application/json"); 
    expect(response.status).toBe(200);
    });

  it("check if the temperature is a number", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": "London"});
    const fetchApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=c34f56e7a569f2c2cf3e24aceac5ddc8&units=metric`);
    const data = await fetchApi.json();
    expect(typeof data.main.temp).toBe("number");
  });

  it("check if the temperature is a valid number", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": "Ondangwa"});
    const fetchApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ondangwa&appid=c34f56e7a569f2c2cf3e24aceac5ddc8&units=metric`);
    const data = await fetchApi.json();
    expect(data.main.temp).toBeGreaterThanOrEqual(-90);
    expect(data.main.temp).toBeLessThanOrEqual(57);
  });

  it("check if fetch API is ok", async () => {
    const response = await request
    .post('/weather')
    .send({"cityName": "London"});
    const fetchApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=c34f56e7a569f2c2cf3e24aceac5ddc8&units=metric`);
    expect(fetchApi.status).toBe(200)
  });
});

afterAll(() => {
  server.close();
});