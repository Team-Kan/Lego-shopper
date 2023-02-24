const { syncAndSeed, client, syncTables } = require("../server/db/index");

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await client.connect();
  // await syncTables();
  await syncAndSeed();
};

module.exports = setup;
