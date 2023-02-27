const express = require('express');
const { getActiveCartByUserId } = require('../db/cart');
const { tokenAuth, sliceToken } = require('./utils');
const router = express.Router();


router.get('/', tokenAuth, async(req, res, next) => {
    try{
      const {id, username, isAdmin} = sliceToken(req)
      const cart = await getActiveCartByUserId(id);

      res.send(cart);
    } catch(error){
        next(error);
    }
})


module.exports = router;