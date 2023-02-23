const { syncAndSeed, client } = require('../server/db/index');

const setup = async () => {
  console.log("--- JEST SETUP ---");
  client.connect()
  await syncAndSeed()
}

module.exports = setup;