const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");

beforeAll(async () => {
    await setup();
});

afterAll(async () => {
    await tearDown();
});

const client = { name: "Anthony", email: "actninswitch@gmail.com" }
const content = { products: "<li>Hello</li>"}

describe("post /mail/", () => {
    it("should return a list of all current collections", async () => {
      const response = await request(app)
      .post("/api/mail")
      .send({ client, content });
      console.log(response.body);
      expect(response.body).not.toBe(null);
    });
});