const client = require('../server/db/client');

const tearDown = async () => {
  await client.end();
  console.log("Client Ended");
}

module.exports = tearDown;
