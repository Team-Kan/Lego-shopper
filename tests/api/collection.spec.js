const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const { createCollection } = require("../../server/db/collection");
const app = require("../../server/app");
const { createUser } = require("../../server/db");
const { editIsAdmin } = require("../../server/db/User");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("get /collections/", () => {
  it("should return a list of all current collections", async () => {
    await createCollection({ name: "sample" });
    await createCollection({ name: "sample2" });
    await createCollection({ name: "sample3" });

    const response = await request(app).get("/api/collections");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe("sample");
  });
});

describe("delete /collections/remove/:id", () => {
  it("should delete a collection from the database", async () => {
    const newCollection = await createCollection({ name: "newSample" });
    const newUser = await createUser({name: "bob", password: "password"});
    const admin = await editIsAdmin(newUser.id);

    const response = await request(app).delete(
      `/api/collections/remove/${newCollection.id}`
    );
    // .set("Authorization", `Bearer ${token}`);

    expect(response.body.name).toBe(newCollection.name);
  });
});
