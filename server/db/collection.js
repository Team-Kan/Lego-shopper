const client = require("./client");

const createCollection = async ({name}) => {

  const {rows: [collection]} = await client.query(`
  INSERT INTO collections(name)
  VALUES ($1)
  RETURNING *
  `, [name]);
  console.log(collection);
  return collection;
}

module.exports = {
  createCollection,
}