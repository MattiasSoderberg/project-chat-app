import { server } from "../app";
import chai from "chai";
import { describe } from "mocha";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

describe("Testing messages controller", () => {
  describe("Test GET route without auth", () => {
    it("should return 401 status", (done) => {
      chai
        .request(server)
        .get("/messages")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });
});
