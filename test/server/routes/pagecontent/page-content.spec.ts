import request from "supertest"
import createServer from "server"

let chai = require("chai")
const expect = chai.expect

const app = createServer()

var auth: any = {};
before(loginUser(auth));

describe('GET /page-content/pages', ()=>{
    it('it should return 200 if pages are fatched', (done) => {
        request(app)
        .get('/user/users')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done)
    });
})





function loginUser(auth:any) {
    return function(done:any) {
        request(app)
            .post('/user/login')
            .send({
                username: 'pk',
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

  describe("POST /page-content/store", function(){
    it("it shoud return status code 200 if a page is created", function(done) {
      request(app)
        .post("/page-content/store")
        .send({ page: "home", title: "love God",subtitle: "subtitle", body: "this sis the body", file:'file path', url:'any url', status: 1})
        .expect(201)
        .end(function(err, res){
          if (err) {
              done(res.text)
            }else{
               done(err); 
            }
        });
    });
  });
