const express = require("express");
const { getActiveCartByUserId, getInactiveCartsByUserId } = require("../db/cart");
const { tokenAuth, sliceToken } = require("./utils");
const router = express.Router();

router.get("/", tokenAuth, async (req, res, next) => {
  try {
    const { id, username, isAdmin } = sliceToken(req);
    const cart = await getActiveCartByUserId(id);

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.get("/inactive/:id", tokenAuth, async (res, req, next) => {
  try {
    const {id, username, isAdmin} = sliceToken(req);

    const orderHistory = await getInactiveCartsByUserId(id);

    return orderHistory
  } catch (error) {
    next(error)
  }
})

module.exports = router;
