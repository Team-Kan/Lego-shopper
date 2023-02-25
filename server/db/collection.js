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

const getAllCollections = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM collections;
    `)
    return rows;
  } catch (error) {
    console.log(error);
  }
}

const deleteCollection = async (id) => {
  try {
    const {rows: [deletedCollection]} = await client.query(`
    DELETE
    FROM collection
    WHERE "id"=$1
    RETURNING *;`, [id] )
    return deletedCollection;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createCollection,
  getAllCollections,
  deleteCollection,

}