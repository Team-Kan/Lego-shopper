const { syncTables } = require("../server/db");
const client = require("../server/db/client");

const tearDown = async () => {
  // await syncTables();
  await client.end();
  console.log("Client Ended");
};

module.exports = tearDown;
