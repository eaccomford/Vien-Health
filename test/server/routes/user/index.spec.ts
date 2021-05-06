import request from "supertest"
import expect from "chai"

import createServer from "server"

const app = createServer()

describe('user routes', () => {
    it('/user/users responds with 200', (done) => {
        request(app).get('/user/users').expect(200, done)
    });
    it('/user/login responds with 200', (done) => {
        request(app).get('/user/login').expect(200, done)
    });
    it('/user/register responds with 200', (done) => {
        request(app).get('/user/register').expect(200, done)
    });
    it('/user/validate responds with 200', (done) => {
        request(app).get('/user/validate').expect(200, done)
    });
});
