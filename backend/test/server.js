let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

const API = 'http://localhost:4000'

describe("API Test", () => {
    it("Test GET route /animals", (done) => {
        chai.request(API)
        .get("/animals")
        .end((err, response) => {
            response.should.have.status(200)
            response.body.should.be.a("array")
            response.body.length.should.not.be.eq(0)
            done()
        })
    })
})