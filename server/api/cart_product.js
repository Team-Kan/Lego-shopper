const express = require("express");
const { addProductToCart, editCartProduct, deleteCartProduct } = require("../db/cart_product");
const { tokenAuth } = require("./utils");
const router = express.Router();

// TODO
router.post("/", tokenAuth, async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart_product = await addProductToCart({ cartId , productId, quantity });
    res.send(cart_product);
  } catch (error) {
    next(error);
  }
})

router.patch("/", async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart_product = await editCartProduct(cartId, productId, quantity);
    res.send(cart_product);
  } catch (error) {
    next(error);
  }
})

router.delete("/", async (req, res, next) => {
    try {
        const { cartId, productId } = req.body;
        const cart_product = await deleteCartProduct(cartId, productId);
        res.send(cart_product);
      } catch (error) {
        next(error);
      }
})

module.exports = router;
