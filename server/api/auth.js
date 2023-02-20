const express = require('express');
const router = express.Router();
const {
  authenticate,
  getUserByToken
} = require('../db');

module.exports = router;

router.post('/', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

router.get('/', async(req, res, next)=> {
  try {
    res.send(await getUserByToken(req.headers.authorization)); 
  }
  catch(ex){
    next(ex);
  }
});
