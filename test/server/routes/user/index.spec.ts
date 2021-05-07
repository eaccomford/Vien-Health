import request from "supertest"
import createServer from "server"

let chai = require("chai")
const expect = chai.expect

const app = createServer()

describe('GET /user/users', ()=>{
    it('it should return 200 if users are fatched', (done) => {
        request(app).get('/user/users').expect(200, done)
    });
})



var auth: any = {};
before(loginUser(auth));
describe('GET /user/validate', ()=>{
    it('it should return 200 if the validation was successful', (done) => {
        request(app)
        .get('/user/validate')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done)
    });
})

function loginUser(auth:any) {
    return function(done:any) {
        request(app)
            .post('/user/login')
            .send({
                username: 'magaret',
                password: 'password'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err: Error, res: any) {
            auth.token = res.body.token;
            return done();
        }
    };
}

  describe("POST /user/register'", function(){
    it("it shoud return status code 200 if a user is created in the system", function(done) {
      request(app)
        .post("/user/register")
        .send({ username: "ama4", password: "password",firstname: "John", lastname: "Makafui"})
        .expect(201)
        .end(function(err, res){
          if (err) {
              done(err)
            }else{
               done(); 
            }
        });
    });
  });
describe("POST /user/login'", function(){
    it("it shoud return status code 200 if login is successful", function(done) {
      request(app)
        .post("/user/login")
        .send({ username: "magaret", password: "password" })
        .expect(200)
        .end(function(err, res){
            if (err) {
                done(err)
              }else{
                 done(); 
              }
        });
    });
  });
