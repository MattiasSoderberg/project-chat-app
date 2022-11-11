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
  describe("Test GET route WITH auth", () => {
    it("should register a user, get all messages and delete the user", () => {
      chai
        .request(server)
        .post("/users")
        .send({
          username: "test3",
          password: "test",
        })
        .end((err, res) => {
          res.should.have.status(201);

          chai
            .request(server)
            .post("/users/login")
            .send({
              username: "test3",
              password: "test",
            })
            .end((err, res) => {
              res.body.should.have.property("token");
              const token = res.body.token;

              chai
                .request(server)
                .get("/messages")
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                  res.should.have.status(200);

                  chai
                    .request(server)
                    .delete("/users")
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                      res.should.have.status(200);
                    });
                });
            });
        });
    });
  });
});
