const express = require("express");
const { getAllCollections, deleteCollection, editCollection, createCollection } = require("../db/collection");
const { adminCheck, tokenAuth } = require("./utils");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const collections = await getAllCollections();

    res.send(collections);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {name} = req.body;

    const collection = await createCollection({name});

    res.send(collection)    
  } catch (error) {
    next(error)
  }

})


router.delete("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await deleteCollection(id);
    
    res.send(collection);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    const collection = await editCollection({id, name});
    if(!collection.name){
      next({ 
        status: 401,
        message: `Collection with the id ${id} does not exist.`
      });
    }
    res.send(collection);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
