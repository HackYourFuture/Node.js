import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("HackYourTemperature API", () => {
  it("Quick test", () => {
    expect(1).toBe(1);
  });

  it("GET / should return hello", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("hello");
  });

  it("POST /weather without cityName should return 400", async () => {
    const res = await request.post("/weather").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.weatherText).toContain("required");
  });

  it("POST /weather with invalid city should return 404", async () => {
    const res = await request.post("/weather").send({ cityName: "xyzcity" });
    expect(res.statusCode).toBe(404);
    expect(res.body.weatherText).toContain("not found");
  });

  it("POST /weather with real city should return temperature", async () => {
    const res = await request.post("/weather").send({ cityName: "Amsterdam" });
    expect(res.statusCode).toBe(200);
    expect(res.body.weatherText).toContain("Amsterdam");
    expect(res.body.weatherText).toContain("°C");
  });
});
