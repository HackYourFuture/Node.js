import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("When app is open", () => {
  it("It must responds 200 status code.", async () => {
    const response = await request
      .get("/")
    expect(response.statusCode).toBe(200);
  })
})

describe("if requested city name is VALID", () => {
  it("Valid city name responds 200 status code.", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Almelo" });
    expect(response.statusCode).toBe(200);
  })
})


describe("if requested city name is INVALID", () => {
  it("Invalid city name responds 404 status code.", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "ndnd" });
    expect(response.statusCode).toBe(404);
  })
})

describe("if requested city name is INVALID", () => {
  it("Error message will be appeared", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "ndnd" });
    const errorMessage = response.text.includes("City is not found!");
    expect(errorMessage).toBe(true);
  })
})


