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

describe("/api/unknown", () => {
  it("should return a 404", async () => {
    const response = await request(app).get("/api/unknown");
    expect(response.status).toEqual(404);
    // the 404 response returns an object with a message property
    expect(typeof response.body.message).toEqual("string");
  });
});
