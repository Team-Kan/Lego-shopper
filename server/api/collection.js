const express = require("express");
const { getAllCollections, deleteCollection } = require("../db/collection");
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

router.delete("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await deleteCollection(id);
    
    res.send(collection);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
