import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return 400 if cityName is missing", async () => {
    const res = await request.post("/weather").send({});
    expect(res.status).toBe(400);
    expect(res.body.weatherText).toBe("cityName is required");
  });

  it("should return 404 if cityName is invalid", async () => {
    const res = await request.post("/weather").send({ cityName: "InvalidCity123" });
    expect(res.status).toBe(404);
    expect(res.body.weatherText).toBe("City is not found!");
  });

  it("should return temperature if cityName is valid", async () => {
    const res = await request.post("/weather").send({ cityName: "Amsterdam" });
    expect(res.status).toBe(200);
    expect(res.body.weatherText).toContain("The temperature in Amsterdam is");
  });
});
