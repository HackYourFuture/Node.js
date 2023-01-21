import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /', () => {
  it('Quick test', () => {
    expect(1).toBe(1);
  });
});
