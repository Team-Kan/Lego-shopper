//make sure to make a dummy database to test out the data and functions on
//need to make sure we don't save it in the main branch that way, but add it to the local client
const { editIsAdmin, getAllUsers, createUser } = require("../../server/db/User");
const setup = require("../setup");
const tearDown = require("../tearDown");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("createUser()", () => {
  it("doesn't return the password", async () => {
    const user = await createUser({ username: "dan", password: "isPassword" });

    expect(user.password).toBe(undefined);
  });
  it("to have isAdmin false by default", async () => {
    const secondUser = await createUser({
      username: "danny",
      password: "isPassword2",
    });

    expect(secondUser.isAdmin).toBe(false);
  });
});

describe("editIsAdmin() editing isAdmin, with true or false.", () => {
  it("to turn isAdmin to be true if it is false and it to be false if true", async () => {
    const thirdUser = await createUser({
      username: "notDan",
      password: "thisispassword",
    });

    const newAdmin = await editIsAdmin(thirdUser);
    expect(newAdmin.isAdmin).toBe(true);
    const goodbyeAdmin = await editIsAdmin(newAdmin);
    expect(goodbyeAdmin.isAdmin).toBe(false);
  });
});

describe("getAllUsers() expects a array of all users", () => {
  it("returns all the users, without passwords", async () => {
    const allUsers = await getAllUsers()

    expect(allUsers.length).toBe(3)
    expect(allUsers[0].password).toBe(undefined)
  })
})
