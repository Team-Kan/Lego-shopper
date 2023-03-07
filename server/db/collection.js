const client = require("./client");

const createCollection = async ({name}) => {
  try {
    if(!name){
      const error = new Error("Please include a name")
      error.status = 400
      throw error 
    }
    const {rows: [collection]} = await client.query(`
      INSERT INTO collections(name)
      VALUES ($1)
      RETURNING *
    `, [name]);

    return collection;  
  } catch (error) {
    throw error;
  }
  
}

const getAllCollections = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM collections;
    `)
    return rows;
  } catch (error) {
    throw error;
  }
}

const deleteCollection = async (id) => {
  try {
    const {rows: [deletedCollection]} = await client.query(`
    DELETE
    FROM collections
    WHERE "id"=$1
    RETURNING *;`, [id] )
    return deletedCollection;
  } catch (error) {
    throw error;
  }
}

const editCollection = async ({id, name}) => {
  try {
    const {rows: [collection]} = await client.query(`
    UPDATE collections
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name,id ])
    return collection;

  } catch (error) {
    throw error;
  }
} 

module.exports = {
  createCollection,
  getAllCollections,
  deleteCollection,
  editCollection,
}