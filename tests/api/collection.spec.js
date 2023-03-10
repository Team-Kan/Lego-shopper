const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createCollection } = require("../../server/db/collection");
const { createUser } = require("../../server/db");
const {
  editIsAdmin,
  authenticate,
  getUserByToken,
} = require("../../server/db/User");

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
    const newUser = await createUser({ username: "bob", password: "password" });
    const admin = await editIsAdmin(newUser);
    const token = await authenticate({
      username: admin.username,
      password: "password",
    });

    const response = await request(app)
      .delete(`/api/collections/${newCollection.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.name).toBe(newCollection.name);
  });
  it("should not let a regular user delete a collection", async () => {
    const newCollection = await createCollection({ name: "newSample" });
    const { username } = await createUser({
      username: "bob23",
      password: "password23",
    });
    const token = await authenticate({ username, password: "password23" });

    const response = await request(app)
      .delete(`/api/collections/${newCollection.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: `${username} is not an admin.`,
        error: "Unathorized user",
        name: "NotAllowedUserError",
      })
    );
  });
});

describe("PATCH api/collection/:id", () => {
  it("should edit a collections name if an admin makes the request", async () => {
    const newCollection = await createCollection({ name: "newAgeSample" });
    const token = await authenticate({ username: "bob", password: "password" });
    // const {username, isA} = await getUserByToken(token);
    const newName = { name: "NotANewAgeSample" };
    const response = await request(app)
      .patch(`/api/collections/${newCollection.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newName);

    expect(response.body.name).toBe(newName.name);
    expect(response.body.id).toBe(newCollection.id);
  });
});
