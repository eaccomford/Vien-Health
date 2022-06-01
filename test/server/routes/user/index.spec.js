"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("server"));
var chai = require("chai");
var expect = chai.expect;
var app = server_1.default();
var auth = {};
before(loginUser(auth));
describe('GET /user/users', function () {
    it('it should return 200 if users are fatched', function (done) {
        supertest_1.default(app)
            .get('/user/users')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200, done);
    });
});
describe('GET /user/validate', function () {
    it('it should return 200 if the validation was successful', function (done) {
        supertest_1.default(app)
            .get('/user/validate')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200, done);
    });
});
function loginUser(auth) {
    return function (done) {
        supertest_1.default(app)
            .post('/user/login')
            .send({
            username: 'magaret',
            password: 'password'
        })
            .expect(200)
            .end(onResponse);
        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}
// describe("POST /user/register'", function(){
//   it("it shoud return status code 200 if a user is created in the system", function(done) {
//     request(app)
//       .post("/user/register")
//       .send({ username: "test-user-name1", password: "password",firstname: "John", lastname: "Makafui"})
//       .expect(201)
//       .end(function(err, res){
//         if (err) {
//             done(res.text)
//           }else{
//              done(err); 
//           }
//       });
//   });
// });
describe("POST /user/login'", function () {
    it("it shoud return status code 200 if login is successful", function (done) {
        supertest_1.default(app)
            .post("/user/login")
            .send({ username: "magaret", password: "password" })
            .expect(200)
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            else {
                done();
            }
        });
    });
});
describe("PUT /user/logout'", function () {
    it("it shoud return status code 200 if logout is successful", function (done) {
        supertest_1.default(app)
            .put("/user/logout")
            .send({ userid: "magaret" })
            .expect(200)
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            else {
                done();
            }
        });
    });
});
