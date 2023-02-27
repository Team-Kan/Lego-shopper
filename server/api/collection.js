const express = require('express');
const { getAllCollections } = require('../db/collection');
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const collections = await getAllCollections()
    
    res.send(collections)
  } catch (error) {
    next(error);
  } 
})


module.exports = router;