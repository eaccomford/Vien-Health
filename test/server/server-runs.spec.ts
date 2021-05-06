import request from "supertest"
import {expect} from "chai"

import createServer from "server"
const app = createServer()

describe('server checks', () => {
    it('server is created without err', (done) => {  
         request(app).get("/").expect(200, done)
    });
    
});
