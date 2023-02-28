const express = require('express');
const {getAllProducts} = require("../db/product")
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        next(error);
    }
})