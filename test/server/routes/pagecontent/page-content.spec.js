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
describe('GET /page-content/pages', function () {
    it('it should return 200 if pages are fatched', function (done) {
        supertest_1.default(app)
            .get('/user/users')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200, done);
    });
});
function loginUser(auth) {
    return function (done) {
        supertest_1.default(app)
            .post('/user/login')
            .send({
            username: 'pk',
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
describe("POST /page-content/store", function () {
    it("it shoud return status code 200 if a page is created", function (done) {
        supertest_1.default(app)
            .post("/page-content/store")
            .send({ page: "home", title: "love God", subtitle: "subtitle", body: "this sis the body", file: 'file path', url: 'any url', status: 1 })
            .expect(201)
            .end(function (err, res) {
            if (err) {
                done(res.text);
            }
            else {
                done(err);
            }
        });
    });
});
