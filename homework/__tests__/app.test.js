import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it(" should be a city name", async () => {
    const body = {
      cityName: "",
    };
    const response = await request.post("/weather").send(body);
    expect(response.statusCode).toBe(200);
  });

  it("should be a true city name", async () => {
    const body = {
      cityName: "amsterdam",
    };
    const response = await request.post("/weather").send(body);
    expect(response.statusCode).toBe(200);
  });
});
