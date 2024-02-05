import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);
import keys from '../sources/keys.js';


describe('Testing POST endpoint ( /weather ) with Valid Data', () => {

  it('should respond with the correct temperature', async () => {
    const cityName = 'London';

    const response = await request.post('/weather').send({ cityName });


    expect(response.body.weatherText).toContain(`${cityName}`);
    expect(response.status).toBe(200);
  });

});


describe('POST endpoint ( /weather ): Handling cityName validation Errors', () => {

  it('Should return an error msg if no cityName is provided', async () => {

    const errRes = await request.post('/weather').send();

    expect(errRes.text).toBe(`City Name is required`);
    expect(errRes.status).toBe(400);
  });


  it('Should return  an error msg if cityName has an empty string', async () => {
    const cityName = '      ';
    const errRes = await request.post('/weather').send({ cityName });

    expect(errRes.text).toEqual("City Name is required");
  });


  it('Should return a 404 status code and an error message if the city name does not exist', async () => {
    const nonExistentCity = 'Hakuna Matata';
    const res = await request.post("/weather").send({ cityName: nonExistentCity });

    expect(res.status).not.toBe(200);
    expect(res.body.weatherText).toContain('City Is Not Found!');
  });


  it('Should return a 400 status with an error message when cityName contains Invalid string ', async () => {
    const invalidString = "*&%^%%#%$@";
    const response = await request.post("/weather").send({ cityName: invalidString });

    expect(response.status).toBe(400);
    expect(response.text).toEqual(`Invalid Characters in cityName`);
  });

  it('Should return an error message when cityName contains numbers', async () => {
    const cityNumber = '20amsterdam765';
    const response = await request.post("/weather").send({ cityName: cityNumber });

    expect(response.status).toBe(400);
    expect(response.text).toEqual(`Invalid Characters in cityName`);
  });

});


/* Problem: I couldn't create a test unit here (need a help!)
describe('Handling Server-side Errors', () => {
  it("Should return a server error", async () => {

  });
*/