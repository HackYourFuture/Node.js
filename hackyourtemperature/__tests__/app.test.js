import app from "../app";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {

    test("undefined cityName should respond with a 400 status code", async () => {
        const response = await request.post("/weather").send({
            cityName: "undefined"
        });
        expect(response.statusCode).toBe(400);
    });
});