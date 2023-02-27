const setup = require("../setup");
const tearDown = require("../tearDown");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});
