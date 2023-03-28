const express = require("express");
const { tokenAuth, sliceToken } = require("./utils");
const { 
  sendMail, 
  editProduct, 
  checkoutCart, 
  getActiveCartByUserId, 
  getInactiveCartsByUserId, 
  createCart,
  calcultateOrder,
} = require("../db/");
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

router.post("/total", async(req, res, next) => {
  try {
    const {cart} = req.body;

    const totalInfo = calcultateOrder(cart)

    res.send(totalInfo)
  } catch (error) {
    next(error)
  }

})

router.get("/inactive", tokenAuth, async (req, res, next) => {
  try {
    const {id} = sliceToken(req);

    const orderHistory = await getInactiveCartsByUserId(id);

    res.send(orderHistory) 
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
      htmlStr += product.html;
      await editProduct({id: product.id, quantity: product.updatedStock }); 
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
