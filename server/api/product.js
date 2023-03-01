const express = require('express');
const {getAllProducts, createProduct} = require("../db/product");
const { tokenAuth, adminCheck } = require('./utils');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        next(error);
    }
})

router.post("/create", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    
    if(!product){
        next({
            status: 400,
            message: "Product could not be created, double check everything and try again."
        })
    }

    res.send(product)
  } catch (error) {
    next(error);
  }
})

module.exports = router;

