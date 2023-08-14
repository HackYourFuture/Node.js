import app from "../server";
import supertest from "supertest";

const request = supertest(app);

describe("Weather API", () => {
  it("should get weather information for a city", async () => {
    const response = await request.post("/weather").send({ cityName: "alger" });
    expect(response.status).toBe(200);
  });
});
describe("entry point", () => {
  it("should return hello from backend to frontend!", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("hello from backend to frontend!");
  });
});
