import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST / Positive scenarios: correct cityName is provided", () => {
    it("Should respond with 200 when we pass a correct city", async () => {
      const res = await request.post("/weather").send({
        cityName: "Amsterdam",
      })
      expect(res.statusCode).toBe(200)
    });
    it("Should have json in content-type", async () => {
      const res = await request.post("/weather").send({
        cityName: "Amsterdam",
      })
      expect(res.header["content-type"]).toContain('json');
    });
    it("Response should contain temperature", async () => {
      const response = await request.post("/weather").send({
        cityName: "Amsterdam",
      });
      expect(typeof response.body["Temperature"]).toEqual("number");
    });
    it("Response should contain city name", async () => {
      const response = await request.post("/weather").send({
        cityName: "Amsterdam",
      });
      expect(response.body["City"]).toEqual("Amsterdam");
    });

  })

  describe("POST / negative scenario: cityName is invalid", () => {
    it("Should respond with 404 status code if the cityName is invalid", async () => {
      const res = await request.post("/weather").send({
        cityName: "Amsfffffffterdam",
      });
      expect(res.statusCode).toBe(404);
    });
    
  });