const express = require("express");
const { checkoutCart, getActiveCartByUserId, getInactiveCartsByUserId, createCart } = require("../db/cart");
const { editProduct } = require("../db/product");
const { tokenAuth, sliceToken } = require("./utils");
const { sendMail } = require("../db/mail");
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

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    products.forEach(async(product) => {
      await editProduct({id: product.id, quantity: product.quantity });
    })
    if(id !== "guest"){
      const checkout = await checkoutCart(id);
      console.log(checkout);
      sendMail('We did it!', { name: "name string", email: "actninswitch@gmail.com", products: "Hello"});
      res.send(checkout);
    } else {
      sendMail('We did it!', { name: "name string", email: "actninswitch@gmail.com", products: "Hello"});
      res.send({id, isActive: false});
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
