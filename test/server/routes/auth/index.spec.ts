import request from "supertest"
import expect from "chai"

import createServer from "server"

const app = createServer()

describe('auth routes', () => {
    it('/auth responds with 200', (done) => {
        request(app).get('/auth').expect(200, done)
    });
    it('/auth/login responds with 200', (done) => {
        request(app).get('/auth/login').expect(200, done)
    });
    it('/auth/register responds with 200', (done) => {
        request(app).get('/auth/register').expect(200, done)
    });
});
