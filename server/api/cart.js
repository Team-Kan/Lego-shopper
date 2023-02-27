const express = require('express');
const { getActiveCartByUserId } = require('../db/cart');
const router = express.Router();


// router.get('/', async(req, res, next) => {
//     try{
//         const cart = await getActiveCartByUserId();
//         res.send(cart);
//     } catch(error){
//         next(error);
//     }
// })


module.exports = router;