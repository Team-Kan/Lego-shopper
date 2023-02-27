const express = require("express");
const { createUser } = require("../db");
const router = express.Router();

router.use("/register", async (req, res, next) => {
  try {
    const {username, password} = req.body
    if(password.length <= 7){
      next({
        status: 400,
        error: "shortPassword",
        message: "Your password must be atleast 8 charcters."
      })
    }
    const newUser = await createUser({username, password});

    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
