const express = require("express");
const router = express.Router();

const { authenticate, getUserByToken } = require("../db");

module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send(await getUserByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

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

module.exports = router