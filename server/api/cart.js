const express = require("express");
const { checkoutCart, getActiveCartByUserId, getInactiveCartsByUserId, createCart } = require("../db/cart");
const { editProduct } = require("../db/product");
const { tokenAuth, sliceToken } = require("./utils");
const { sendMail } = require("../db/mail");
const router = express.Router();

router.get("/", tokenAuth, async (req, res, next) => {
  try {
    const userInfo = sliceToken(req);
    const cart = await getActiveCartByUserId(userInfo.id);
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
    const { products, name, email, total } = req.body;
    let htmlStr = '';
    products.forEach(async(product) => {
      await editProduct({id: product.id, quantity: product.updatedStock });
      htmlStr += product.html;
    })
    if(id !== "guest"){
      const checkout = await checkoutCart(id);
      sendMail('rekanstructed site', { name, email, htmlStr, total });
      res.send(checkout);
    } else {
      sendMail('rekanstructed site', { name, email, htmlStr, total });
      res.send({id, isActive: false});
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
