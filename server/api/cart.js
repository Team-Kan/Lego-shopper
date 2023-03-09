const express = require("express");
const { checkoutCart, getActiveCartByUserId, getInactiveCartsByUserId, createCart } = require("../db/cart");
const { editProduct } = require("../db/product");
const { tokenAuth, sliceToken } = require("./utils");
const router = express.Router();

router.get("/", tokenAuth, async (req, res, next) => {
  try {
    const userInfo = sliceToken(req);
    console.log("useer info",userInfo.id)
    const cart = await getActiveCartByUserId(userInfo.id);
    console.log(cart)
    if(!cart.length){
      const newCart = await createCart({id:userInfo.id})
      res.send(newCart)
    }
    res.send(cart[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/inactive", tokenAuth, async (res, req, next) => {
  try {
    const {id} = sliceToken(req);

    const orderHistory = await getInactiveCartsByUserId(id);

    return orderHistory
  } catch (error) {
    next(error)
  }
})

router.patch("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    products.forEach(async(product) => {
      await editProduct({id: product.id, quantity: product.quantity });
    })
    const checkout = await checkoutCart(id);
    console.log(checkout);
    res.send(checkout);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
